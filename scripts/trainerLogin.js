const API = 'http://localhost:3000'

$('.submit').click(async function () {
    try{
        const username = $('#username').val().trim()
        const password = $('#password').val().trim()
            
        const response = await fetch(`${API}/trainers`)
        const users = await response.json()
        const values = users.find(users=>
            users.Username === username && users.Password === password
        )
            // console.log(username);
            // console.log(password);
            // console.log(users.Username);
            // console.log(users.Password);
            
            if(values){
                localStorage.setItem("loginUser",JSON.stringify(values))
                console.log("Success!!");
                window.location.replace("/pages/trainerDashboard.html")
            }
            else{
                console.log("Sorry, Couldn't connect you to server.");
                    
                }
            
            // console.log(values);
            
        }
        catch(error){
            console.log(error);
            
        }

    
})
