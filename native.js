const ffi = require('ffi-napi');
const ref = require('ref-napi');
const path = require('path');

const libCal = path.resolve(__dirname, './libCal');

const { int } = ref.types;

const nodeGo = ffi.Library(libCal, {
  Add: [ int, [ int, int ] ]
});

// console.log(nodeGo.Add(5, 6));
const ngAdd = (x, y) => nodeGo.Add(x, y);
module.exports = {ngAdd};
