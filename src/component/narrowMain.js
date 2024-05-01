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
import ReorderIcon from '@mui/icons-material/Reorder';
import ClearIcon from '@mui/icons-material/Clear';
import ProfileMy from './profileMy';

const styles = theme => ({
    wrap:{
        width:'100%',
        height: '100vh',
        backgroundColor: '#DBC8B6',
        overflow: 'hidden'
    },
    leftPart:{
        marginRight: '10px', 
        marginLeft: '10px',
    },
    title:{
        height: '80px'
    },
    personal:{
        height: '70px',
        paddingLeft: '15px',
        paddingRight: '10px',
    },
    chatroomContainer:{
        height: 'calc(100% - 80px - 70px)',
        width: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar':{display:'none'},
        backgroundColor: '#f0ede5',
        marginRight: '10px',
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
    },
    listBtn:{
        width: '50px'
    }

});

class NarrowMain extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            chooseRoom: 0, 
            span: false
        }


    }

    changeRoom = (id) => {
        this.setState({span: false});
        console.log('change to ' + id);
        this.setState({chooseRoom: id});
    }

    render(){
        const {classes} = this.props;
        console.log('render Narrow Main Page');
        console.log('CRids:', this.props.CRids);
        return (
            this.state.span ?  
                <Grid container className={classes.wrap} direction='row'>
                    <Grid item xs className={classes.leftPart} container direction='column' >
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
                                <ProfileMy
                                    uid = {this.props.uid}
                                    username = {this.props.userName}
                                    email = {this.props.email}
                                />
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
                </Grid>
                :
                <Grid container direction='row' className={classes.wrap}>
                    <Grid item className={classes.listBtn}>
                        <IconButton
                            onClick={() => {this.setState({span: true})}}
                        >
                            <ReorderIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs>
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

export default withStyles(styles)(NarrowMain);