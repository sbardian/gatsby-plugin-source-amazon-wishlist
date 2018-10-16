import rp from "request-promise";
import cheerio from "cheerio";
import URL from "url";

const selectors = {
  title: "#wl-list-info .profile-list-name",
  nextPage: "a.wl-see-more",
  items: "#g-items li",
  itemTitle: "h3 a",
  itemId: "h3 a",
  itemPriority: ".g-item-comment-row span[id^='itemPriorityLabel']",
  itemRequestedCount: ".g-item-comment-row span[id^='itemRequested_']",
  itemPurchasedCount: ".g-item-comment-row span[id^='itemPurchased_']",
  itemComment: "div.g-item-comment-row span[id^='itemComment']",
  itemNewAndUsed: ".a-row.itemUsedAndNew",
  itemPrice: ".a-price",
  itemPriceCurrency: ".a-price-symbol",
  itemPriceDollars: ".a-price-whole",
  itemPriceCents: ".a-price-fraction",
  itemImage: ".g-itemImage img"
};

const getPage = async (url, baseUrl) => {
  var options = {
    uri: url,
    transform: body => cheerio.load(body)
  };

  const $ = await rp(options);

  const nextPageHref = $(selectors.nextPage).attr("href");
  const nextPageUrl = nextPageHref && URL.resolve(baseUrl, nextPageHref);

  return {
    items: getItems($, baseUrl),
    nextPageUrl
  };
};

const getItems = ($, baseUrl) => {
  return $(selectors.items)
    .map((index, element) => {
      // Some items may be unavailable, so we exclude those:
      if ($(element).attr("data-price") == "-Infinity") {
        return;
      }
      const title = $(selectors.itemTitle, element)
        .text()
        .trim();

      const link = $(selectors.itemId, element).attr("href");
      const id = link.split("/")[2];
      const url = URL.resolve(baseUrl, link);

      const $itemPrice = $(selectors.itemPrice, element);
      const $itemNewAndUsed = $(selectors.itemNewAndUsed, element);

      let price;

      if ($itemPrice) {
        price = $itemPrice.find(".a-offscreen").text();
      }

      if (!price) {
        if ($itemNewAndUsed) {
          price = $itemNewAndUsed
            .find(".a-color-price.itemUsedAndNewPrice")
            .text();
        } else {
          price = $(element).attr("data-price");
        }
      }

      const imageUrl = $(selectors.itemImage, element).attr("src");

      const features = $(".a-row.a-spacing-small.a-size-small", element)
        .find("span[class='a-size-small']")
        .map((index, element) => $(element).text())
        .get()
        .join(", ");

      const comment = $(selectors.itemComment, element).text();
      const priority = $(selectors.itemPriority, element).text();
      const requested = parseInt(
        $(selectors.itemRequestedCount, element).text(),
        10
      );
      const purchased = parseInt(
        $(selectors.itemPurchasedCount, element).text(),
        10
      );

      return {
        id,
        title,
        url,
        price,
        image: {
          url: imageUrl
        },
        features,
        comment,
        priority,
        requested,
        purchased
      };
    })
    .get();
};

export const getAllItems = async (url, limit = false) => {
  const baseUrl = URL.resolve(url, "/");

  let items = [];
  let pageUrl = url;

  while (pageUrl) {
    let { items: newItems, nextPageUrl } = await getPage(pageUrl, baseUrl);

    items = items.concat(newItems);
    pageUrl = nextPageUrl;

    if (limit && items.length >= limit) {
      items = items.slice(0, limit);
      break;
    }
  }
  return items;
};
