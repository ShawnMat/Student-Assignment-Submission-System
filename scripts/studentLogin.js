const API = 'http://localhost:3000'

$('.submit').click(async function () {
    try {
        const username = $('#username').val()
        const password = $('#password').val()

        const response = await fetch(`${API}/students`)
        const users = await response.json()

        const student = users.find(user => user.USERNAME === username && user.PASSWORD === password)

        if (student) {
            localStorage.setItem("Student", JSON.stringify(student))
            const loggedInStudent  = localStorage.setItem("isLoggedIn", "true")
            console.log(loggedInStudent)
            
            console.log("Success!!")

            window.location.replace("/pages/studentSampleDashboard.html")
        } else {
            alert("Invalid Username or Password")
        }

    } catch (error) {
        console.error(error)
    }
})