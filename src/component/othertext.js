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

class Othertext extends React.Component{
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
                <p> type: {this.props.type}, sender: {this.props.sender}, mes: {this.props.mes}</p>
            </div>
        );
    }
}

export default withStyles(styles)(Othertext);