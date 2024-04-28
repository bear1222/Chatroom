import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'

const styles = theme => ({

});

class Chat extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log('render Chat');
        console.log(this.props.CRid);
        console.log(this.props.roomName);
        return (
            <div>
                <p>
                    chat text of {this.props.roomName}
                </p>
            </div>
        );
    }
}

export default withStyles(styles)(Chat);