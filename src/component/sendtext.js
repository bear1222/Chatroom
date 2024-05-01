import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
    TextField,
} from '@material-ui/core'
import SendIcon from '@mui/icons-material/Send';

const styles = theme => ({
    wrap:{
        height: '40px',
    },
    inputArea:{
        width: 'calc(100% - 80px)',
        height: '40px'
    },
    sendbtn:{
        width: '80px',
        height: '40px'

    }

});

class Sendtext extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            message: ''
        };
    }

    render(){
        const{classes} = this.props;
        console.log('render Sendtext');
        return (
            <Grid container alignItems='flex-end' className={classes.wrap}>

                <TextField size='small' className={classes.inputArea}  label="Message"
                    variant="outlined"
                    onChange={(e) => this.setState({message: e.target.value})}
                    value = {this.state.message}
                />
                <Button variant="outlined" endIcon={<SendIcon />}
                    className={classes.sendbtn}
                    onClick={() => {
                        this.props.sendMes('send', this.props.uid, this.state.message);
                        this.setState({message: ''})
                    }}
                >
                    Send
                </Button>
            </Grid>
        );
    }
}

export default withStyles(styles)(Sendtext);