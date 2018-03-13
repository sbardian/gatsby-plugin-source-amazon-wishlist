"use strict";

var _gatsbySourceFilesystem = require("gatsby-source-filesystem");

var _fetcher = require("./fetcher");

var _nodes = require("./nodes");

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

exports.sourceNodes = (() => {
  var _ref = _asyncToGenerator(function* ({ boundActionCreators: { createNode }, getNode, store, cache, createNodeId }, { wishlistUrl, fetchImages = false, language = "en-US", limit = false }) {
    let items = yield (0, _fetcher.getAllItems)(wishlistUrl, language, limit);

    // if (fetchImages) {
    //   items = downloadMediaFiles({ items, store, cache, createNode });
    // }

    items.forEach(function (item) {
      const itemNode = (0, _nodes.ItemNode)(item);
      createNode(itemNode);
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();