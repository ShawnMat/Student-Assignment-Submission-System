const API = 'http://localhost:3000'
// $('.classArea').hide()
$('.workArea').hide()
// $('.workArea').show()
$('.classArea').show()
$('#createAssignmentBtn').click(()=>{
    const CREATE_ASSIGNMENT_MODAL = bootstrap.Modal.getInstance(
        document.getElementById('createAssignmentModal')
    )
    CREATE_ASSIGNMENT_MODAL.hide()
    // storing trainer input values
    const ASSIGNMENT_ID = $('#assignmentID').val().trim()
    const ASSIGNMENT_NAME = $('#assignmentName').val().trim()
    const ASSIGNMENT_TYPE = $('#assignmentType').val().trim()
    const ASSIGNMENT_DESC = $('#assignmentDesc').val().trim()
    const DUE_DATE = $('#dueDate').val().trim()
    const TO_COURSE = $('#assignToCourse').val().trim()
    const TO_YEAR = $('#assignToYear').val().trim()
    // validation

    if(!ASSIGNMENT_ID || !ASSIGNMENT_NAME || !ASSIGNMENT_TYPE || !ASSIGNMENT_DESC || !DUE_DATE || !TO_COURSE || !TO_YEAR ){
        console.log("iNPUT REQUIREd");        
    }
    else{
        const assignmentDetails = {
            ASSIGNMENT_ID,ASSIGNMENT_NAME,ASSIGNMENT_TYPE,ASSIGNMENT_DESC,DUE_DATE,TO_COURSE,TO_YEAR
        }
        addAssignment(assignmentDetails)
    }
})


async function addAssignment(assignmentDetails){
    await fetch(`${API}/assignments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignmentDetails)
    });

    getAssignments()
}

async function getAssignments(){
    const RESPONSE = await fetch(`${API}/assignments`)
    const TASKS = RESPONSE.json()
    const VALUES = TASKS.filter(data=> )
    

}


// $(#dashboardBtn).click(()=>{
    // $('.workArea').hide()
    // $('.classArea').hide()
    // $('.workArea').show()
    // $('.classArea').show()
// })
// $(#assignmentBtn).click(()=>{
    // $('.workArea').hide()
    // $('.classArea').hide()
    // $('.workArea').show()
    // $('.classArea').show()
// })

