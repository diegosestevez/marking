import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import questionPayload from '../Utils/questionPayload';
import Assignment1 from '../Components/Assignment1';
import Assignment2 from '../Components/Assignment2';
import Assignment3 from '../Components/Assignment3';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import useStyles from './styles/styles';


const StudentPage = () => {

    const classes = useStyles();
    const history = useHistory()

    const [questions, setQuestions] = useState([]);
    const [multipleChoice, setMultipleChoice] = useState(null);
    const [multiSelect, setMultSelect] = useState([]);
    const [fillInBlank, setFillInBlank] = useState('');

    const token = localStorage.getItem('local_auth')
    const tokenString = JSON.parse(token);
    
    useEffect(()=>{
        //patches react error when accessing /student route without token
        if(tokenString === null){
            return history.push('/');
        }
    
        validateSession(token, tokenString);
        fetchStudentData(tokenString.userId)
    },[])

   
    //Validates localstorage session//
    const validateSession = (token, tokenString) => {
        if(token === null || tokenString.userType === 'Instructor' ){
            history.push('/');
        }
    }

    //Fetches assignment data specific to student that logged in//
    const fetchStudentData = (user) => {
        fetch(`http://localhost:8000/assign?user=${user}`)
        .then(res => res.json())
        .then(data => {
            setQuestions(data.message);
        })
        .catch(err => console.log('Error: ' + err))
    }
    

    // defines question type payload values when each question is pushed into the database //
    const radioButtonValue = (e) => {
        setMultipleChoice(e.target.value);
    };

    const checkBoxValue = (e) => {
        if(e.target.checked){
            setMultSelect([...multiSelect,e.target.value])
        }else{
            let removeItem = multiSelect.filter(item => item !== e.target.value)
            setMultSelect(removeItem)
        }     
    };

    const fillInValue = (e) => {
        setFillInBlank(e.target.value);
    }

    
    // Assignment handler functions //
    const handleMultipleChoice = (e) => {
        const studentId = tokenString.userId;
        questionPayload(e, studentId, multipleChoice, 'MC');
    }

    const handleMultiSelect = (e) => {
        const studentId = tokenString.userId;
        questionPayload(e, studentId, multiSelect, 'MS');
    }


    const handleFillIn = (e) => {
        const studentId = tokenString.userId;
        questionPayload(e, studentId, fillInBlank, 'FIB');
    }


    //destroys student session from localstorage//
    const logout = () => {
        localStorage.clear()
        history.push("/");
    }


    
    return (
        <>
         
        {questions && questions.map(question =>{
             
            return(
                <>  
                    {!question.submitted?
                    <>
                        {question.type === 'MC'?(
                            <Assignment1 
                                handleMultipleChoice={handleMultipleChoice}
                                multipleChoice={multipleChoice}
                                radioButtonValue={radioButtonValue}
                                question={question}
                            />
                        
                            )
                            :question.type === 'MS'?(
                            <Assignment2
                                question={question}
                                handleMultiSelect={handleMultiSelect}
                                checkBoxValue={checkBoxValue}
                            />
                            )
                            :(
                            
                            <Assignment3
                                question={question}
                                handleFillIn={handleFillIn}
                                fillInValue={fillInValue}
                            />
                            )
                        } 
                    </>
                    :question.status === 'Finished'?
                    (
                    <>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant='h6' className={classes.centerText} gutterBottom>{question.name}</Typography>
                            <Typography variant='subtitle1' className={classes.centerText} gutterBottom>{question.title}</Typography>
                            <Typography variant="subtitle2" className={classes.centerText}>Your Score: {question.score}</Typography>
                        </Paper>   
                    </>
                    )
                    :
                    (
                        <>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant='h6' className={classes.centerText} gutterBottom>{question.name}</Typography>
                                <Typography variant='body1' className={classes.centerText}>Question is submitted. Awaiting Instructor feedback</Typography>
                            </Paper>
                        </>
                    )
                    }
                </>
            )
        })}
         <Grid container justifyContent="center">
             <Button color='default' variant='contained' onClick={logout}>Logout</Button>
         </Grid>
        </>
    )

}

export default StudentPage
