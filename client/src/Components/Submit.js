import { Typography, Paper } from '@material-ui/core';
import useStyles from './styles/styles'

const Submit = ({assignment, message}) => {
    const classes = useStyles()
    return (
        <Paper elevation={3} className={classes.paper}>
            <Typography variant="h5" className={classes.centerText} gutterBottom>{assignment.name}</Typography>
            <Typography variant="body2" className={classes.centerText} gutterBottom>Question: {assignment.title}</Typography>
            <Typography variant="body1" className={classes.centerText}>{message}</Typography>
        </Paper>
    )
}

export default Submit