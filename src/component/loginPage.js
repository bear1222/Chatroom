import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import { BorderAll, Height } from '@material-ui/icons';

const styles = theme => ({
    wrap:{
        width: '400px', 
        height: '600px',
        border: '2px dotted gray',
        paddingTop: '30px',
        paddingBottom: '20px',
        backgroundColor: '#F2E9E4'
    },
    item:{
        width: '100%',
        textAlign: 'center'
    },
    button:{
        width: '100%'
    }
});

class LoginPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email:    '', 
            password: '',
            alert_show: false, 
            alert_type: '', 
            alert_mes: ''
        };
    }

    logIn = () => {
        console.log('click login');
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
            const email2 = email.replaceAll('.', ',')
            let emailuidList = firebase.database().ref('emailuidList/' + email2);
            emailuidList.set({uid: user.uid})

            this.props.loginFunc(user.uid, '', email);
        })
        .then(() => {
            console.log('add email uid success')
        })
        .catch((error) => {
            const errorMes = error.message;
            // create_alert('error', errorMes);
            let notification = new Notification('Error!', {body: errorMes});
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
            const email = user.email;
            console.log('google email:', email);
            const email2 = email.replaceAll('.', ',')
            console.log(email2);
            let emailuidList = firebase.database().ref('emailuidList/' + email2);
            emailuidList.set({uid: user.uid})
            this.props.loginFunc(user.uid, user.displayName, email);

        })
        .catch((error) => {
            const errorMes = error.message;
            let notification = new Notification('Error!', {body: errorMes});
            // create_alert('error', errorMes);
            this.setState({
                alert_show: true, 
                alert_type: 'danger', 
                alert_mes: errorMes
            })
        });
    }
    
    render(){
        const {classes}= this.props;
        return (
            <Grid container direction='column' alignItems="center" justifyContent="center" spacing={2} className={classes.wrap}>
                <Grid item className={this.props.classes.item}>
                    <Typography variant='h4'>
                        Log In Page
                    </Typography>
                </Grid>
                <Grid item className={this.props.classes.item}>
                    <TextField
                        label = 'Email:'
                        type = 'text'
                        onChange={(event) => this.setState({email: event.target.value})}
                        value = {this.state.email}
                    >
                    </TextField>
                </Grid>
                <Grid item className={this.props.classes.item}>
                    <TextField
                        label = 'Password:'
                        type = 'password'
                        onChange={(event) => this.setState({password: event.target.value})}
                        value = {this.state.password}
                    >
                    </TextField>
                </Grid>
                <Grid item className={this.props.classes.item}>
                    <Button className={classes.button}
                        onClick={() => this.logIn()}
                    >
                        {'Login'}
                    </Button>
                </Grid>
                <Grid item className={this.props.classes.item}>
                    <Button className={classes.button}
                        onClick={() => this.googleLogin()}
                    >
                        {'login with Google'}
                    </Button>
                </Grid>
                <Grid item className={this.props.classes.item}>
                    <Button className={classes.button}
                        onClick={() => this.props.setLS('signup')}
                    >
                        signup
                    </Button>
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(LoginPage);