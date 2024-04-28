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
        console.log('render Main Page');
        return (
            <div>
                <p>
                    Main Page
                </p>
                <p>User: {this.props.userName}</p>
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
                <p>
                    Chatrooms:
                </p>
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
                <AddCRbtn
                    addChatRoom = {this.props.addChatRoom}
                    uid = {this.props.uid}
                />
                <Chat
                    roomName = {this.props.chatRooms[this.state.chooseRoom]}
                    CRid = {this.props.CRids[this.state.chooseRoom]}
                />
            </div>
        );
    }
}

export default withStyles(styles)(MainPage);