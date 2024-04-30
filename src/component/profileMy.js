import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'

const styles = theme => ({

});

class Othertext extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            modalShow: false
        };
    }

    handleClose = () => {
        this.setState({modalShow: false});
    }
    handleShow = () => {
        this.setState({modalShow: true});
    }

    render(){
        console.log('render Chattext');
        // sender, text
        return (
            <div>
                <IconButton onClick={this.handleShow}>
                    {/* personal img */}
                </IconButton>

                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    {/* 
                        img
                        name
                        email
                    */}
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

export default withStyles(styles)(Othertext);