import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    paper: {
       margin: '5vh 25vw',
       padding: '50px 25px',
       textAlign: 'center'
    },
    form:{
       display: 'flex',
       padding: '25px 0',
       flexDirection: 'column',
       alignItems: 'center'
    },
    centerText: {
      textAlign: 'center'
   },
   navbar: {
      flexDirection: 'row',
      alignItems: 'center'
   }
})

export default useStyles