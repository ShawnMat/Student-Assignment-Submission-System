document.addEventListener('DOMContentLoaded',()=>{
    const submitBtn=document.querySelector('.submit')
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')





    submitBtn.addEventListener('click',()=>{
        window.location.href = "/pages/studentDashboard.html"
    })
})