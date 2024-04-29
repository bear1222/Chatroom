import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'
import AddMembtn from './addMembtn';

const styles = theme => ({

});

class ChattextMy extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        };
    }

    render(){
        console.log('render Chattext');
        // sender, text
        return (
            <div>
                <p>{this.props.sender} sends {this.props.mes} (my!)</p>
            </div>
        );
    }
}

export default withStyles(styles)(ChattextMy);