import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'

const styles = theme => ({

});

class MainPage extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <p>
                    Main Page
                </p>
                <p>User: {this.props.userName}</p>
                <Button
                    onClick={() => this.props.logoutFunc('')}
                >
                    {'logout'}
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);