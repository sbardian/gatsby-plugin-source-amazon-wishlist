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
        url: "
      },
    },
  ]
}
```

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

