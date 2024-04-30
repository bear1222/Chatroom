import { useState } from 'react';
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
    wrap:{
        backgroundColor: '#DABEA7'
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
        if(this.state.LS === 'login'){
            return (
                <Grid container direction='row' style={{width: '100%', height: '100%'}} alignItems="center" justifyContent="center" className={this.props.classes.wrap}>
                    <Grid item>
                        <LoginPage
                            loginFunc={this.props.loginFunc}
                            setLS = {this.setLS}
                        />
                    </Grid>
                </Grid>
            )
        }else{
            return (
                <Grid container direction='row' style={{width: '100%', height: '100%'}} alignItems="center" justifyContent="center" className={this.props.classes.wrap}>
                    <Grid item>
                        <SignUp
                            loginFunc={this.props.loginFunc}
                            setLS = {this.setLS}
                        />
                    </Grid>
                </Grid>
            )
        }

    }
}

export default withStyles(styles)(LSpage);