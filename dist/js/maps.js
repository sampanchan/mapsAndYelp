class GoogleMapApi{

    // same as localhost:8888
    // API_BASE_URL = 'twitter-proxy.php'
    API_KEY = 'AIzaSyBN8YgsGRhmpj0vSQlLl5EViZa3MGbrjr8'
    marker = []

    // init(){
    //     console.log('google map init')
    //     const form = document.querySelector('form[name="place_search"]')
    //     form.addEventListener('submit', this.handlePlaceSearch)
    // }

    constructor(){
        console.log('google map loaded')
        this.setupListener()
    }

    setupListener() {
        document.addEventListener('get-map-center', this.handleMapCenterRequest)

    }

    handleMapCenterRequest = (evt) => {
        const mapCenter = this.map.getCenter()
        console.log('please be center')
        const responseInfo = { center: mapCenter}
        const responseEvent = new CustomEvent('get-map-center-response', {detail: responseInfo})
        document.dispatchEvent(responseEvent)
    }

    handlePlaceSearch = (evt) => {
        evt.preventDefault()
        console.log('handle place search ok')
        var placeName = document.querySelector('#place').value

        var placeRequest = {
            location: this.map.getCenter(),
            radius: 50,
            query: placeName,
            fields: ['formatted_phone_number'],
        }
        this.service = new google.maps.places.PlacesService(this.map)
        this.service.textSearch(placeRequest, this.handlePlaceResults)
    }

    handlePlaceResults = (results, status) => {
        console.log('handle result search ok')
      

        if (status == google.maps.places.PlacesServiceStatus.OK){
            console.log('got results', results)

            this.clearMarkers()

            results.forEach((result) => {
                this.createMarker({
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng(),
                    title: result.name,
                    description: result.formatted_address,

                })


            })

            //list container
            const listContainer = document.createElement('div');
            listContainer.setAttribute('class', 'business-container');
            const classResults = document.querySelector('.classResults')
            classResults.appendChild(listContainer);
            console.log('listcontainercreated')

            
            for ( let i = 0; i < results.length; i++){

                const business = results[i];
    
                const lat  = business.geometry.location.lat();
                const lng  = business.geometry.location.lng();
                const position = { lat: lat, lng: lng};
                const name = business.name;
                const address = business.formatted_address;
                // const hours = business.opening_hours.isOpen(name); // hours?
                // phone#
                // const number = business.getPhoneNumber();
                // const number = business.formatted_phone_number;
                // const icon = business.icon;
                // const image = business.photos[0].getUrl();
                // const rating = business.rating;
                // const url = business.photos[0].html_attributions;

                // // list item
                // const businessItemEl = document.createElement('div');
                // businessItemEl.setAttribute('class', 'business-item');
                // listContainer.appendChild(businessItemEl);
                // console.log('businessitemcreated')

                // // Name

                // const nameEl = document.createElement('h2');
                // // businessItemEl.setAttribute('class', 'name-item');
                // businessItemEl.appendChild(nameEl);
                // nameEl.textContent = name;

                // // address

                // const addressEl = document.createElement('p');
                // // listContainer.setAttribute('class', 'address-p');
                // listContainer.appendChild(addressEl);
                // addressEl.textContent = address;

                // //image works

                // const imageEl = document.createElement('img');
                // businessItemEl.appendChild(imageEl);
                // imageEl.setAttribute('src', image)

                // //rating

                // const ratingEl = document.createElement('p');
                // businessItemEl.appendChild(ratingEl);
                // ratingEl.textContent = rating + "/5"


                
                // this.createMarker({
                //     position: position,
                //     map: this.map,
                //     title: 'the circus',
                //     infoWindowContent: `<div><img src=${business.icon} atl="" width="20px" height="20px"></div>
                //     <div>
                //     <h3>${business.name}</h3>
                //     <p>${business.formatted_address}</p>
                //     <p>${business.formatted_phone_number}</p>
                //     <p>${business.opening_hours.isOpen(name)}</p>
                //     <img src=${business.photos[0].getUrl()} atl=" width="50px" height="50px">
                //     <p> rating: ${business.rating}/5</p>
                //     </div> `
                // })

                const marker = new google.maps.Marker({

                    position: position,
                    map: this.map,
                    title: 'the circus',
                   
                    // label: 'the creative circus',
                    // draggable: true,
                });

            
                const infoWindowContent = `<div><img src=${business.icon} atl="" width="20px" height="20px"></div>
                                            <div>
                                            <h3>${business.name}</h3>
                                            <p>${business.formatted_address}</p>
                                            <p>${business.formatted_phone_number}</p>
                                            <p>${business.opening_hours.isOpen(name)}</p>
                                            <img src=${business.photos[0].getUrl()} atl=" width="50px" height="50px">
                                            <p> rating: ${business.rating}/5</p>
                                            </div> `
                const infoWindow = new google.maps.InfoWindow({
                 content: infoWindowContent,
                })
                marker.addListener('click', () => {
                    infoWindow.open(this.map, marker)
                   })
                   

            }
        }
    }

    createMarker (options) {
        
        const marker = new google.maps.Marker({
            position: {lat: options.lat, lng: options.lng},
            map: this.map,
            title: options.title,
            icon: options.image,
            // label: 'the creative circus',
            // draggable: true,
        })


        const infoWindowContent = options.windowContent
        if (!this.infoWindow){
            this.infoWindow = new google.maps.InfoWindow()
        }
                    // const infoWindow = new google.maps.InfoWindow({
                    //  content: infoWindowContent,
                    // })
                    marker.addListener('click', () => {
                        // infoWindow.open(this.map, marker)
                        this.infoWindow.setContent(infoWindowContent)
                        this.infoWindow.open(this.map, marker)
                     })

                     this.marker.push(marker)
                    
    } 

    clearMarkers(){
        this.marker.forEach(marker => {
            marker.setMap(null)
        })

        this.marker = []
    }

    ready(){

        console.log('map is ready')

        const theCircus = { lat: 33.81328, lng: -84.36175 } 
        const mapOptions = {
            center: theCircus,
            zoom:15,
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions)

        // const image = "/dist/img/tent.png"
        // this.createMarker({
        //     lat: theCircus.lat,
        //     lng: theCircus.lng,
        //     title: ' The circus',
        //     icon: image,
        //     windowContent:`<div><h2>Join the Circus!!</h2><p> A place where you leave your worries behind and make new stress factors</p></div>`,
        // })
        // const image = "/dist/img/tent.png"
        // const marker = new google.maps.Marker({
        //     position: theCircus,
        //     map: this.map,
        //     title: 'the circus',
        //     icon: image,
        //     // label: 'the creative circus',
        //     // draggable: true,
        // })


        // const infoWindowContent = `<div><h2>Join the Circus!!</h2><p> A place where you leave your worries behind and make new stress factors</p></div>`
        //             const infoWindow = new google.maps.InfoWindow({
        //              content: infoWindowContent,
        //             })
        //             marker.addListener('click', () => {
        //                 infoWindow.open(this.map, marker)
        //                })


        

                    
                    
            const mapReadyEvent = new CustomEvent('map-ready')
            document.dispatchEvent(mapReadyEvent)    
        }
       
        
    }       
    
        

       

        
    
    

window.gMap = new GoogleMapApi();
// window.gMap.init();
