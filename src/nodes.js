import createNodeHelpers from "gatsby-node-helpers";

const {
  createNodeFactory,
  generateNodeId,
  generateTypeName
} = createNodeHelpers({
  typePrefix: `AmazonWishlist`
});

const ITEM_TYPE = `Item`;

export const ItemNode = createNodeFactory(ITEM_TYPE);
