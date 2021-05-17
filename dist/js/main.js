"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

console.log(" \nChange this message, and make sure it changes in the browser \nto verify that you're working in the right files.");

var Main = /*#__PURE__*/function () {
  function Main() {
    var _this = this;

    _classCallCheck(this, Main);

    _defineProperty(this, "handleMapCenterResponse", function (evt) {
      var responseInfo = evt.detail;
      _this.mapCenter = responseInfo.center;
    });

    _defineProperty(this, "handleSearch", function (evt) {
      evt.preventDefault();
      console.log(evt.detail);
      var query = evt.target.querySelector('input[name="place"]').value;
      console.log('query', query, _this.mapCenter);
      var searchInfo = {
        query: query,
        latitude: _this.mapCenter.lat(),
        longitude: _this.mapCenter.lng()
      };
      var searchEvent = new CustomEvent('business-search', {
        detail: searchInfo
      });
      document.dispatchEvent(searchEvent);
    });

    _defineProperty(this, "handleResults", function (evt) {});

    this.setUpListener(); // this.getMapCenter()
  }

  _createClass(Main, [{
    key: "getMapCenter",
    value: function getMapCenter() {
      var getMapCenter = new CustomEvent('get-map-center');
      document.dispatchEvent(getMapCenter);
    }
  }, {
    key: "setUpListener",
    value: function setUpListener() {
      var form = document.querySelector('form[name="business-search"]');
      form.addEventListener('submit', this.handleSearch);
      document.addEventListener('get-map-center-response', this.handleMapCenterResponse);
      document.addEventListener('map-ready', this.getMapCenter);
    }
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
