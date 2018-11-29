"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllItems = undefined;

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

const getPage = (() => {
  var _ref = _asyncToGenerator(function* (url, baseUrl) {
    const $ = _cheerio2.default.load((yield (yield (0, _nodeFetch2.default)(url)).text()));

    const nextPageHref = $(selectors.nextPage).attr("href");
    const nextPageUrl = nextPageHref && _url2.default.resolve(baseUrl, nextPageHref);

    return {
      items: getItems($, baseUrl),
      nextPageUrl
    };
  });

  return function getPage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

const getItems = ($, baseUrl) => {
  return $(selectors.items).map((index, element) => {
    // Some items may be unavailable, so we exclude those:
    if ($(element).attr("data-price") == "-Infinity") {
      return;
    }
    const title = $(selectors.itemTitle, element).text().trim();

    const link = $(selectors.itemId, element).attr("href");
    const id = link.split("/")[2];
    const url = _url2.default.resolve(baseUrl, link);

    const $itemPrice = $(selectors.itemPrice, element);
    const $itemNewAndUsed = $(selectors.itemNewAndUsed, element);

    let price;

    if ($itemPrice) {
      price = $itemPrice.find(".a-offscreen").text();
    }

    if (!price) {
      if ($itemNewAndUsed) {
        price = $itemNewAndUsed.find(".a-color-price.itemUsedAndNewPrice").text();
      } else {
        price = $(element).attr("data-price");
      }
    }

    const imageUrl = $(selectors.itemImage, element).attr("src");

    const features = $(".a-row.a-spacing-small.a-size-small", element).find("span[class='a-size-small']").map((index, element) => $(element).text()).get().join(", ");

    const comment = $(selectors.itemComment, element).text();
    const priority = $(selectors.itemPriority, element).text();
    const requested = parseInt($(selectors.itemRequestedCount, element).text(), 10);
    const purchased = parseInt($(selectors.itemPurchasedCount, element).text(), 10);

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
  }).get();
};

const getAllItems = exports.getAllItems = (() => {
  var _ref2 = _asyncToGenerator(function* (url, limit = false) {
    const baseUrl = _url2.default.resolve(url, "/");

    let items = [];
    let pageUrl = url;

    while (pageUrl) {
      var _ref3 = yield getPage(pageUrl, baseUrl);

      let newItems = _ref3.items,
          nextPageUrl = _ref3.nextPageUrl;


      items = items.concat(newItems);
      pageUrl = nextPageUrl;

      if (limit && items.length >= limit) {
        items = items.slice(0, limit);
        break;
      }
    }
    return items;
  });

  return function getAllItems(_x3) {
    return _ref2.apply(this, arguments);
  };
})();