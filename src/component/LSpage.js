import LoginPage from './loginPage';
import SignUp from './signUp';
import Button from 'react-bootstrap/Button';
import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField,
} from '@material-ui/core'

const styles = theme => ({
    wrap: {
        backgroundColor: '#DBC8B6',
        width: '400px', 
        height: '600px',
        overflow: 'hidden'
//        transition: 'transform 0.5s ease-in-out',
//        transform: 'translateX(0)', // Initial position
    },
    containers:{
        width: '200%',
        height: '100%'
    }

});


class LSpage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            LS: 'login'
        }
    }

    setLS = (str) => {
        this.setState({LS: str});
    }

    render(){
        const {classes} = this.props;
        const LS = this.state.LS;
        console.log('LS: ', LS);
        return (
            <Grid 
                container 
                direction='row' 
                style={{width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#DBC8B6'}} 
                alignItems="center" 
                justifyContent="center" 
                // className={`${this.props.classes.wrap} ${classes.wrapSlideLeft}`}
                // className={`${classes.wrap} ${this.state.LS === 'login' ? '' : classes.wrapSlideLeft}`}
            >

                {
                    LS === 'login'?
                        <LoginPage
                            LS = {this.props.LS}
                            loginFunc={this.props.loginFunc}
                            setLS = {this.setLS}
                        />
                    :
                        <SignUp
                            LS = {this.props.LS}
                            loginFunc={this.props.loginFunc}
                            setLS = {this.setLS}
                        />

                }

{/*
                <Grid item
                    className={`${classes.wrap} ${LS === 'login' ? classes.goback : classes.wrapSlideLeft} `}
                >
                </Grid>
        */}
            </Grid>
        )
    }
}

export default withStyles(styles)(LSpage);