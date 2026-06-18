const API = 'http://localhost:3000'
$('.classArea').hide()

async function addAssignment(){
    try{
        const ASSIGNMENT_ID = $('#assignmentID').val().trim()
        const ASSIGNMENT_NAME = $('#assignmentName').val().trim()
        const ASSIGNMENT_TYPE = $('#assignmentType').val().trim()
        const ASSIGNMENT_DESC = $('#assignmentDesc').val().trim()
        const DUE_DATE = $('#dueDate').val().trim()
        const TO_COURSE = $('#assignToCourse').val().trim()
        const TO_YEAR = $('#assignToYear').val().trim()
    }
    catch{
        console.error()
    }
}

$('#createClsBtn').click(()=> addAssignment())

