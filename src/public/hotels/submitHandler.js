

const submitHandler = event => {
  event.preventDefault()
  generateRequest(event.target)
}

document.getElementsByTagName('form')[0].onsubmit = submitHandler
