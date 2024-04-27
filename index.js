import {
    Grid,
    Divider,
} from '@material-ui/core'

import LSpage from './src/component/LSpage';
import MainPage from './src/component/mainPage'

export class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '' 
        };
    }

    logInOut = (k) => {
        console.log('login/out');
        const userList = firebase.database().ref('userList/' + k + '/userName');
        this.setState({userName: ''});
        if(k !== ''){
            userList.once('value', (snapshot) => {
                console.log(snapshot.val());
                this.setState({userName: snapshot.val()});
            })
        }
    }

    render() {
        console.log(this.state.userName);
        if(this.state.userName !== '')
            return <MainPage 
                userName = {this.state.userName}
                logoutFunc = {this.logInOut}
            />;
        else 
            return <LSpage 
                loginFunc = {this.logInOut}
            />;
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));