import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
    IconButton,
} from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete';

const styles = theme => ({
    wrap:{
        width: '100%'
    },
    message:{
        minWidth: '50px',
        backgroundColor: '#eae4dd',
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
    },
    btn:{
        fontSize: '10px',
        textTransform: 'none'
    }

});

class ChattextMy extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        };
    }

    //sendMes = (type, sender, mes) => {

    deleteMes = (mesId, uid, CRid) => {
        const newData = {type: 'unSend', sender: uid, message: 'delete the message'};
        const chatList = firebase.database().ref('chatList/' + CRid + '/' + mesId);
        chatList.update(newData)
        .then(console.log('delete success!'))
        .catch(err => console.error('error!', err));
        this.props.updataManual();
    }

    render(){
        const {classes} = this.props;
        // sender, text
        return (
            <Grid container direction='row' justifyContent='flex-end' className={classes.wrap} alignItems='center'>
                <Grid item>
                <IconButton size='small'
                    onClick={() => this.deleteMes(this.props.mesId, this.props.senderuid, this.props.CRid)}
                >
                    <DeleteIcon sx={{fontSize: 18}}/>
                </IconButton>
                </Grid>
                <Grid item className={classes.message}>
                    <Typography className={classes.text}>
                        {this.props.mes}
                    </Typography>
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(ChattextMy);