import { createRemoteFileNode } from "gatsby-source-filesystem";
import { getAllItems } from "./fetcher";
import { ItemNode } from "./nodes";

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

exports.sourceNodes = async (
  { boundActionCreators: { createNode }, getNode, store, cache, createNodeId },
  { wishlistUrl, fetchImages = false, language = "en-US", limit = false }
) => {
  let items = await getAllItems(wishlistUrl, language, limit);

  // if (fetchImages) {
  //   items = downloadMediaFiles({ items, store, cache, createNode });
  // }

  items.forEach(item => {
    const itemNode = ItemNode(item);
    createNode(itemNode);
  });
};
