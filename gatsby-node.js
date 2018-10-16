"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceNodes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  var _ref = _asyncToGenerator(function* ({ actions: { createNode }, createNodeId, createContentDigest }, { lists }) {
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

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = lists[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        const list = _step.value;

        const items = yield (0, _fetcher.getAllItems)(list.wishlistUrl, list.limit);
        items.forEach(function (item) {
          const nodeData = processItem(_extends({ owner: list.owner }, item), list);
          createNode(nodeData);
        });
      }

      // if (fetchImages) {
      //   items = downloadMediaFiles({ items, store, cache, createNode });
      // }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });

  return function sourceNodes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();