# @sbardian/gatsby-source-amazon-wishlist

> Loads items from an Amazon Wishlist into Gatsby.js

> Fork from [Unobvious-Technology](https://github.com/Unobvious-Technology/gatsby-plugin-source-amazon-wishlist).

## Installation

```bash
npm install @sbardian/gatsby-source-amazon-wishlist
```

## Usage

Edit `gatsby-config.js` to use the plugin:

```javascript
{
    ...
    plugins: [
    ...
    {
      resolve: '@sbardian/gatsby-source-amazon-wishlist',
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

- `wishlistUrl`: URL to your amazon wishlist, this must be `public` or `shared`.
- `language`: The language to pass in the `Accept-Language` header, defaults to `en-US`.
- `limit`: Whether to stop fetching at a specific limit, defaults to `false`

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
