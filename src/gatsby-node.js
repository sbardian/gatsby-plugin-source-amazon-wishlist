import { getAllItems } from "./fetcher";

export const sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  { lists }
) => {
  const processItem = item => {
    const nodeId = createNodeId(item.id);
    const nodeContent = JSON.stringify(item);

    return Object.assign({}, item, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: "AmazonWishlistItem",
        content: nodeContent,
        contentDigest: createContentDigest(item)
      }
    });
  };

  for (const list of lists) {
    const items = await getAllItems(list.wishlistUrl, list.limit);
    items.forEach(item => {
      const nodeData = processItem({ owner: list.owner, ...item }, list);
      createNode(nodeData);
    });
  }
};
