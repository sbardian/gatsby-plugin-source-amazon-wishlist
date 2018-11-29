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
        lists: [
          {
            owner: 'Brian',
            wishlistUrl: 'https://www.amazon.com/hz/wishlist/ls/<wishlist code>',
            limit: 25,
          },
          {
            owner: 'Bob',
            wishlistUrl: 'https://www.amazon.com/hz/wishlist/ls/<wishlist code>',
          }
        ]
      },
    },
  ]
}
```

### Options

- `lists`: Array of wishlist options `<Array>`
  - `owner`: Owner of wishlist: `<String>`
  - `wishlistUrl`: URL to your amazon wishlist, must be `public` or `shared`: `<String>`
  - `limit`: Whether to stop fetching at a specific limit, defaults to `false`: `<Int>`

## Querying

You can query the nodes created by the plugin as follows:

StaticQuery

```
graphql`
{
  allAmazonWishlistItem {
    edges {
      node {
        id
        owner
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
`
```

Page query with filters

```
graphql`
{
  allAmazonWishlistItem(filter: { owner: { eq: "brian" } }) {
    edges {
      node {
        id
        owner
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
`
```
