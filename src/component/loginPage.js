import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField,
} from '@material-ui/core';
import Button from 'react-bootstrap/Button';

const styles = theme => ({

});

//function create_alert(type, message) {
//    if(type == 'success'){
//        return (<Alert severity="success">
//            {'Success! ' + message}
//        </Alert>);
//    }else if(type == 'error'){
//        return (<Alert severity="error">
//            {'Error! ' + message}
//        </Alert>);
//    }
//}

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            nickName: '', 
            email:    '', 
            password: '',
            alert_show: false, 
            alert_type: '', 
            alert_mes: ''
        };
    }

    logIn = () => {
        console.log('click login');
        const nickName = this.state.nickName;
        const email = this.state.email;
        const password = this.state.password;
        console.log(email, password);
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.uid);
            // create_alert('success', 'sign in');
            this.setState({
                alert_show: true, 
                alert_type: 'success', 
                alert_mes: 'Login successfully!'
            });
            this.props.loginFunc(user.uid);
        })
        .catch((error) => {
            const errorMes = error.message;
            // create_alert('error', errorMes);
            this.setState({
                alert_show: true, 
                alert_type: 'danger', 
                alert_mes: errorMes
            })
            this.setState({
                email:    '',
                password: ''
            })
        });
    }

    googleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            // create_alert('success', '');
            this.setState({
                alert_show: true, 
                alert_type: 'success', 
                alert_mes: 'Login successfully!'
            });
            console.log(user.displayName, user.uid);
            let userList = firebase.database().ref('userList/' + user.uid);
            userList.set({userName: user.displayName});
            this.props.loginFunc(user.uid);

        })
        .catch((error) => {
            const errorMes = error.message;
            // create_alert('error', errorMes);
            this.setState({
                alert_show: true, 
                alert_type: 'danger', 
                alert_mes: errorMes
            })
        });
    }
    
    render(){
        return (
            <div>
                <p>
                    Log In Page
                </p>
                <TextField
                    label = 'Email:'
                    type = 'text'
                    onChange={(event) => this.setState({email: event.target.value})}
                    value = {this.state.email}
                >
                </TextField>
                <br/>
                <TextField
                    label = 'Password:'
                    type = 'password'
                    onChange={(event) => this.setState({password: event.target.value})}
                    value = {this.state.password}
                >
                </TextField>
                <br/>
                <br/>
                <Button
                    onClick={() => this.logIn()}
                >
                    {'Login'}
                </Button>
                <br/>
                <Button
                    onClick={() => this.googleLogin()}
                >
                    {'login with Google'}
                </Button>


            </div>
        );
    }
}

export default withStyles(styles)(LoginPage);