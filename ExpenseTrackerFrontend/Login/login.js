async function logIn(event) {
    try {

        event.preventDefault(event)
        
        const loginDetails = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        const res = await axios.post("http://localhost:3000/user/login", loginDetails)
        alert(res.data.message)

    } catch (err) {
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
    }
}