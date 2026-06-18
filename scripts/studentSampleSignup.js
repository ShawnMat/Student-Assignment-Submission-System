const API = 'http://localhost:3000'


async function personalDetails(){
    const FIRST_NAME = $('#fname').val().trim()
    const MIDDLE_NAME = $('#mname').val().trim()
    const LAST_NAME = $('#lname').val().trim()
    const GENDER = $('input[name="gender"]:checked').val();
    const DATE_OF_BIRTH = $('#dob').val().trim()
    
    // Gender value = 'on'?
    // console.log(GENDER);

    //VALIDATION
    if(!FIRST_NAME || !MIDDLE_NAME || !LAST_NAME || !GENDER || !DATE_OF_BIRTH ){
        console.log("iNPUT REQUIREd");        
    }
    else{      
        const studentPersonalDetails = {
            FIRST_NAME,MIDDLE_NAME,LAST_NAME,GENDER,DATE_OF_BIRTH
        }
    
        await fetch(`${API}/students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentPersonalDetails)
        });
        
        const RESPONSE = await fetch(`${API}/students`)
        const VALUES = await RESPONSE.json()
        const length = VALUES.length
        console.log(VALUES);
        console.log(length);
        
        const ID = VALUES.find(user=>user.id = length-1)
        console.log(ID.id);
        
        $('#personalDetailsCard').hide()
        $('#academicDetails').show()
    
        
    }
}



async function academicDetails(){
    const COLLEGE_NAME = $('#collegename').val().trim()
    const DEPARMENT_NAME = $('#departmentname').val().trim()
    const COURSE_NAME = $('#coursename').val().trim()
    const YEAR = $('#yearnumber').val();
    const EMAILID = $('#emailid').val().trim()
    //VALIDATION
    if(!COLLEGE_NAME || !DEPARMENT_NAME || !COURSE_NAME || !YEAR || !EMAILID ){
        console.log("iNPUT REQUIREd");
    }
    else{      
        const studentAcademicDetails = {
            COLLEGE_NAME,DEPARMENT_NAME,COURSE_NAME,YEAR,EMAILID
        }
        await fetch(`${API}/students`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentAcademicDetails)
        });
        $('#academicDetails').hide()
        $('#loginCard').show()
    }
}



async function loginCard(){
    const USERNAME = $('#username').val().trim()
    const PASSWORD = $('#password').val().trim()
    const CONFIRM_PASSWORD = $('#cpassword').val().trim()
    //VALIDATION
    if(!USERNAME || !PASSWORD || !CONFIRM_PASSWORD){
        console.log("iNPUT REQUIREd");
    }
    else{      
        const studentCredentials = {
            USERNAME,PASSWORD
        }
    
        await fetch(`${API}/students`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentCredentials)
        });
        setTimeout(() => {
            window.location.replace('/pages/studentSampleLogin.html')
        }, 2000);
    }
}


$('.continue').click(()=>personalDetails())
$('#continueBtn').click(()=>academicDetails())
$('#submitRegBtn').click(()=>loginCard())