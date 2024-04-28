
import {
    withStyles,
    Typography,
    Divider,
    Grid,
    TextField
} from '@material-ui/core'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Chat Room
                </Button>

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
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            this.addChatRoom();
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

export default withStyles(styles)(AddCRbtn);