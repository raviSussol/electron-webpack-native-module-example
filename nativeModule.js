const path = require('path');
const ffi = require('electron-node-ffi');
const ref = require('electron-node-ref');

const libCal = path.join(__goLib, '../lib/libCal');
const { int } = ref.types;
const nodeGo = ffi.Library(libCal, {
  Add: [ int, [ int, int ] ]
});

const ngAdd = (x, y) => nodeGo.Add(x, y);
module.exports = {ngAdd};
