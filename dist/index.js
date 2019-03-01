"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var splitRow = function splitRow(lengths) {
  return function (txt) {
    var ret = lengths.reduce(function (_ref, l) {
      var _ref2 = _slicedToArray(_ref, 2),
          txt = _ref2[0],
          res = _ref2[1];

      res.push(txt.substr(0, l));
      return [txt.substr(l), res];
    }, [txt, []]);
    return ret[1];
  };
};

var removeTail = function removeTail(arr) {
  var re = /^(\s*|\(\d+ row\(s\) affected\))$/;

  while (arr[arr.length - 1] !== undefined && arr[arr.length - 1].match(re)) {
    arr.pop();
  }

  return arr;
};

var parseSingleResult = function parseSingleResult(txt) {
  try {
    var _txt$split = txt.split(/\r?\n/),
        _txt$split2 = _toArray(_txt$split),
        title = _txt$split2[0],
        line = _txt$split2[1],
        rest = _txt$split2.slice(2);

    var dataRows = removeTail(rest);
    var lengths = line.split(" ").map(function (x) {
      return x.length + 1;
    });
    var splitter = splitRow(lengths);

    var splitTrim = function splitTrim(x) {
      return splitter(x).map(function (x) {
        return x.trim();
      });
    };

    var fieldNames = splitTrim(title).map(function (x) {
      return x.toLowerCase();
    });
    var data = dataRows.map(splitTrim);

    var objectWithFieldNames = function objectWithFieldNames(fieldNames) {
      return function (row) {
        return row.reduce(function (obj, value, i) {
          obj[fieldNames[i]] = value;
          return obj;
        }, {});
      };
    };

    var dataObj = data.map(objectWithFieldNames(fieldNames));
    return dataObj;
  } catch (e) {
    return {
      ERROR: e
    };
  }
};

var parseRptToJson = function parseRptToJson(rpt) {
  return rpt.split(/\r?\n(?=.+\r?\n-{5}[ -]*[\r\n$]+)/).map(parseSingleResult);
};

module.exports = {
  parseRptToJson: parseRptToJson
};
