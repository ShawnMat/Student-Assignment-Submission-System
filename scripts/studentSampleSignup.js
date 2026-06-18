const API = 'http://localhost:3000'

$('#academicDetails').hide();
$('#loginCard').hide();

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
    
        const RESPONSE = await fetch(`${API}/students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentPersonalDetails)
        });
        

        const NEW_STUDENT = await RESPONSE.json();

        const STUDENT_ID = NEW_STUDENT.id;

        localStorage.setItem("studentId", STUDENT_ID);
        // const RESPONSE = await fetch(`${API}/students`)
        // const VALUES = await RESPONSE.json()
        // const length = VALUES.length
        // console.log(VALUES);
        // console.log(length);
        
        // const ID = VALUES.find(user=>user.id == length-1)
        // console.log(ID.id);
        
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
        const studentId = localStorage.getItem("studentId");
        await fetch(`${API}/students/${studentId}`, {
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
        const studentId = localStorage.getItem("studentId");
        await fetch(`${API}/students/${studentId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentCredentials)
        });
        localStorage.removeItem("studentId");
        setTimeout(() => {
            window.location.replace('/pages/studentSampleLogin.html')
        }, 2000);
    }
}


$('#continueNext').click(()=>personalDetails())
$('#continueBtn').click(()=>academicDetails())
$('#submitRegBtn').click(()=>loginCard())