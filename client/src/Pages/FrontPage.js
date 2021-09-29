import { useHistory } from 'react-router-dom';
import React, {useState} from 'react';
import { Button, Grid, Paper, Typography, TextField} from '@material-ui/core'
import useStyles from './styles/styles';

const FrontPage = () => {
    const history = useHistory();
    const classes = useStyles();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


    const signIn = (e) => {
        e.preventDefault();

        setLoading(true);

        fetch(`http://localhost:8000/users/auth?user=${userName}&password=${password}`)
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            setError(data.message);
            // console.log(data);
           
            let auth = {
                "loggedIn": true,
                "userId" : data.user._id,
                "name": data.user.name,
                "userType": data.user.usertype
            }

           localStorage.setItem('local_auth', JSON.stringify(auth));

            if(data.user.usertype === 'Student'){
                history.push(`/student/${data.user._id}`)
            }else{
                history.push('/instructor')
            }


        })
        .catch(err => {
            setLoading(false)
            console.log(err + ' the url containing this user data does not exist')
        })

    }


    const handleFetch = (e) => {
                alert('Created all users from the database')
                fetch('http://localhost:8000/users/create')
                .catch(err => console.log(err))
            }  


    return(
        <>
          <Paper  elevation={3} className={classes.paper}>
            <Typography variant='h4' className={classes.centerText} gutterBottom>Sign In</Typography>
             {error !== null && <p className={classes.error}>{error}</p>}
                <form onSubmit={(e) => signIn(e)} className={classes.form}>
                    <TextField
                        label='Username'
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    >
                    </TextField>
                    <TextField 
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >    
                    </TextField>
                    {!loading ? 
                    <Button 
                        type='submit' 
                        variant='contained' 
                        color='primary' 
                        className={classes.signInButton}
                        >
                        Submit
                    </Button> 
                    : 
                    <p>Loading... Please refresh your browser if you seen this message for more than 10 seconds</p>
                    }
                </form>
            </Paper>
            <Paper  elevation={3} className={classes.paper}>
                <Grid container spacing={3} className={classes.root}>
                <Typography variant="body1" gutterBottom>Click here first to preload each page with user data</Typography>
                    <form onSubmit={handleFetch} >
                        <Button type="submit" variant="contained">
                            Create Users
                        </Button>
                    </form>
                </Grid>
            </Paper>
        </>
    )
}


export default FrontPage
