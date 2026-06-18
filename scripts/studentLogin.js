const API = 'http://localhost:3000'
$('.submit').click(async function(){
    try{
        const USERNAME = $('#username').val().trim()
        const PASSWORD = $('#password').val().trim()
        const RESPONSE = await fetch(`${API}/students`)
        const USERS = await RESPONSE.json()
        const VALID_USER = USERS.find(user => user.Username == USERNAME && user.Password==PASSWORD)

        if(VALID_USER){
            console.log("Succes")
            setTimeout(() => {
                window.location.replace("studentSampleDashboard.html")
            }, 2000);
        }
        else{
            console.log("Failed");
            
        }
    }
    catch(error){
        console.error(error);
    }
})



