class YelpApi{

    API_KEY = 'Tow02LN0q2c-t3X-Sq8qlJOMtFc7-tmsGglB_PJ927cw4FMErKxZI8EJN5FaAFuZGL5_6USYexsippLsH5f8NOurISqUA02NvVF_zWYeoocmtlhSUZsqy8d4esl9YHYx'
    API_BASE_URL = 'https://circuslabs.net/proxies/yelp-fusion-proxy/'

    constructor(){
        console.log('yelp is ready')
        this.setUpListener()
    }

    setUpListener(){
        // const form = document.querySelector('form[name="business_search"]')
        // form.addEventListener('submit', this.handleSearch)

        document.addEventListener('business-search', this.handleSearch)


    }

    handleSearch = (evt) => {
        evt.preventDefault()
        console.log('searching....', evt.detail)

        const searchInfo = evt.detail



        const term = searchInfo.query
        // const term = document.querySelector('input[name="term"]').value
        // const location = document.querySelector('input[name="location"]').value
        // const radius = document.querySelector('input[name="radius"]').value
        // console.log(radius)
        // ASK GREG for conversion
        // const sort = document.querySelector('[name="sort-by"]').value
        // const price = document.querySelectorAll('[name="dollar"]:checked')
        
        // const priceArray= []
        // for (let x = 0, l = price.length; x<l; x++ ){
        //     priceArray.push(price[x].value)
        //     // console.log(price[x])
        // }
        // if(price.length === 0 ){
        //     priceTerm === 0
        // }
        // else{
        //     var priceTerm = priceArray.join(", ")
        // }
        // console.log(priceTerm)

        // const open = document.querySelector('[name="open-now"]')
        // var openNow = open.checked
       
        
        const data ={
            _ep: '/businesses/search',
            term: term,
            latitude: searchInfo.latitude,
            longitude: searchInfo.longitude,
            // location: location,
            // sort_by: sort,
            // radius: radius,
            // price: priceTerm,
            // open_now: openNow,

        }
        const headers = {
            Authorization: `Bearer ${this.API_KEY}`
        }

        axios.get(this.API_BASE_URL, { params: data, headers: headers }).then(this.processResults)
    }

    processResults = (data) => {

        const results = data.data.businesses
        console.log('we got data!', results)

        const resultsData = {results: results }
        const resultsEvent = new CustomEvent('business-search-results', { detail: resultsData })

        document.dispatchEvent(resultsEvent)
      

        //parent container

        const articleContainer = document.createElement('div');
        articleContainer.setAttribute('class', 'business-Container');
        const classResults = document.querySelector('.classResults')
        classResults.appendChild( articleContainer);

        //loop for businesses
        console.log(results.length)
        for (let i = 0; i < results.length; i++ ){


            const business = results[i]
            const name = business.name
            const photo = business.image_url
            const price = business.price
            const rating = business.rating
            const transactionType = business.transactions
            

            // Business Item
            const businessItemEl = document.createElement('div');
            businessItemEl.setAttribute('class', 'business-item');
            articleContainer.appendChild(businessItemEl);

            //Name
            const nameEl = document.createElement('h2');
            businessItemEl.appendChild(nameEl);
            nameEl.textContent = name;

            //location 
            const location = business.location.display_address
            const locationEl =document.createElement('h3');
            businessItemEl.appendChild(locationEl);
            locationEl.textContent = location;

            //image 
            const photoEl = document.createElement('img');
            businessItemEl.appendChild(photoEl);
            photoEl.setAttribute('src', photo);

            //categories
            const category = business.categories
            const categoryEl = document.createElement('h4');
            businessItemEl.appendChild(categoryEl);
            categoryEl.textContent = category.map((cat) => cat.title).join('\n');
            businessItemEl.appendChild(categoryEl);

            //price
            const priceEL = document.createElement('p');
            priceEL.setAttribute('class', 'dollar-sign-price');
            businessItemEl.appendChild(priceEL);
            priceEL.textContent = price;

            //rating
            const ratingEl = document.createElement('p');
            ratingEl.setAttribute('class', 'rating');
            businessItemEl.appendChild(ratingEl);
            ratingEl.textContent = rating + '😉';

            //transaction
            const transactionEL = document.createElement('p');
            transactionEL.setAttribute('class', 'transaction_type');
            businessItemEl.appendChild(transactionEL);
            transactionEL.textContent = transactionType;

        }
    }
} 

new YelpApi ()