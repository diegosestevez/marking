import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
       margin: '5vh 25vw',
       padding: '50px'
    },
    centerText: {
        textAlign: 'center'
    },
    form:{
        display: 'flex',
        padding: '25px 0',
        flexDirection: 'column',
        alignItems: 'center'
     },
    signInButton:{
        marginTop: '1.75rem'
    },
    error:{
        backgroundColor: '#8b0000',
        color: 'white',
        textAlign: 'center',
        margin: 'auto',
        width: '50%',
        padding: '2px'
    } 
})

export default useStyles