import {
    withStyles,
    Typography,
    Grid,
    Button,
    Divider
} from '@material-ui/core'
import Chatroom from './Chatroom';
import Chat from './Chat';
import AddCRbtn from './addCRbtn';
import LogoutIcon from '@mui/icons-material/Logout';

const styles = theme => ({
    wrap:{
        width:'100%',
        height: '100vh',
        backgroundColor: '#DABEA7'
    },
    title:{
        height: '120px',
        width: '100%',
        paddingLeft: '50px',
        paddingRight: '50px',
        paddingBottom: '10px'
    },
    below:{
        height: 'calc(100vh - 120px)'
    },
    leftPart:{
        paddingLeft: '20px',
        paddingRight: '20px',
        height: 'calc(100vh - 120px)'

    },
    rightPart:{
        paddingRight: '20px',
        paddingLeft: '20px',
        height: 'calc(100vh - 120px)',
        backgroundColor: '#f0e5dc'


    },
    divide:{
        width: '5px',
        backgroundcolor: 'black'
    },
    chatroomContainer:{
        height: 'calc(100% - 80px)',
        width: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar':{display:'none'}
    },
    chatroom:{
        width: '100%',
        height: '60px'
    },
    addChatBtn:{
        height: '80px'
    },

});

class MainPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            chooseRoom: 0
        }


    }

    changeRoom = (id) => {
        console.log('change to ' + id);
        this.setState({chooseRoom: id});
    }


    render(){
        const {classes} = this.props;
        console.log('render Main Page');
        console.log('CRids:', this.props.CRids);
        return (
            <Grid container direction="column" className={classes.wrap}>
                <Grid container direction='row' justifyContent='space-evenly' className={classes.title} alignItems='flex-end' spacing={2}>
                    <Grid item>
                        <Typography variant='h3'>
                            Chatroom
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h4'>
                            {this.props.userName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            endIcon={<LogoutIcon/>}
                            onClick={() => {
                                firebase.auth().signOut()
                                .then(() => {
                                    this.props.logoutFunc('');
                                })
                                .catch(err => {

                                    console.log('logout fail! ' + err);
                                })
                            }}
                        >
                            {'logout'}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container direction='row' className={classes.below} justifyContent='space-evenly'>
                    <Grid item xs={3} className={classes.leftPart}>
                        <Grid container direction='column' className={classes.chatroomContainer} justifyContent='flex-start' spacing={1}>
                            {
                                this.props.chatRooms.map((name, idx) => {
                                    console.log('chatroom map:', idx);
                                    return (
                                    <Grid 
                                        item 
                                        key={idx}
                                        className={classes.chatroom}
                                    >
                                        <Chatroom
                                            chatroomName={name}
                                            CRid = {this.props.CRids[idx]}
                                            changeRoom = {this.changeRoom}
                                            idx = {idx}
                                        />
                                    </Grid>
                                    );
                                })
                            }
                        </Grid>
                        <Grid container
                            justifyContent='flex-end'
                        >
                            <AddCRbtn
                                addChatRoom = {this.props.addChatRoom}
                                uid = {this.props.uid}
                            />

                        </Grid>

                    </Grid>
                    <Divider orientation="vertical" className={classes.divide}/>
                    <Grid item xs className={classes.rightPart}>
                        <Chat
                            roomName = {this.props.chatRooms[this.state.chooseRoom]}
                            CRid = {this.props.CRids[this.state.chooseRoom]}
                            uid = {this.props.uid}
                        />

                    </Grid>


                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(MainPage);