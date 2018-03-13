# gatsby-source-amazon-wishlist
> Loads items from an Amazon Wishlist into Gatsby.js

## Installation

```bash
npm install gatsby-source-amazon-wishlist
```

## Usage

Edit `gatsby-config.js` to use the plugin:
```javascript
{
    ...
    plugins: [
    ...
    {
      resolve: 'gatsby-source-amazon-wishlist',
      options: {
        wishlistUrl: 'https://www.amazon.de/registry/wishlist/2WVYBLDQ5KDSG',
        language: 'en-GB',
        limit: 25,
      },
    },
  ]
}
```

### Options

* `wishlistUrl`: URL to your amazon wishlist, this must be public or shared.
* `language`: The language to pass in the `Accept-Language` header, I use `en-GB` because I like the euro sign in front of my prices, defaults to `en-US`.
* `limit`: Whether to stop fetching at a specific limit, defaults to `false`

## Querying

You can query the nodes created by the plugin as follows:

```graphql
{
  allAmazonWishlistItem {
    edges {
      node {
        id
        title
        url
        price
        features
        comment
        priority
        purchased
        requested
        image {
          url
        }
      }
    }
  }
}
```

