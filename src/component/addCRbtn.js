import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField,
} from '@material-ui/core'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

const styles = theme => ({

});

class AddCRbtn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalShow: false, 
            chatRoomName: ''
        }
    }

    handleClose = () => {
        this.setState({modalShow: false});
    }
    handleShow = () => {
        this.setState({modalShow: true});
    }

    addChatRoom = () => {
        const newName = this.state.chatRoomName;
        this.props.addChatRoom(this.props.uid, newName);
        this.setState({chatRoomName: ''});
    }

    render(){
        return (
            <>
                <IconButton
                    color="success"
                    onClick={this.handleShow}
                >
                    <AddCircleOutlinedIcon sx={{ fontSize: 40 }}/>
                </IconButton>

                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Chat Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextField
                            onChange={(e) => {this.setState({chatRoomName: e.target.value})}}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button  onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button onClick={() => {
                            this.addChatRoom();
                            this.handleClose();
                        }}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default withStyles(styles)(AddCRbtn);