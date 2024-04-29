import {
    withStyles,
    Typography,
    Divider,
    Grid,
    Button,
} from '@material-ui/core'
import Chatroom from './Chatroom';
import Chat from './Chat';
import AddCRbtn from './addCRbtn';

const styles = theme => ({
    title:{
        height: '100px'
    },
    chatroom_container:{
        height: 'calc(100vh - 100px)',
        width: '100%',
        overflow: 'scroll'
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
            <Grid container direction="row" justifyContent='space-evenly' style={{width: '70vw', height:'80vh'}}>
                <Grid container direction='row' justifyContent='space-between' className={classes.title}>
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
                <Grid container direction='row' >
                    <Grid item xs={4}>
                        <Grid className={classes.chatroom_container}>
                            {
                                this.props.chatRooms.map((name, idx) => {
                                    console.log('chatroom map:', idx);
                                    return (<Chatroom
                                        chatroomName={name}
                                        CRid = {this.props.CRids[idx]}
                                        key={idx}
                                        changeRoom = {this.changeRoom}
                                        idx = {idx}
                                    />);
                                })
                            }
                        </Grid>
                        <AddCRbtn
                            addChatRoom = {this.props.addChatRoom}
                            uid = {this.props.uid}
                        />

                    </Grid>
                    <Grid item xs>
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