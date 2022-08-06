const body = document.getElementsByTagName('body')[0]

const handleOnLoad = async event => {
  const response = await fetch('/airlines.json')
  const airlines = await response.json()
  const airlinesNames = airlines.map(a => `<option value="${a.display_name}"></option>`)
  const datalist = document.getElementById('airlines')
  datalist.innerHTML = airlinesNames.join("")
}

body.onload = handleOnLoad
