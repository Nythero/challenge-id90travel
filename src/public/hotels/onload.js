const body = document.getElementsByTagName('body')[0]

const getHotels = async () => {
  const query = location.search
  if(query !== '') {
    const response = await fetch('/api/hotels' + query)
    const body = await response.json()
    return body.hotels
  }
  else
    return []
}

const mapHotels = hotels => {
  return hotels.map(hotel => ({
    name: hotel.name,
    image: hotel.image
  }))
}

const imageHtml = hotel => `<img class="image" src=${hotel.image}>`

const nameHtml = hotel => `<h3 class="name">${hotel.name}</h3>`

const hotelHtml = hotel => `<div class="hotel">${imageHtml(hotel)}${nameHtml(hotel)}</div>`

const hotelsHtml = hotels => {
  const htmlMap = hotels.map(hotelHtml)
  return htmlMap.join('')
}

const setHotels = mappedHotels => {
  const hotels = document.getElementById('hotels')
  const html = hotelsHtml(mappedHotels)
  hotels.innerHTML = html
}

const handleLoad = async event => {
  const hotels = await getHotels()
  const mappedHotels = mapHotels(hotels)
  setHotels(mappedHotels)
}

body.onload = handleLoad
