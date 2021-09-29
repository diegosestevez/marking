import {AppBar, Typography} from '@material-ui/core';
// import BeenhereIcon from '@material-ui/icons/Beenhere';
import useStyles from './styles/styles';

const Navbar = () => {
  const classes = useStyles();

    return (
     <AppBar position="static" className={classes.navbar}>
       {/* <BeenhereIcon style={{fontSize:'50'}}/> */}
        <Typography variant="h3">
           Marking App
        </Typography>
      </AppBar>
    )
}

export default Navbar