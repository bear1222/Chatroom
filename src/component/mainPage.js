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
import LogoutIcon from '@mui/icons-material/Logout';
import NarrowMain from './narrowMain';
import ProfileMy from './profileMy';

const styles = theme => ({
    wrap:{
        width:'100%',
        height: '100vh',
        backgroundColor: '#DBC8B6',
        overflow: 'hidden'
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
        height: '70px',
        paddingLeft: '15px',
        paddingRight: '10px',
    },
    chatroomContainer:{
        height: 'calc(100% - 80px - 70px - 0px)',
        width: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar':{display:'none'},
        paddingLeft: '10px', 
        paddingRight: '10px'
    },
    chatroomContainer_2:{
        height: '100%',
        width: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar':{display:'none'},
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
            chooseRoom: 0, 
            size: 'wide'
        }


    }

    changeRoom = (id) => {
        console.log('change to ' + id);
        this.setState({chooseRoom: id});
    }

    widthChange = () => {
        if(window.innerWidth > 800)
            this.setState({size: 'wide'});
        else 
            this.setState({size: 'narrow'});
    }
    componentDidMount() {
        this.widthChange();
        window.addEventListener('resize', this.widthChange);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.widthChange);
    }


    render(){
        const {classes} = this.props;
        console.log('render Main Page');
        console.log('CRids:', this.props.CRids);
        return (
            this.state.size == 'wide' ? 
            <Grid container direction="row" className={classes.wrap} justifyContent='space-evenly'>
                <Grid item xs={6} sm={5} md={4} className={classes.leftPart} container direction='column' >
                    <Grid container direction='row' justifyContent='space-between' className={classes.title} alignItems='center'>
                        <Typography variant='h3'>
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
                <Grid item xs className={classes.rightPart}>
                    <Chat
                        roomName = {this.props.chatRooms[this.state.chooseRoom]}
                        CRid = {this.props.CRids[this.state.chooseRoom]}
                        uid = {this.props.uid}
                    />
                </Grid>
            </Grid>
            :
            <NarrowMain
                uid = {this.props.uid}
                userName = {this.props.userName}
                email = {this.props.email}
                CRids = {this.props.CRids}
                chatRooms = {this.props.chatRooms}
                logoutFunc = {this.props.logoutFunc}
                addChatRoom = {this.props.addChatRoom}
            />
        );
    }
}

export default withStyles(styles)(MainPage);