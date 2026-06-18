const API = 'http://localhost:3000'
$('.submit').click(async function () {
    try{
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value 
        const response = await fetch(`${API}/students`)
        const users = await response.json()
        const values = users.find(users=>{   
            // console.log(username);
            // console.log(password);
            // console.log(users.Username);
            // console.log(users.Password);
            const VALID_USER = users.USERNAME === username && users.PASSWORD === password
                if(VALID_USER){
                    localStorage.clear()
                    localStorage.setItem("Username", user.username)
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("studentId", user.id);
                    localStorage.setItem("username", user.USERNAME);
                    
                    console.log("Success!!");
                    window.location.replace("/pages/studentSampleDashboard.html")
                }
                else{
                    console.log("Sorry, Couldn't connect you to server.");
                        
                    }
                })
            // console.log(values);
            
        }
        catch{
            console.error();
            
        }

    
})
