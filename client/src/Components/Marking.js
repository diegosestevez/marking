import { Typography, FormLabel, TextField, Button, Paper } from '@material-ui/core';
import useStyles from './styles/styles';


const Marking = ({handleMarks, assignment, updateMarks}) => {
    const classes = useStyles();    

    return (
        <Paper elevation={3} className={classes.paper}>
            <form onSubmit={handleMarks} id={assignment._id}>
                <Typography variant="h5" gutterBottom>{assignment.name}</Typography>
                <FormLabel>{assignment.title}</FormLabel>
                {assignment.type === 'MS'
                    ? <Typography variant="body1" gutterBottom>Student Answer:  {assignment.answer.toString().replaceAll(",", ", ")}</Typography>
                    : <Typography variant="body1" gutterBottom>Student Answer: {assignment.answer}</Typography>
                }
                <TextField
                    required
                    type="number"
                    inputProps={{max:10, min:0}}
                    helperText="Must be numerical value between 10 and 0 only"
                    variant="outlined"
                    size="small"
                    className={classes.form}
                    onChange={updateMarks}
                />
                <Button className="marking" type="submit" variant="contained" color="secondary" value="submit">Grade Assignment</Button>
        </form>
    </Paper>
    )
}

export default Marking