const body = document.getElementsByTagName('body')[0]

const getAirlines = async () => {
  const response = await fetch('/airlines.json')
  return await response.json()
}

const setAirlines = airlinesNames => {
  const datalist = document.getElementById('airlines')
  datalist.innerHTML = airlinesNames.join("")
}

const handleOnLoad = async event => {
  const airlines = await getAirlines()
  const airlinesNames = airlines.map(a => `<option value="${a.display_name}"></option>`)
  setAirlines(airlinesNames)
}

body.onload = handleOnLoad
