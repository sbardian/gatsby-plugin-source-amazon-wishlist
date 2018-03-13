"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemNode = undefined;

var _gatsbyNodeHelpers = require("gatsby-node-helpers");

var _gatsbyNodeHelpers2 = _interopRequireDefault(_gatsbyNodeHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createNodeHelpers = (0, _gatsbyNodeHelpers2.default)({
  typePrefix: `AmazonWishlist`
});

const createNodeFactory = _createNodeHelpers.createNodeFactory,
      generateNodeId = _createNodeHelpers.generateNodeId,
      generateTypeName = _createNodeHelpers.generateTypeName;


const ITEM_TYPE = `Item`;

const ItemNode = exports.ItemNode = createNodeFactory(ITEM_TYPE);