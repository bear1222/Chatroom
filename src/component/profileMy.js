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

class ProfileMy extends React.Component{
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

    render(){
        // sender, text
        return (
            <>
                <IconButton 
                    onClick={() => {
                        this.handleShow();
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
                        <Grid container direction='column' alignItems='center'>
                            <AccountCircleIcon sx={{fontSize: 60}}/>
                            <Typography variant='h6'
                            >
                                Name: {this.props.username}
                            </Typography>
                            <Typography variant='h6'
                            >
                                Email: {this.props.email}
                            </Typography>

                        </Grid>

                    </Modal.Body>


                </Modal>
            </>
        );
    }
}

export default withStyles(styles)(ProfileMy);