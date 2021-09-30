const questionPayload = (e, studentId, answer, type) =>{
    alert('Assignment has been submitted!');
    e.preventDefault();

    const payload = {
        answer:answer,
        submitted: true,
        user_id: studentId,
        type:type
    }

    const requestOptions =({
        method:'PATCH',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(payload)
    })

    fetch('http://localhost:8000/assign/submit', requestOptions)
        .catch(err => console.log(err))

    window.location.reload();    
} 

export default questionPayload;