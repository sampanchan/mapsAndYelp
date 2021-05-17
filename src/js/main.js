console.log(` 
Change this message, and make sure it changes in the browser 
to verify that you're working in the right files.`)
class Main{
    constructor () {
        
        this.setUpListener()
        // this.getMapCenter()
        
    }
    getMapCenter(){
        const getMapCenter = new CustomEvent('get-map-center')
        document.dispatchEvent(getMapCenter)
    }
    setUpListener(){
        const form = document.querySelector('form[name="business-search"]')
        form.addEventListener('submit', this.handleSearch)

        document.addEventListener('get-map-center-response', this.handleMapCenterResponse)
        document.addEventListener('map-ready', this.getMapCenter)

    }

    handleMapCenterResponse = (evt) =>{
        const responseInfo = evt.detail
        this.mapCenter = responseInfo.center
    }

    handleSearch = (evt) => {
        evt.preventDefault()
        console.log(evt.detail)
        const query = evt.target.querySelector('input[name="place"]').value
        console.log('query', query, this.mapCenter)

        const searchInfo = { 
            query: query, 
            latitude: this.mapCenter.lat(),
            longitude: this.mapCenter.lng(),
        }
        const searchEvent = new CustomEvent('business-search', { detail: searchInfo })
        document.dispatchEvent(searchEvent)

    }

    handleResults = (evt) =>{
        
    }
}

new Main()