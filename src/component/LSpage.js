import { useState } from 'react';
import LoginPage from './loginPage';
import SignUp from './signUp';
import Button from 'react-bootstrap/Button';


function LSpage(props) {
    const [LS, setLS] = useState('login');
    if(LS === 'login'){
        return (
            <div>
                <Button onClick={() => setLS('signup')}>
                    signup
                </Button>
                <LoginPage
                    loginFunc={props.loginFunc}
                />
            </div>
        )
    }else{
        return (
            <div>
                <Button onClick={() => setLS('login')}>
                    login
                </Button>
                <SignUp
                    loginFunc={props.loginFunc}
                />
            </div>
        )
    }
}

export default LSpage;