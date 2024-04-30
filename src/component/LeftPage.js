import {
    withStyles,
    Typography,
    Grid,
    Button,
    Divider,
    IconButton
} from '@material-ui/core'
import Chatroom from './Chatroom';
import Chat from './Chat';
import AddCRbtn from './addCRbtn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Margin } from '@mui/icons-material';

const styles = theme => ({
    wrap:{
        width:'100%',
        height: '100vh',
        backgroundColor: '#DBC8B6'
    },
    leftPart:{
        height: '100vh'
    },
    rightPart:{
        height: '100vh',
    },
    title:{
        height: '80px'
    },
    personal:{
        height: '50px',
        paddingLeft: '15px',
        paddingRight: '10px',
    },
    chatroomContainer:{
        height: 'calc(100% - 80px - 50px - 10px)',
        width: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar':{display:'none'},
        paddingLeft: '10px',
        paddingRight: '10px',
    },
    chatroomContainer_2:{
        height: '100%',
        backgroundColor: '#f0ede5',
    },
    chatroom:{
        width: '100%',
        height: '60px',
    },
    addChatBtn:{
        height: '80px'
    },
    text:{
        fontSize: '18px'
    }

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
            <Grid container direction="row" className={classes.wrap} justifyContent='space-evenly'>
                <Grid item xs={3} className={classes.leftPart} container direction='column' >
                    <Grid container direction='row' justifyContent='space-between' className={classes.title} alignItems='center'>
                        <Typography variant='h2'>
                            Chatroom
                        </Typography>
                        <AddCRbtn
                            addChatRoom = {this.props.addChatRoom}
                            uid = {this.props.uid}
                        />
                    </Grid>
                    <Grid className={classes.chatroomContainer}>
                        <Grid className={classes.chatroomContainer_2}>
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
                    </Grid>
                    <Grid container direction='row' justifyContent='space-evenly' className={classes.personal} spacing={1} alignItems='center'>
                        <Grid item xs={2}>
                            <AccountCircleIcon sx={{ fontSize: 40 }}/>
                        </Grid>
                        <Grid item xs>
                            <Typography className={classes.text}>
                                {this.props.userName}
                            </Typography>
                            <Typography className={classes.text}>
                                {this.props.email}
                            </Typography>
                            
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
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
                                <LogoutIcon/>
                            </IconButton>
                        </Grid>

                    </Grid>

                </Grid>
                <Grid item xs className={classes.rightPart}>
                    <Chat
                        roomName = {this.props.chatRooms[this.state.chooseRoom]}
                        CRid = {this.props.CRids[this.state.chooseRoom]}
                        uid = {this.props.uid}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(MainPage);