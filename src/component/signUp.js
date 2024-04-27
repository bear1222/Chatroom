import Button from 'react-bootstrap/Button';
import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField,
} from '@material-ui/core';
import Alert from 'react-bootstrap/Alert';

const styles = theme => {

};

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nickName: '', 
            email: '', 
            password: '', 
            pwdcon: '',
            alert_show: false, 
            alert_type: '', 
            alert_mes: ''
        };
    }

    handleAlertShow = (k) => this.setState({alert_show: k});

    signUp = () => {
        const nickName = this.state.nickName;
        const email = this.state.email;
        const password = this.state.password;
        const pwdcon = this.state.pwdcon;
        console.log(nickName, email, password, pwdcon);
        if(nickName === ''){
            this.setState({
                alert_show: true, 
                alert_type: 'danger', 
                alert_mes: 'Nick Name cannot be empty!'
            })
        }
        if(password !== pwdcon){
            this.setState({
                alert_show: true, 
                alert_type: 'danger', 
                alert_mes: 'Password confirm incorrect'
            })
            // alert error
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            this.setState({
                alert_show: true, 
                alert_type: 'success', 
                alert_mes: 'Login successfully!'
            });

            /*TODO:
                add {user.uid, nickName} to database
            */
            let userList = firebase.database().ref('userList/' + user.uid);
            userList.set({userName: nickName});

            this.props.loginFunc(user.uid);

        })
        .catch((error) => {
            const errMes = error.message;
            console.error(errMes);
            this.setState({
                alert_show: true, 
                alert_type: 'danger', 
                alert_mes: errMes
            })
            this.setState({
                nickName: '', 
                email: '', 
                password: '', 
                pwdcon: ''
            });
        })
    }

    render(){
        return (
            <>
                <p>
                    Sign Up page
                </p>
                <TextField
                    label = 'Nick Name:'
                    type = 'text'
                    onChange={(e) => this.setState({nickName: e.target.value})}
                    value = {this.state.nickName}
                >
                </TextField>
                <br/>
                <TextField
                    label = 'Email:'
                    type = 'text'
                    onChange={(e) => this.setState({email: e.target.value})}
                    value = {this.state.email}
                >
                </TextField>
                <br/>
                <TextField
                    label = 'Password:'
                    type = 'password'
                    onChange={(e) => this.setState({password: e.target.value})}
                    value = {this.state.password}
                >
                </TextField>
                <br/>
                <TextField
                    label = 'Password Confirm:'
                    type = 'password'
                    onChange={(e) => this.setState({pwdcon: e.target.value})}
                    value = {this.state.pwdcon}
                >
                </TextField>
                <br/>
                <Button variant="primary" onClick={this.signUp}>
                    Sign Up
                </Button>
                <Alert
                    variant={this.state.alert_type}
                    onClose={() => this.handleAlertShow(false)}
                >
                    {this.state.alert_mes}
                </Alert>
            </>
        );

    };
}

export default withStyles(styles)(Signup);