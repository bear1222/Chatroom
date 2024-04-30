import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField,
    IconButton
} from '@material-ui/core'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';

const styles = theme => ({

});

class Othertext extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            modalShow: false,
            email: '',
        };
    }

    handleClose = () => {
        this.setState({modalShow: false});
    }
    handleShow = () => {
        this.setState({modalShow: true});
    }

    findEmail = (uid) => {
        const userList = firebase.database().ref('userList/' + uid + '/email');
        userList.once('value')
        .then(res => {
            const email = res.val();
            this.setState({email: email});
            console.log('uid to email:', uid, email);
        })
        .catch(err => console.error('error:', err));

    }

    componentDidUpdate(prevProps){
        if(prevProps.uid !== this.props.uid)
            this.findEmail(this.props.uid);
    }

    render(){
        console.log('render profile');
        console.log('uid:', this.props.uid);
        console.log('username:', this.props.username);
        // sender, text
        return (
            <>
                <IconButton 
                    onClick={() => {
                        this.handleShow();
                        this.findEmail(this.props.uid);
                    }}
                >
                    <AccountCircleIcon sx={{ fontSize: 40 }}/>
                </IconButton>

                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    {/* 
                        img
                        name
                        email
                    */}
                    <Modal.Body>
                        <AccountCircleIcon/>
                        <Typography
                        >
                            {this.props.username}
                        </Typography>
                        <Typography
                        >
                            {this.state.email}
                        </Typography>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default withStyles(styles)(Othertext);