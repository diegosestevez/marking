import React,{useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import Marking from '../Components/Marking';
import Submit from '../Components/Submit';
import { Typography, Grid, Button} from '@material-ui/core';
import useStyles from './styles/styles';

const InstructorPage = () => {

    const classes = useStyles();
    const history = useHistory();

    const [assignments, setAssignments] = useState([])
    const [mark, setMark] = useState(0)
    
    useEffect(()=>{
        validateSession();
        fetchData();
    },[])

    //Local Storage Validation //
    const validateSession = () =>{
        const token = localStorage.getItem('local_auth')
        const tokenString = JSON.parse(token) 
        // const userType = tokenString.userType;

        if(token === null || tokenString.userType === 'Student'){
            history.push('/');
        }
    }

    // Fetch Assignment Data from MongoDB //
    const fetchData = () => {
        fetch(`http://localhost:8000/assign`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.assignmentData);
            setAssignments(data.assignmentData);
        })
        .catch(err => console.log('Error: ' + err))
    }


    // Handles Marking Component //
    const handleMarks = (e) => {
        alert('mark submitted')
        e.preventDefault();

        const payload = {
            score: mark,
            status: 'Finished',
            id: e.target.id
        }

        const requestOptions =({
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(payload)
        })
    

        fetch('http://localhost:8000/assign/mark', requestOptions)
        .catch(err => console.log(err)) 

        //Understandably reloading in React is bad practice, will replace  
        window.location.reload();
    }

    // Updates Marking Component //
    const updateMarks = (e) => {
        setMark(e.target.value)
    }

    // Logs user out and destroys localstorage session
    const logout = () => {
        localStorage.clear()
        history.push("/");
    }

    

    return (
       <>
       <Typography variant="h2" className={classes.centerText}>Welcome Instructor</Typography>
       {assignments && assignments.map(assignment =>{           
           return(
               <>
                    {assignment.submitted && assignment.status === 'Started'?(
                    <Marking
                        assignment={assignment}
                        handleMarks={handleMarks}
                        updateMarks={updateMarks}
                    />
                    )
                    :!assignment.submitted?(
                    <Submit 
                        assignment={assignment} 
                        message='student has not submitted this assignment'
                    />
                    )
                    :(
                    <Submit 
                        assignment={assignment} 
                        message={`Score Recieved: ${assignment.score}`}
                    />
                    )
                    }
               </>
               )
       }
       )}
        <Grid container justifyContent="center">
             <Button color='default' variant='contained' onClick={logout}>Logout</Button>
         </Grid>
       </>
    )
}

export default InstructorPage
