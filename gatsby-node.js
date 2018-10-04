"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceNodes = undefined;

var _fetcher = require("./fetcher");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // import { createRemoteFileNode } from 'gatsby-source-filesystem';


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

const sourceNodes = exports.sourceNodes = (() => {
  var _ref = _asyncToGenerator(function* ({ actions: { createNode }, createNodeId, createContentDigest }, { wishlistUrl, language, limit }) {
    const items = yield (0, _fetcher.getAllItems)(wishlistUrl, language, limit);

    // if (fetchImages) {
    //   items = downloadMediaFiles({ items, store, cache, createNode });
    // }

    const processItem = function processItem(item) {
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

    items.forEach(function (item) {
      const nodeData = processItem(item);
      createNode(nodeData);
    });
  });

  return function sourceNodes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();