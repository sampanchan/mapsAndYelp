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
      console.log(evt);
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

    _defineProperty(this, "handleResults", function (evt) {
      var results = evt.detail.results;
      console.log(results); //parent container

      var articleContainer = document.createElement('div');
      articleContainer.setAttribute('class', 'business-Container');
      var classResults = document.querySelector('.classResults');
      classResults.appendChild(articleContainer); //loop for businesses

      for (var i = 0; i < results.length; i++) {
        var business = results[i];
        var name = business.name;
        var photo = business.image_url;
        var price = business.price;
        var rating = business.rating;
        var transactionType = business.transactions; // Business Item

        var businessItemEl = document.createElement('div');
        businessItemEl.setAttribute('class', 'business-item');
        articleContainer.appendChild(businessItemEl); //Name

        var nameEl = document.createElement('h2');
        businessItemEl.appendChild(nameEl);
        nameEl.textContent = name; //location 

        var location = business.location.display_address;
        var locationEl = document.createElement('h3');
        businessItemEl.appendChild(locationEl);
        locationEl.textContent = location; //image 

        var photoEl = document.createElement('img');
        businessItemEl.appendChild(photoEl);
        photoEl.setAttribute('src', photo); //categories

        var category = business.categories;
        var categoryEl = document.createElement('h4');
        businessItemEl.appendChild(categoryEl);
        categoryEl.textContent = category.map(function (cat) {
          return cat.title;
        }).join('\n');
        businessItemEl.appendChild(categoryEl); //price

        var priceEL = document.createElement('p');
        priceEL.setAttribute('class', 'dollar-sign-price');
        businessItemEl.appendChild(priceEL);
        priceEL.textContent = price; //rating

        var ratingEl = document.createElement('p');
        ratingEl.setAttribute('class', 'rating');
        businessItemEl.appendChild(ratingEl);
        ratingEl.textContent = rating + '😉'; //transaction

        var transactionEL = document.createElement('p');
        transactionEL.setAttribute('class', 'transaction_type');
        businessItemEl.appendChild(transactionEL);
        transactionEL.textContent = transactionType;
        var markerInfo = {
          lat: business.coordinates.latitude,
          lng: business.coordinates.longitude,
          title: business.name,
          windowContent: businessItemEl.innerHTML // windowContent: `<h2>${business.name}</h2><h2>${business.image_url}</h2>`

        };
        var searchEvent = new CustomEvent('add-marker', {
          detail: markerInfo
        });
        document.dispatchEvent(searchEvent);
      }
    });

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
      document.addEventListener('business-search-results', this.handleResults);
    }
  }]);

  return Main;
}();

new Main();
//# sourceMappingURL=main.js.map
