const API = 'http://localhost:3000'
$('.workArea').show()
$('.classArea').hide()

const currAssignmentID = null

const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));

if (!loggedInUser) {
    window.location.replace('/pages/trainerLogin.html');
}

$('#logoutBtn').click(function () {

    localStorage.removeItem('loginUser');
    localStorage.removeItem('isLoggedIn');

    window.location.replace('/pages/trainerLogin.html');

});

$('.sidebarBtns').click(function(){

    $('.sidebarBtns').removeClass('active');

    $(this).addClass('active');

});

$('#dashboardBtn').click(function(){

    $('.sidebarBtns').removeClass('active');
    $(this).addClass('active');

    $('#dashboardSection').show();
    $('#assignmentSection').hide();
    $('#submissionSection').hide();
    $('#studentsSection').hide();
    $('#calendarSection').hide();
    $('#reportsSection').hide();

});

$('#assignmentBtn').click(function(){

    $('.sidebarBtns').removeClass('active');
    $(this).addClass('active');

    $('#dashboardSection').hide();
    $('#assignmentSection').show();
    $('#submissionSection').hide();
    $('#studentsSection').hide();
    $('#calendarSection').hide();
    $('#reportsSection').hide();

});

$('#submissionBtn').click(function(){

    $('.sidebarBtns').removeClass('active');
    $(this).addClass('active');

    $('#dashboardSection').hide();
    $('#assignmentSection').hide();
    $('#submissionSection').show();
    $('#studentsSection').hide();
    $('#calendarSection').hide();
    $('#reportsSection').hide();

});

$('#studentsBtn').click(function(){

    $('.sidebarBtns').removeClass('active');
    $(this).addClass('active');

    $('#dashboardSection').hide();
    $('#assignmentSection').hide();
    $('#submissionSection').hide();
    $('#studentsSection').show();
    $('#calendarSection').hide();
    $('#reportsSection').hide();

});

$('#calendarBtn').click(function(){

    $('.sidebarBtns').removeClass('active');
    $(this).addClass('active');

    $('#dashboardSection').hide();
    $('#assignmentSection').hide();
    $('#submissionSection').hide();
    $('#studentsSection').hide();
    $('#calendarSection').show();
    $('#reportsSection').hide();

});

$('#reportsBtn').click(function(){

    $('.sidebarBtns').removeClass('active');
    $(this).addClass('active');

    $('#dashboardSection').hide();
    $('#assignmentSection').hide();
    $('#submissionSection').hide();
    $('#studentsSection').hide();
    $('#calendarSection').hide();
    $('#reportsSection').show();

});

// const TODAY_DATE = getCreatedDate()
// console.log(TODAY_DATE.getDate());

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
        bootstrap.Modal.getInstance(
            document.getElementById('createAssignmentModal')
        ).hide()
        $('#createAssignmentModal input').val('');
    }
}

async function getAssignments(){
    // const loggedInUser = JSON.parse(
    // localStorage.getItem('loginUser'))
    // console.log(loggedInUser);
    
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
        $('.card-cont').append(`
<div class="card assignmentCard shadow border-0 m-2">
    
    <div class="card-header bg-white border-0">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h5 class="fw-bold mb-1">
                    ${assignment.ASSIGNMENT_NAME}
                </h5>

                <small class="text-muted">
                    ID : ${assignment.ASSIGNMENT_ID}
                </small>
            </div>

            <span class="badge ${
                assignment.STATUS === 'Evaluated'
                ? 'bg-success'
                : assignment.STATUS === 'Completed'
                ? 'bg-primary'
                : assignment.STATUS === 'Over Due'
                ? 'bg-danger'
                : 'bg-warning text-dark'
            }">
                ${assignment.STATUS}
            </span>
        </div>
    </div>

    <div class="card-body">

        <p class="text-muted small mb-3">
            ${assignment.ASSIGNMENT_DESC}
        </p>

        <div class="row g-2">

            <div class="col-6">
                <div class="bg-light rounded p-2">
                    <small class="text-muted">Course</small>
                    <div>${assignment.TO_COURSE}</div>
                </div>
            </div>

            <div class="col-6">
                <div class="bg-light rounded p-2">
                    <small class="text-muted">Year</small>
                    <div>${assignment.TO_YEAR}</div>
                </div>
            </div>

            <div class="col-6">
                <div class="bg-light rounded p-2">
                    <small class="text-muted">Due Date</small>
                    <div>${assignment.DUE_DATE}</div>
                </div>
            </div>
            <div class="col-6">
                <div class="bg-light rounded p-2">
                    <small class="text-muted">Submitted Date</small>
                    <div>${assignment.SUBMITTED_DATE}</div>
                </div>
            </div>

            <div class="col-6">
                <div class="bg-light rounded p-2">
                    <small class="text-muted">Type</small>
                    <div>${assignment.ASSIGNMENT_TYPE}</div>
                </div>
            </div>

        </div>

    </div>

    <div class="card-footer bg-white d-flex justify-content-between align-items-center">

        <div class="d-flex gap-2">

            <button onclick="openEditModal('${assignment.id}')" data-bs-toggle="modal" data-bs-target="#editAssignmentModal" class="btn btn-outline-primary btn-sm"> <i class="bi bi-pencil-square"></i>
            </button>

            <button onclick="deleteAssignment('${assignment.id}')" class="btn btn-outline-danger btn-sm"> <i class="bi bi-trash"></i>
            </button>

            <button onclick="openEvaluateModal('${assignment.id}')" data-bs-toggle="modal" data-bs-target="#evaluateAssignmentModal" class="btn btn-outline-success btn-sm"> <i class="bi bi-check2-square"></i>
            </button>

        </div>

        <div class="text-end">
            <div class="fw-bold fs-5">
                ${assignment.MARKS}/100
            </div>
            <small class="text-muted">
                Grade ${assignment.GRADE}
            </small>
        </div>

    </div>

</div>
`)
        // editAssignment(assignment.id)
        
    });
}

// function getCreatedDate(){
//     const now = new Date()
//     return now;
// }




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
        await fetch(`${API}/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedAssignmentDetails)
        });
        
    
        // getAssignments()
        bootstrap.Modal.getInstance(
            document.getElementById('editAssignmentModal')
        ).hide()
        
    }
    getAssignments();
    // renderAssignments(VALUES)
}

function openEvaluateModal(id){
    currentAssignmentId = id;
}

async function evaluateAssignment(id){
    const MARKS = $('#eval_marks').val().trim()
    let GRADE;
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
        await fetch(`${API}/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                MARKS,
                GRADE,
                STATUS:'Evaluated',
            })
            
        });
        
    
        // getAssignments()
        bootstrap.Modal.getInstance(
            document.getElementById('evaluateAssignmentModal')
        ).hide()
        
    }

    getAssignments();
}

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


// async function filterByStatus(){
//     const RESPONSE = await fetch(`${API}/assignments`)
//     const TASKS = await RESPONSE.json()
//     const COMPLETED_VALUES = TASKS.filter(data=> data.TRAINER_ID === loggedInUser.id && data.IS_DELETED == false && data.STATUS == 'Completed')
//     const PENDING_VALUES = TASKS.filter(data=> data.TRAINER_ID === loggedInUser.id && data.IS_DELETED == false && data.STATUS == 'Pending')
//     const EVALUATED_VALUES = TASKS.filter(data=> data.TRAINER_ID === loggedInUser.id && data.IS_DELETED == false && data.STATUS == 'Evaluated')
//     const OVERDUE_VALUES = TASKS.filter(data=> data.TRAINER_ID === loggedInUser.id && data.IS_DELETED == false && data.STATUS == 'Over Due')

// }




$('#filter').on('change', function () {

    const FILTER = $(this).val();

    if (FILTER === 'Status') {
        new bootstrap.Modal(document.getElementById('filterStatus')
        ).show();
    }

    else if (FILTER === 'Date') {
        new bootstrap.Modal(document.getElementById('filterDate')
        ).show();
    }

    else if (FILTER === 'Grade') {
        new bootstrap.Modal(document.getElementById('filterGrade')
        ).show();
    }

});

$('#filterStatusSubmitBtn').click(async function () {

    const selectedStatus = $('#status').val();

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    const filteredAssignments = assignments.filter(data =>
        data.TRAINER_ID === loggedInUser.id &&
        !data.IS_DELETED &&
        data.STATUS === selectedStatus
    );

    renderAssignments(filteredAssignments);
    bootstrap.Modal.getOrCreateInstance(document.getElementById('filterStatus')
    ).hide();
});

$('#filterGradeSubmitBtn').click(async function () {

    const selectedGrade = $('#grade').val();

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    const filteredAssignments = assignments.filter(data =>
        data.TRAINER_ID === loggedInUser.id &&
        !data.IS_DELETED &&
        data.GRADE === selectedGrade
    );

    renderAssignments(filteredAssignments);
    bootstrap.Modal.getOrCreateInstance(document.getElementById('filterGrade')
    ).hide();   
});

$('#filterDateSubmitBtn').click(async function () {

    const startDate = $('#startdate').val();
    const endDate = $('#enddate').val();

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    const filteredAssignments = assignments.filter(data => {

        if (
            data.TRAINER_ID !== loggedInUser.id ||
            data.IS_DELETED
        ) {
            return false;
        }

        const dueDate = new Date(data.DUE_DATE);

        return (
            dueDate >= new Date(startDate) &&
            dueDate <= new Date(endDate)
        );
    });

    renderAssignments(filteredAssignments);
    bootstrap.Modal.getOrCreateInstance(document.getElementById('filterDate')
    ).hide();
});

$('#searchFilter').on('keyup', async function () {
        const searchValue = $(this).val().toLowerCase();
        const response = await fetch(`${API}/assignments`);
        const assignments = await response.json();

        const filteredAssignments = assignments.filter(data =>
            data.TRAINER_ID === loggedInUser.id &&
            !data.IS_DELETED &&
            data.ASSIGNMENT_NAME.toLowerCase().includes(searchValue)
        );

    renderAssignments(filteredAssignments);
}); 

$('#createAssignmentBtn').click(()=> addAssignment())
$('#editAssignmentBtn').click(()=> editAssignment(currentAssignmentId));
$('#eval_submit').click(()=> evaluateAssignment(currentAssignmentId) )

getAssignments()