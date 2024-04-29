import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
    TextField,
} from '@material-ui/core'
import AddMembtn from './addMembtn';

const styles = theme => ({

});

class Sendtext extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: ''
        };
    }

    render(){
        console.log('render Sendtext');
        return (
            <div>
                <TextField
                    onChange={(e) => this.setState({message: e.target.value})}
                    value = {this.state.message}
                />
                <Button
                    onClick={() => {
                        this.props.sendMes('send', this.props.uid, this.state.message);
                        this.setState({message: ''})
                    }}
                >
                    send
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Sendtext);