const API = 'http://localhost:3000'
// $('.classArea').hide()
$('.workArea').show()
// $('.workArea').show()
$('.classArea').hide()

const currAssignmentID = null

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
    const IS_DELETED = false;
    const TRAINER_ID = loggedInUser.id
    // validation

    if(!ASSIGNMENT_ID || !ASSIGNMENT_NAME || !ASSIGNMENT_TYPE || !ASSIGNMENT_DESC || !DUE_DATE || !TO_COURSE || !TO_YEAR ){
        console.log("iNPUT REQUIREd");        
    }
    else{
        const assignmentDetails = {
            ASSIGNMENT_ID,ASSIGNMENT_NAME,ASSIGNMENT_TYPE,ASSIGNMENT_DESC,DUE_DATE,TO_COURSE,TO_YEAR,TRAINER_ID,SUBMITTED_DATE,EVALUATED_DATE,STATUS,MARKS,GRADE,IS_DELETED
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
    const VALUES = TASKS.filter(data=> data.TRAINER_ID === loggedInUser.id && data.IS_DELETED == false)
    console.log(TASKS);
    console.log(VALUES);
    
    renderAssignments(VALUES)
    counters(VALUES)
}

function renderAssignments(VALUES){
    $('.card-cont').html("")
    
    VALUES.forEach(assignment => {
        $('.card-cont').append(`<div class="card assignmentCard shawdow-lg col-6">
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
                                                                <button data-bs-toggle="modal" data-bs-target="#editAssignmentModal" class="border-0"><i class="bi bi-pencil-square"></i></button>
                                                                                    <button onclick="deleteAssignment('${assignment.id}')" class="border-0"><i class="bi bi-trash"></i></button>
                                                                                    <button onclick="evaluateAssignment('${assignment.id}')" data-bs-toggle="modal" data-bs-target="#evaluateAssignmentModal" class="border-0"><i class="bi bi-card-checklist"></i></i></button>
                                                            </div>
                                                            <div class="rightSide d-flex gap-3">
                                                                <p class="">Marks: ${assignment.MARKS}</p>
                                                                <p class="">Grade: ${assignment.GRADE}</p>
                                                            </div>
                                                        </div>
                                                    </div>`)
        // editAssignment(assignment.id)
        
    });
}

function getCreatedDate(){
    const now = new Date()
    return now;
}




async function deleteAssignment(id){

    await fetch(`${API}/assignments/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            IS_DELETED: true
        })
    });

    getAssignments();
}

// const VALUES = TASKS.filter(
// data =>
//     data.TRAINER_ID === loggedInUser.id &&
//     !data.IS_DELETED
// )

// renderAssignments(VALUES)
// counters(VALUES)

function counters(TASKS){
    // const VALID_ASSIGNMENT = TASKS.filter(tasks=>tasks.IS_DELETED == false)
    // console.log(VALID_ASSIGNMENT);
    
    // if(VALID_ASSIGNMENT){
        const COMPLETED =TASKS.filter(tasks=>tasks.STATUS == "Completed").length
        const EVALUATED =TASKS.filter(tasks=>tasks.STATUS == "Evaluated").length
        const PENDING =TASKS.filter(tasks=>tasks.STATUS == "Pending").length
        const OVERDUE =TASKS.filter(tasks=>tasks.STATUS == "Over Due").length
        if(COMPLETED>=0){
            $('#completedCount').text(COMPLETED)
        }   
        if(EVALUATED>=0){
            $('#evaluatedCount').text(EVALUATED)
        }   
        if(PENDING>=0){
            $('#pendingCount').text(PENDING)
        }   
        if(OVERDUE>=0){
            $('#overDueCount').text(OVERDUE)
        }      
}
async function getAssignmentID(){
    const RESPONSE = await fetch(`${API}/assignments`)
    const TASKS = await RESPONSE.json()
    const CONTENT = TASKS.filter(data=> data.TRAINER_ID === loggedInUser.id)
    const VALUES = TASKS.filter(data=> data.TRAINER_ID === loggedInUser.id && data.IS_DELETED == false)
    const A_ID = CONTENT.find(data=>data.id)

    editAssignment(VALUES,A_ID.id)
    evaluateAssignment(A_ID)
}

async function evaluateAssignment(id){
    const MARKS = $('#eval_marks').val().trim()
    const GRADE = ''
if(!MARKS){
    console.log("INPUT REquired");
}
else{
    if(MARKS >=90){
         GRADE = 'A'
    }
    else if(MARKS >= 80){
         GRADE = 'B'
    }
    else if(MARKS >= 65){
         GRADE = 'C'
    }
    else if(MARKS >= 50){
         GRADE = 'D'
    }
    else{
         GRADE = 'F'
    }

    // const evaluatedMarksGrade = {
    //         MARKS,GRADE
    //     }
        const RESPONSE = await fetch(`${API}/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                MARKS:MARKS,
                GRADE:GRADE
            })
        });
        
    
        // getAssignments()
        const EVALUATED_ASSIGNMENT_MODAL = bootstrap.Modal.getInstance(
            document.getElementById('evaluateAssignmentModal')
        )
        EVALUATED_ASSIGNMENT_MODAL.hide()
        
    }
    // renderAssignments(VALUES)
}







async function editAssignment(VALUES,id){
    const ASSIGNMENT_ID = $('#editAssignmentID').val().trim()
    const ASSIGNMENT_NAME = $('#editAssignmentName').val().trim()
    const ASSIGNMENT_TYPE = $('#editAssignmentType').val().trim()
    const ASSIGNMENT_DESC = $('#editAssignmentDesc').val().trim()
    const DUE_DATE = $('#editDueDate').val().trim()
    const TO_COURSE = $('#editAssignToCourse').val().trim()
    const TO_YEAR = $('#editAssignToYear').val().trim()
    const TRAINER_ID = loggedInUser.id
    // validation

    if(!ASSIGNMENT_ID || !ASSIGNMENT_NAME || !ASSIGNMENT_TYPE || !ASSIGNMENT_DESC || !DUE_DATE || !TO_COURSE || !TO_YEAR ){
        console.log("iNPUT REQUIREd");        
    }
    else{
        const editedAssignmentDetails = {
            ASSIGNMENT_ID,ASSIGNMENT_NAME,ASSIGNMENT_TYPE,ASSIGNMENT_DESC,DUE_DATE,TO_COURSE,TO_YEAR,TRAINER_ID
        }
        const RESPONSE = await fetch(`${API}/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedAssignmentDetails)
        });
        
    
        // getAssignments()
        const EDIT_ASSIGNMENT_MODAL = bootstrap.Modal.getInstance(
            document.getElementById('editAssignmentModal')
        )
        EDIT_ASSIGNMENT_MODAL.hide()
        
    }
    renderAssignments(VALUES)
}

$('#createAssignmentBtn').click(()=> addAssignment())
$('#editAssignmentBtn').click(()=> getAssignmentID())
$('#eval_submit').click(()=> getAssignmentID())

getAssignments()