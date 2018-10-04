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
  { wishlistUrl, language, limit }
) => {
  const items = await getAllItems(wishlistUrl, language, limit);

  // if (fetchImages) {
  //   items = downloadMediaFiles({ items, store, cache, createNode });
  // }

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

  items.forEach(item => {
    const nodeData = processItem(item);
    createNode(nodeData);
  });
};
