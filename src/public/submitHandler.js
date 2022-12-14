const getCodeFromDisplayName = airline => {
  //Matchs the substring that is between the parenthesis
  //This will fail if some string has more than 1 pair of parenthesis
  const regexp = /\((.*)\)/
  const result = regexp.exec(airline)
  return result? result[1] : airline
}

const generateBody = form => ({
  airline: getCodeFromDisplayName(form.airline.value),
  username: form.username.value,
  password: form.password.value,
  remember_me: form.remember_me.value
})

const login = async body => {
  const options = {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch('/api/login', options)
  const responseJson = await response.json()
  const status = response.status
  return {
    status,
    response: responseJson
  }
}

const submitHandler = async event => {
  event.preventDefault()
  const body = JSON.stringify(generateBody(event.target))
  try {
    const { status, response } = await login(body)
    if(status === 200) {
      window.location.replace(response.redirect)
    }
    else {
      //Handle other status codes
      console.log(status, payload)
    }
  }
  catch(err) {
    console.log(err)
  }
}
document.getElementsByTagName('form')[0].onsubmit = submitHandler
