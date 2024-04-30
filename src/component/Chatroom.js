import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Box,
    Button,
    IconButton
} from '@material-ui/core'

const styles = theme => ({
    chatroom:{
        height: '100%',
        textTransform: 'none'
    }
});

class Chatroom extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log('render Chatroom');
        return (
                <Button variant='outlined' fullWidth className={this.props.classes.chatroom}
                    onClick={() => {
                        this.props.changeRoom(this.props.idx);
                    }}
                >
                    {this.props.chatroomName}
                </Button>
        );
    }
}

export default withStyles(styles)(Chatroom);