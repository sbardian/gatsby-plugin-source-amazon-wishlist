// import { createRemoteFileNode } from 'gatsby-source-filesystem';
import { getAllItems } from "./fetcher";

// const downloadMediaFiles = async ({ items, store, cache, createNode }) =>
//   Promise.all(
//     items.map(async item => {
//       let fileNode;
//       if (item.imageUrl) {
//         try {
//           fileNode = await createRemoteFileNode({
//             url: item.imageUrl,
//             store,
//             cache,
//             createNode
//           });
//         } catch (e) {
//           // Ignore
//         }
//       }

//       if (fileNode) {
//         item.image___NODE = fileNode.id;
//         delete item.imageUrl;
//       }

//       return item;
//     })
//   );

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

  // if (fetchImages) {
  //   items = downloadMediaFiles({ items, store, cache, createNode });
  // }
};
