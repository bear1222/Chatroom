import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'
import Profile from './profile';
import { Padding } from '@mui/icons-material';

const styles = theme => ({
    wrap:{
        width: '100%'
    },
    profileBtn:{
        width:  '70px',
        height: '70px',
    },
    message:{
        minWidth: '50px',
        width: 'max-content',
        maxWidth: '200px',
        overflowWrap: 'normal',
        backgroundColor: 'white',
        border: '2px solid #99938c',
        'border-radius': '15px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '8px',
        paddingRight: '8px',
        textAlign: 'center'
    },
    text:{
        fontSize: '24px'
    }
});

class Chattext extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        };
    }

    render(){
        const {classes} = this.props;
        console.log('render Chattext', this.props.mes);
        // sender, text
        return (
            <Grid container direction='row' justifyContent='flex-start' spacing={1} alignItems='center' className={classes.wrap}>
                <Grid item className={classes.profileBtn} alignItems='center' justifyContent='center' container>
                    <Profile
                        username = {this.props.sender}
                        uid = {this.props.uid}
                    />
                </Grid>
                <Grid item>
                    <Grid container direction='column'>
                        <Grid item>
                            <Typography variant='h6'>
                                {this.props.sender}
                            </Typography>
                        </Grid>
                        <Grid item className={classes.message}>
                            <Typography className={classes.text}>
                                {this.props.mes}
                            </Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Chattext);