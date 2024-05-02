
import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField,
} from '@material-ui/core'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

const styles = theme => ({

});

class AddMembtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalShow: false, 
            newEmail: ''
        }
    }

    handleClose = () => {
        this.setState({modalShow: false});
    }
    handleShow = () => {
        this.setState({modalShow: true});
    }

    addMem = () => {
        console.log('add with email:', this.state.newEmail);
        const email = this.state.newEmail;
        const email2 = email.replaceAll('.', ',')
        const CRid = this.props.CRid;

        // find uid
        let emailuidList = firebase.database().ref('emailuidList/' + email2);
        let alreadyIn = 0;
        emailuidList.once('value')
        .then(snapshot => {
            console.log('uid:', snapshot.val().uid);
            return snapshot.val().uid;
        })
        .then(uid => {
            console.log('CRid:', CRid, 'uid:', uid);
            let chatroomList = firebase.database().ref('chatroomList/' + CRid);
            chatroomList.once('value', snapshot => {
                const users = snapshot.val().users;
                // if uid not in :
                if(users.includes(uid)){
                    console.log('The user is already in this chatroom');
                    alreadyIn = 1;
                }else{
                    users.push(uid);
                    chatroomList.update({users: users});
                }
            })
            return uid;
        })
        .then(uid => {
            let userchatroomList = firebase.database().ref('userchatroomList/' + uid);
            userchatroomList.once('value', (snapshot) => {
                const chatrooms = snapshot.val().chatrooms;

                if(!alreadyIn){
                    chatrooms.push(CRid);
                    userchatroomList.update({chatrooms: chatrooms});
                    this.props.sendMes('addMem', uid, 'is added to this chatroom');
                }
            });
        })
        .catch(err => console.error(err));


        // add uid to this room

        this.setState({modalShow: false});
    }


    render(){
        return (
            <div>
                {
                    this.props.size == 'wide' ? 
                    <Button endIcon={<AddIcon/>} color="success" variant="contained" 
                        onClick={this.handleShow}
                    >
                        Add Member
                    </Button> : 
                    <IconButton 
                        color='success'
                        onClick={this.handleShow}
                    >
                        <AddCircleOutlinedIcon sx={{ fontSize: 40 }}/>
                    </IconButton>
                }

                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Member</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextField
                            onChange={(e) => {this.setState({newEmail: e.target.value})}}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            this.addMem();
                            this.handleClose();
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(AddMembtn);