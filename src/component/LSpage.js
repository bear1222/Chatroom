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
        backgroundColor: '#DBC8B6',
    }
});

class LSpage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            LS: 'login'
        }
    }

    //setLS = (str) => {
    //    this.setState({ LS: str }, () => {
    //      const animationName = str === 'login' ? 'slideInLeft' : 'slideInRight';
    //      const wrapElement = document.querySelector('.wrap');
    //      if (wrapElement) {
    //        wrapElement.classList.remove(styles.wrapActive); // Remove any previous class (optional)
    //        wrapElement.style.animation = `${animationName} 0.5s ease-in-out`;
    //      }
    //    });
    //};

    setLS = (str) => {
        this.setState({LS: str});
    }
//    setLS = (str) => {
//        this.setState({ LS: str }, () => {
//            const animationName = str === 'login' ? 'slideInLeft' : 'slideInRight';
//            const wrapElement = document.querySelector('.wrap'); // Access element using querySelector
//            if (wrapElement) { // Check if element exists before manipulation
//              wrapElement.classList.remove(styles.wrapActive); // Remove previous animation class
//              wrapElement.classList.add(styles.wrapActive); // Add animation class (defined in CSS)
//              wrapElement.style.animation = `${animationName} 0.5s ease-in-out`;
//            }
//          });
//
////        this.setState({ LS: str }, () => {
////            const animationName = str === 'login' ? 'slideInLeft' : 'slideInRight';
////            this.props.classes.wrap.classList.remove(styles.wrapActive); // Remove previous animation class
////            this.props.classes.wrap.classList.add(styles.wrapActive); // Add animation class (defined in CSS)
////            this.props.classes.wrap.style.animation = `${animationName} 0.5s ease-in-out`;
////          });
////        };
//    }
    render(){
        return (
            <Grid 
                container 
                direction='row' 
                style={{width: '100%', height: '100%'}} 
                alignItems="center" 
                justifyContent="center" 
                className={this.props.classes.wrap}
            >
                <Grid item>
                    {this.state.LS === 'login' ? 
                    <LoginPage
                        loginFunc={this.props.loginFunc}
                        setLS = {this.setLS}
                    />
                    : 
                    <SignUp
                        loginFunc={this.props.loginFunc}
                        setLS = {this.setLS}
                    />
                    }
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(LSpage);