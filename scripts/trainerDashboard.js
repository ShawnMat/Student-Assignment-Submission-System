const API = 'http://localhost:3000'
// $('.classArea').hide()
$('.workArea').show()
// $('.workArea').show()
$('.classArea').hide()

const loggedInUser = JSON.parse(localStorage.getItem('loginUser'))
console.log(loggedInUser);

async function addAssignment(){
    const ASSIGNMENT_ID = $('#assignmentID').val().trim()
    const ASSIGNMENT_NAME = $('#assignmentName').val().trim()
    const ASSIGNMENT_TYPE = $('#assignmentType').val().trim()
    const ASSIGNMENT_DESC = $('#assignmentDesc').val().trim()
    const DUE_DATE = $('#dueDate').val().trim()
    const TO_COURSE = $('#assignToCourse').val().trim()
    const TO_YEAR = $('#assignToYear').val().trim()
    const TRAINER_ID = loggedInUser.id
    // validation

    if(!ASSIGNMENT_ID || !ASSIGNMENT_NAME || !ASSIGNMENT_TYPE || !ASSIGNMENT_DESC || !DUE_DATE || !TO_COURSE || !TO_YEAR ){
        console.log("iNPUT REQUIREd");        
    }
    else{
        const assignmentDetails = {
            ASSIGNMENT_ID,ASSIGNMENT_NAME,ASSIGNMENT_TYPE,ASSIGNMENT_DESC,DUE_DATE,TO_COURSE,TO_YEAR,TRAINER_ID
        }
        await fetch(`${API}/assignments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assignmentDetails)
        });
    
        getAssignments()
        const CREATE_ASSIGNMENT_MODAL = bootstrap.Modal.getInstance(
            document.getElementById('createAssignmentModal')
        )
        CREATE_ASSIGNMENT_MODAL.hide()
        
    }
}

async function getAssignments(){
    const loggedInUser = JSON.parse(
    localStorage.getItem('loginUser'))
    // const username = localStorage.getItem("Username")
    console.log(loggedInUser);
    
    const RESPONSE = await fetch(`${API}/assignments`)
    const TASKS = await RESPONSE.json()
    const VALUES = TASKS.filter(data=> data.TRAINER_ID === loggedInUser.id)
    console.log(TASKS);
    console.log(VALUES);
    
    renderAssignments(VALUES)
}

function renderAssignments(VALUES){
    $('.card-cont').html("")
    VALUES.forEach(assignment => {
        $('.card-cont').append(`<div class="card shawdow-lg col-6">
                                                        <div class="card-title pt-2 ps-2">
                                                            <h4>${assignment.ASSIGNMENT_NAME}</h4>
                                                            <div class="assignment_meta_data d-flex justify-content-between pe-3">
                                                                <div class="id_type ">
                                                                    <p class="m-0">Assignment ID: ${assignment.ASSIGNMENT_ID}</p>
                                                                    <p>Assignment Type: ${assignment.ASSIGNMENT_TYPE}</p>
                                                                </div>
                                                                <div class="due_date d-flex gap-1">
                                                                    <p>Due on: </p>
                                                                    <p>${assignment.DUE_DATE}</p>
                                                                </div>
                                                            </div>
                                                            <div class="course_meta_data d-flex justify-content-between pe-3">
                                                                <div class="id_type d-flex gap-2">
                                                                    <p>Course:</p>
                                                                    <p>${assignment.TO_COURSE}</p>
                                                                </div>
                                                                <div class="due_date d-flex gap-1">
                                                                    <p>Year: </p>
                                                                    <p>${assignment.TO_YEAR}</p>
                                                                </div>
                                                            </div>
        
                                                        </div>
                                                        <div class="card-body d-flex gap-1 ps-2 pt-0">
                                                            <p> Description: </p>
                                                            <p>${assignment.ASSIGNMENT_DESC}</p>
                                                        </div>
                                                        <div class="card-footer ps-2">
                                                            <button class="border-0"><i class="bi bi-pencil-square"></i></button>
                                                            <button class="border-0"><i class="bi bi-trash"></i></button>
                                                            <button class="border-0"><i class="bi bi-eye"></i></button>
                                                        </div>
                                                    </div>`)
        
    });
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

$('#createAssignmentBtn').click(()=> addAssignment())

getAssignments()