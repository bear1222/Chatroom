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

});

class Chatroom extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log('render Chatroom');
        return (
                <IconButton
                    onClick={() => this.props.changeRoom(this.props.idx)}
                >
                    {'Chatroom: ' + this.props.chatroomName}
                </IconButton>
        );
    }
}

export default withStyles(styles)(Chatroom);