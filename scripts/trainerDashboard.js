const API = 'http://localhost:3000'
// $('.classArea').hide()
$('.workArea').show()
// $('.workArea').show()
$('.classArea').hide()

const loggedInUser = JSON.parse(localStorage.getItem('loginUser'))
console.log(loggedInUser);

const TODAY_DATE = getCreatedDate()
console.log(TODAY_DATE.getDate());
async function addAssignment(){
    
    const ASSIGNMENT_ID = $('#assignmentID').val().trim()
    const ASSIGNMENT_NAME = $('#assignmentName').val().trim()
    const ASSIGNMENT_TYPE = $('#assignmentType').val().trim()
    const ASSIGNMENT_DESC = $('#assignmentDesc').val().trim()
    const DUE_DATE = $('#dueDate').val().trim()
    const SUBMITTED_DATE = 'Not Submitted'
    const EVALUATED_DATE = 'Not Evaluated'
    const TO_COURSE = $('#assignToCourse').val().trim()
    const TO_YEAR = $('#assignToYear').val().trim()
    const STATUS = "Pending"
    const MARKS = 0;
    const GRADE = "F";
    const TRAINER_ID = loggedInUser.id
    // validation

    if(!ASSIGNMENT_ID || !ASSIGNMENT_NAME || !ASSIGNMENT_TYPE || !ASSIGNMENT_DESC || !DUE_DATE || !TO_COURSE || !TO_YEAR ){
        console.log("iNPUT REQUIREd");        
    }
    else{
        const assignmentDetails = {
            ASSIGNMENT_ID,ASSIGNMENT_NAME,ASSIGNMENT_TYPE,ASSIGNMENT_DESC,DUE_DATE,TO_COURSE,TO_YEAR,TRAINER_ID,SUBMITTED_DATE,EVALUATED_DATE,STATUS,MARKS,GRADE
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
    counters(VALUES)
}

function renderAssignments(VALUES){
    $('.card-cont').html("")
    VALUES.forEach(assignment => {
        $('.card-cont').append(`<div class="card shawdow-lg col-6">
                                                        <div class="card-title pt-2 ps-2">
                                                            <div class="d-flex justify-content-between pe-2">
                                                                <h4>${assignment.ASSIGNMENT_NAME}</h4>
                                                                <div>${assignment.STATUS}</div>
                                                            </div>
                                                            <div class="assignment_meta_data d-flex justify-content-between pe-3">
                                                                <div class="id_type ">
                                                                    <p class="m-0">Assignment ID: ${assignment.ASSIGNMENT_ID}</p>
                                                                    <p>Assignment Type: ${assignment.ASSIGNMENT_TYPE}</p>
                                                                </div>
                                                                <div class="due_date ">
                                                                <p class="m-0">Due on: ${assignment.DUE_DATE}</p>
                                                                <p class="m-0">Submitted on: ${assignment.SUBMITTED_DATE}</p>
                                                                <p>Evaluated on: ${assignment.EVALUATED_DATE}</p>
                                                                </div>
                                                            </div>
                                                            <div class="course_meta_data d-flex justify-content-between pe-3">
                                                                <div class="id_type">
                                                                    <p></p>
                                                                    <p>Course: ${assignment.TO_COURSE}</p>
                                                                </div>
                                                                <div class="due_date">
                                                                    <p></p>
                                                                    <p>Year: ${assignment.TO_YEAR}</p>
                                                                </div>
                                                            </div>
        
                                                        </div>
                                                        <div class="card-body ps-2 pt-0">
                                                            <p>Description: ${assignment.ASSIGNMENT_DESC}</p>
                                                        </div>
                                                        <div class="card-footer d-flex justify-content-between ps-2">
                                                            <div class="leftSide">
                                                                <button class="border-0"><i class="bi bi-pencil-square"></i></button>
                                                                                    <button class="border-0"><i class="bi bi-trash"></i></button>
                                                                                    <button class="border-0"><i class="bi bi-card-checklist"></i></i></button>
                                                            </div>
                                                            <div class="rightSide d-flex gap-3">
                                                                <p class="">Marks: ${assignment.MARKS}</p>
                                                                <p class="">Grade: ${assignment.GRADE}</p>
                                                            </div>
                                                        </div>
                                                    </div>`)
        
    });
}

function getCreatedDate(){
    const now = new Date()
    return now;

}
function counters(VALUES){
    if(VALUES.forEach(tasks=>tasks.STATUS == "Completed")){
        $(#completedCount).append()
    }   
    
}
$('#createAssignmentBtn').click(()=> addAssignment())

getAssignments()