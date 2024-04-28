import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'

const styles = theme => ({

});

class Chatroom extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log('render Chatroom');
        console.log(this.props.idx);
        console.log(this.props.CRid)
        return (
            <div>
                <Button
                    onClick={() => this.props.changeRoom(this.props.idx)}
                >
                    {'Chatroom: ' + this.props.chatroomName}
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Chatroom);