import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import styles from './borderAni.css';


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
        // .then((userCredential) => {
            // firebase.auth().signInWithEmailAndPassword(email, password)
        // })
        .then(userCredential => {
            const user = userCredential.user;
            this.setState({
                alert_show: true, 
                alert_type: 'success', 
                alert_mes: 'Login successfully!'
            });
            const email2 = email.replaceAll('.', ',')
            let emailuidList = firebase.database().ref('emailuidList/' + email2);
            emailuidList.set({uid: user.uid})

            this.props.loginFunc(user.uid, nickName, email);

        })
        .catch((error) => {
            const errMes = error.message;
            let notification = new Notification('Error!', {body: errMes});
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

            <Grid container direction='column' alignItems="center" justifyContent="center" spacing={2} className='wrap'>
                <Grid item className='item'>
                    <Typography variant='h4'>
                        Sign Up page
                    </Typography>
                </Grid>
                <Grid item className='item'>
                    <TextField
                        label = 'Nick Name:'
                        type = 'text'
                        onChange={(e) => this.setState({nickName: e.target.value})}
                        value = {this.state.nickName}
                    >
                    </TextField>
                </Grid>
                <Grid item className='item'>
                    <TextField
                        label = 'Email:'
                        type = 'text'
                        onChange={(e) => this.setState({email: e.target.value})}
                        value = {this.state.email}
                    >
                    </TextField>
                </Grid>
                <Grid item className='item'>
                    <TextField
                        label = 'Password:'
                        type = 'password'
                        onChange={(e) => this.setState({password: e.target.value})}
                        value = {this.state.password}
                    >
                    </TextField>
                </Grid>
                <Grid item className='item'>
                    <TextField
                        label = 'Password Confirm:'
                        type = 'password'
                        onChange={(e) => this.setState({pwdcon: e.target.value})}
                        value = {this.state.pwdcon}
                    >
                    </TextField>
                </Grid>
                <Grid item className='item'>
                    <Button onClick={this.signUp}>
                        Sign Up
                    </Button>
                </Grid>
                <Grid item className='item'>
                    <Button onClick={() => this.props.setLS('login')}>
                        login
                    </Button>
                </Grid>
            </Grid>
        );

    };
}

// export default withStyles(styles)(Signup);
export default Signup;