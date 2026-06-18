
const API = 'http://localhost:3000';

$('.workArea').show();
$('.classArea').hide();

const loggedInUser = JSON.parse(
    localStorage.getItem('loginUser')
);

let currentAssignmentId = null;


async function addAssignment(){

    const ASSIGNMENT_ID = $('#assignmentID').val().trim();
    const ASSIGNMENT_NAME = $('#assignmentName').val().trim();
    const ASSIGNMENT_TYPE = $('#assignmentType').val().trim();
    const ASSIGNMENT_DESC = $('#assignmentDesc').val().trim();
    const DUE_DATE = $('#dueDate').val().split('-').reverse().join('-');
    const TO_COURSE = $('#assignToCourse').val().trim();
    const TO_YEAR = $('#assignToYear').val().trim();

    if(!ASSIGNMENT_ID || !ASSIGNMENT_NAME || !ASSIGNMENT_TYPE || !ASSIGNMENT_DESC || !DUE_DATE || !TO_COURSE || !TO_YEAR ){
        console.log("iNPUT REQUIREd");        
    }

    const assignmentDetails = {
        ASSIGNMENT_ID,
        ASSIGNMENT_NAME,
        ASSIGNMENT_TYPE,
        ASSIGNMENT_DESC,
        DUE_DATE,
        TO_COURSE,
        TO_YEAR,

        TRAINER_ID: loggedInUser.id,

        STATUS: "Pending",
        MARKS: 0,
        GRADE: "F",

        SUBMITTED_DATE: "Not Submitted",
        EVALUATED_DATE: "Not Evaluated",

        IS_DELETED: false
    };

    await fetch(`${API}/assignments`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(assignmentDetails)
    });

    getAssignments();

    bootstrap.Modal
        .getInstance(
            document.getElementById('createAssignmentModal')
        )
        .hide();

    $('#createAssignmentModal input').val('');
}

async function getAssignments(){

    const response = await fetch(`${API}/assignments`);

    const tasks = await response.json();

    const assignments = tasks.filter(task =>
        task.TRAINER_ID === loggedInUser.id &&
        task.IS_DELETED === false
    );

    renderAssignments(assignments);
    counters(assignments);
}

function renderAssignments(assignments){

    $('.card-cont').html('');

    assignments.forEach(assignment => {

        $('.card-cont').append(`
        
        <div class="card assignmentCard shadow-lg col-6">

            <div class="card-title pt-2 ps-2">

                <div class="d-flex justify-content-between pe-2">
                    <h4>${assignment.ASSIGNMENT_NAME}</h4>
                    <div>${assignment.STATUS}</div>
                </div>

                <div class="assignment_meta_data d-flex justify-content-between pe-3">

                    <div>
                        <p class="m-0">
                            Assignment ID:
                            ${assignment.ASSIGNMENT_ID}
                        </p>

                        <p>
                            Assignment Type:
                            ${assignment.ASSIGNMENT_TYPE}
                        </p>
                    </div>

                    <div>
                        <p class="m-0">
                            Due:
                            ${assignment.DUE_DATE}
                        </p>

                        <p class="m-0">
                            Submitted:
                            ${assignment.SUBMITTED_DATE}
                        </p>

                        <p>
                            Evaluated:
                            ${assignment.EVALUATED_DATE}
                        </p>
                    </div>

                </div>

                <div class="d-flex justify-content-between pe-3">

                    <p>
                        Course:
                        ${assignment.TO_COURSE}
                    </p>

                    <p>
                        Year:
                        ${assignment.TO_YEAR}
                    </p>

                </div>

            </div>

            <div class="card-body">
                <p>
                    ${assignment.ASSIGNMENT_DESC}
                </p>
            </div>

            <div class="card-footer d-flex justify-content-between">

                <div>

                    <button
                        onclick="openEditModal('${assignment.id}')"
                        data-bs-toggle="modal"
                        data-bs-target="#editAssignmentModal"
                        class="border-0">

                        <i class="bi bi-pencil-square"></i>
                    </button>

                    <button
                        onclick="deleteAssignment('${assignment.id}')"
                        class="border-0">

                        <i class="bi bi-trash"></i>
                    </button>

                    <button
                        onclick="openEvaluateModal('${assignment.id}')"
                        data-bs-toggle="modal"
                        data-bs-target="#evaluateAssignmentModal"
                        class="border-0">

                        <i class="bi bi-card-checklist"></i>
                    </button>

                </div>

                <div class="d-flex gap-3">

                    <p>
                        Marks:
                        ${assignment.MARKS}
                    </p>

                    <p>
                        Grade:
                        ${assignment.GRADE}
                    </p>

                </div>

            </div>

        </div>

        `);
    });
}


async function deleteAssignment(id){

    await fetch(`${API}/assignments/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            IS_DELETED:true
        })
    });

    getAssignments();
}


async function openEditModal(id){

    currentAssignmentId = id;

    const response =
        await fetch(`${API}/assignments/${id}`);

    const assignment =
        await response.json();

    $('#editAssignmentID')
        .val(assignment.ASSIGNMENT_ID);

    $('#editAssignmentName')
        .val(assignment.ASSIGNMENT_NAME);

    $('#editAssignmentType')
        .val(assignment.ASSIGNMENT_TYPE);

    $('#editAssignmentDesc')
        .val(assignment.ASSIGNMENT_DESC);

    $('#editAssignToCourse')
        .val(assignment.TO_COURSE);

    $('#editAssignToYear')
        .val(assignment.TO_YEAR);
}


async function editAssignment(id){

    const updatedAssignment = {

        ASSIGNMENT_ID:
            $('#editAssignmentID').val().trim(),

        ASSIGNMENT_NAME:
            $('#editAssignmentName').val().trim(),

        ASSIGNMENT_TYPE:
            $('#editAssignmentType').val().trim(),

        ASSIGNMENT_DESC:
            $('#editAssignmentDesc').val().trim(),

        TO_COURSE:
            $('#editAssignToCourse').val().trim(),

        TO_YEAR:
            $('#editAssignToYear').val().trim()
    };

    await fetch(`${API}/assignments/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(updatedAssignment)
    });

    bootstrap.Modal
        .getInstance(
            document.getElementById('editAssignmentModal')
        )
        .hide();

    getAssignments();
}


function openEvaluateModal(id){
    currentAssignmentId = id;
}


async function evaluateAssignment(id){

    const MARKS =
        Number($('#eval_marks').val());

    if(!MARKS && MARKS !== 0){
        alert('Enter Marks');
        return;
    }

    let GRADE;

    if(MARKS >= 90){
        GRADE = 'A';
    }
    else if(MARKS >= 80){
        GRADE = 'B';
    }
    else if(MARKS >= 65){
        GRADE = 'C';
    }
    else if(MARKS >= 50){
        GRADE = 'D';
    }
    else{
        GRADE = 'F';
    }

    const today = new Date();

    const evaluatedDate =
        String(today.getDate()).padStart(2,'0')
        + '-'
        + String(today.getMonth()+1).padStart(2,'0')
        + '-'
        + today.getFullYear();

    await fetch(`${API}/assignments/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            MARKS,
            GRADE,
            STATUS:'Evaluated',
            EVALUATED_DATE:evaluatedDate
        })
    });

    bootstrap.Modal
        .getInstance(
            document.getElementById('evaluateAssignmentModal')
        )
        .hide();

    getAssignments();
}



function counters(tasks){

    $('#completedCount')
        .text(
            tasks.filter(
                t => t.STATUS === 'Completed'
            ).length
        );

    $('#evaluatedCount')
        .text(
            tasks.filter(
                t => t.STATUS === 'Evaluated'
            ).length
        );

    $('#pendingCount')
        .text(
            tasks.filter(
                t => t.STATUS === 'Pending'
            ).length
        );

    $('#overDueCount')
        .text(
            tasks.filter(
                t => t.STATUS === 'Over Due'
            ).length
        );
}



$('#createAssignmentBtn')
    .click(addAssignment);

$('#editAssignmentBtn')
    .click(() =>
        editAssignment(currentAssignmentId)
    );

$('#eval_submit')
    .click(() =>
        evaluateAssignment(currentAssignmentId)
    );

getAssignments();

