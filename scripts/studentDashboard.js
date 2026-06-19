const API = 'http://localhost:3000'

// const isLoggedIn = localStorage.getItem('isLoggedIn')


const loggedInStudent = JSON.parse(localStorage.getItem('Student'))
const validUser = JSON.parse(localStorage.getItem('isLoggedIn'))
console.log(loggedInStudent)
$('#userName').text(loggedInStudent.NAME)

if(validUser !== true){
    window.location.replace('/pages/trainerLogin.html')
}

// $('#logoutBtn').click(function () {

//     localStorage.removeItem('loginUser');
//     localStorage.removeItem('isLoggedIn');

//     window.location.replace('/pages/trainerLogin.html');

// });


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


async function getAssignments(){

    const response = await fetch(`${API}/assignments`)
    const assignments = await response.json()
    const studentAssignments = assignments.filter(data=>
        data.TO_COURSE === loggedInStudent.COURSE_NAME &&
        data.TO_YEAR == loggedInStudent.YEAR &&
        data.IS_DELETED == false
    )

    renderAssignments(studentAssignments)
    counters(studentAssignments)
}

function renderAssignments(assignments){

    $('.assignmentContainer').html('')

    assignments.forEach(assignment=>{

        $('.assignmentContainer').append(`
<div class="card assignmentCard col-3 shadow border-0 m-3">

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
                assignment.STATUS === 'Evaluated' ? 'bg-success'
                : assignment.STATUS === 'Completed' ? 'bg-primary'
                : assignment.STATUS === 'Over Due' ? 'bg-danger'
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
                    <small class="text-muted">Type</small>
                    <div>${assignment.ASSIGNMENT_TYPE}</div>
                </div>
            </div>

        </div>

    </div>

    <div class="card-footer bg-white border-0 text-end d-flex justify-content-between">
        
        <div class="submission align-content-center">
            ${assignment.STATUS === 'Pending' || assignment.STATUS === 'Over Due' ? `<button class="btn bg-success  text-white"  onclick='submitAssignment(${JSON.stringify(assignment)})'>Submit</button>`:''}
            
        </div>
        <div class="GradeMarks">
            <div class="fw-bold fs-5">
                ${assignment.MARKS ?? '-'}/100
            </div>
            <p class="text-muted">
                Grade ${assignment.GRADE ?? '-'}
            </p>
        </div>

    </div>

</div>
`)
    })
}

function counters(assignments){

    const completed =
    assignments.filter(data=>data.STATUS === 'Completed').length

    const pending =
    assignments.filter(data=>data.STATUS === 'Pending').length

    const evaluated =
    assignments.filter(data=>data.STATUS === 'Evaluated').length

    const overdue =
    assignments.filter(data=>data.STATUS === 'Over Due').length

    $('#completedCount').html(`
<p>Completed</p>
<h4>${completed}</h4>
`)

    $('#pendingCount').html(`
<p>Pending</p>
<h4>${pending}</h4>
`)

    $('#evaluatedCount').html(`
<p>Evaluated</p>
<h4>${evaluated}</h4>
`)

    $('#overdueCount').html(`
<p>Overdue</p>
<h4>${overdue}</h4>
`)
}

async function filterAssignments(type, value1, value2 = null) {

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    let filteredAssignments = assignments.filter(data =>
        data.TO_COURSE === loggedInUser.COURSE &&
        data.TO_YEAR == loggedInUser.YEAR &&
        !data.IS_DELETED
    );

    if(type === 'status'){
        filteredAssignments = filteredAssignments.filter(data =>
            data.STATUS === value1
        );
    }

    if(type === 'date'){
        filteredAssignments = filteredAssignments.filter(data => {

            const dueDate = new Date(data.DUE_DATE);

            return (
                dueDate >= new Date(value1) &&
                dueDate <= new Date(value2)
            );

        });
    }

    renderAssignments(filteredAssignments);

}

async function submitAssignment(assignment){

    const student = JSON.parse(  localStorage.getItem('Student'));
    const id = assignment.id
    const submission = {
        ASSIGNMENT_ID: assignment.id,
        ASSIGNMENT_NAME: assignment.ASSIGNMENT_NAME,
        STUDENT_ID: student.id,
        STUDENT_NAME: student.NAME,
        COURSE: student.COURSE,
        YEAR: student.YEAR,
        STATUS: 'Completed',
        SUBMITTED_DATE: new Date().toISOString().split('T')[0],
        TRAINER_ID: assignment.TRAINER_ID
    };

    await fetch(`${API}/assignments/${id}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(submission)
    });
    // renderAssignments(assignments)

}
async function filterByStatus(){

    const selectedStatus = $('#status').val();

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    const filteredAssignments = assignments.filter(data =>

        data.TO_COURSE === loggedInUser.COURSE &&
        data.TO_YEAR == loggedInUser.YEAR &&
        !data.IS_DELETED &&
        data.STATUS === selectedStatus

    );

    renderAssignments(filteredAssignments);

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById('filterStatus')
    ).hide();

}

async function filterByDate(){

    const startDate = $('#startdate').val();
    const endDate = $('#enddate').val();

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    const filteredAssignments = assignments.filter(data => {

        if(
            data.TO_COURSE !== loggedInUser.COURSE ||
            data.TO_YEAR != loggedInUser.YEAR ||
            data.IS_DELETED
        ){
            return false;
        }

        const dueDate = new Date(data.DUE_DATE);

        return (
            dueDate >= new Date(startDate) &&
            dueDate <= new Date(endDate)
        );

    });

    renderAssignments(filteredAssignments);

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById('filterDate')
    ).hide();

}

$('#filterStatusSubmitBtn').click(async function () {

    const selectedStatus = $('#status').val();

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    const filteredAssignments = assignments.filter(data =>

        data.TO_COURSE === loggedInUser.COURSE &&
        data.TO_YEAR == loggedInUser.YEAR &&
        !data.IS_DELETED &&
        data.STATUS === selectedStatus

    );

    renderAssignments(filteredAssignments);

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById('filterStatus')
    ).hide();

});
$('#filterDateSubmitBtn').click(async function () {

    const startDate = $('#startdate').val();
    const endDate = $('#enddate').val();

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    const filteredAssignments = assignments.filter(data => {

        if (
            data.TO_COURSE !== loggedInUser.COURSE ||
            data.TO_YEAR != loggedInUser.YEAR ||
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

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById('filterDate')
    ).hide();

});
$('#searchFilter').on('keyup', async function () {

    const searchValue = $(this).val().toLowerCase();

    const response = await fetch(`${API}/assignments`);
    const assignments = await response.json();

    const filteredAssignments = assignments.filter(data =>

        data.TO_COURSE === loggedInUser.COURSE &&
        data.TO_YEAR == loggedInUser.YEAR &&
        !data.IS_DELETED &&
        data.ASSIGNMENT_NAME.toLowerCase().includes(searchValue)

    );

    renderAssignments(filteredAssignments);

});

$('#filter').on('change', function () {

    const FILTER = $(this).val();

    if(FILTER === 'Status'){
        new bootstrap.Modal(
            document.getElementById('filterStatus')
        ).show();
    }

    else if(FILTER === 'Date'){
        new bootstrap.Modal(
            document.getElementById('filterDate')
        ).show();
    }

    else if(FILTER === 'All'){
        getAssignments();
    }

});
$('#filterDateSubmitBtn').click(filterByDate);
$('#filterStatusSubmitBtn').click(filterByStatus);

getAssignments()

