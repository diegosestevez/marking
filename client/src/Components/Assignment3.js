import { TextField,  FormLabel, Button, Paper, Typography} from '@material-ui/core';
import useStyles from './styles/styles'

const Assignment3 = ({question, handleFillIn, fillInValue}) => {
    const classes = useStyles()

    return (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant='h4' gutterBottom>Assignment #3</Typography>
            <Typography variant='h6' gutterBottom>{question.name}</Typography>
            <form onSubmit={handleFillIn} >
                <FormLabel> {question.title}</FormLabel>
                    <TextField 
                        variant="outlined"
                        name='assignment3'
                        required
                        inputProps={{pattern:'([a-zA-Z]+\\s)[0-9]+'}}
                        onChange={fillInValue} 
                        helperText="Must contain letters + exactly 1 white space + numbers. (Example: 'three 1993')"
                        className={classes.form}
                        fullWidth 
                    />
                    <Button id="assign3" type="submit" variant="contained" color="secondary" value="submit">submit</Button>
            </form>
        </Paper>
    )
}

export default Assignment3