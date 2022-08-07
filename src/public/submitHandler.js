const getCodeFromDisplayName = airline => {
  //Matchs the substring that is between the parenthesis
  //This will fail if some string has more than 1 pair of parenthesis
  const regexp = /\((.*)\)/
  const result = regexp.exec(airline)
  return result[1]
}

const generateBody = form => ({
  airline: getCodeFromDisplayName(form.airline.value),
  username: form.username.value,
  password: form.password.value,
  remember_me: form.remember_me.value
})

const submitHandler = event => {
  event.preventDefault()
  const body = JSON.stringify(generateBody(event.target))
  const options = {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' }
  }
  fetch('/api/login', options)
    .then(response => {
      return Promise.all([
	response.status,
        response.json()
      ])
    })
    .then(data => {
      const [status, payload] = data
      if(status === 200) {
        window.location.replace(payload.redirect)
      }
      else {
	//Handle other status codes
	console.log(status, payload)
      }
    })
    .catch(err => {
      console.log(err)
    })
}
document.getElementsByTagName('form')[0].onsubmit = submitHandler
