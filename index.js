import {
    Grid,
    Divider,
} from '@material-ui/core'

import LSpage from './src/component/LSpage';
import MainPage from './src/component/mainPage'
import { useLayoutEffect } from 'react';
import { ChildCare, FiberManualRecord, SnoozeSharp } from '@material-ui/icons';
const publicRoomId = '-NwYw8c-M4G04lC1sb4X';

export class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            userName: '',
            CRids: [],
            chatRooms: [] 
        };
    }

    getChatRooms = (uid) => {
        if (uid === '') return;

        const userchatroomListRef = firebase.database().ref('userchatroomList/' + uid + '/chatrooms');

        return userchatroomListRef.once('value')
        .then((snapshot) => {
            const CRids = snapshot.val() || []; // handle empty list
            this.setState({CRids: CRids});

            return Promise.all(
              CRids.map((CRid) =>
                firebase.database().ref('chatroomList/' + CRid + '/chatroomName').once('value').then((snapshot) => snapshot.val())
              )
            );
        })
        .then((chatRoomNames) => {
            console.log('chatRooms:', chatRoomNames);
            this.setState({chatRooms: [...chatRoomNames] });
        })
        .catch((error) => {
            console.error('Error fetching chatrooms:', error);
        });
    }

    addUser= (uid, name) => {
        let userList = firebase.database().ref('userList/' + uid);
        userList.set({userName: name})
        .then(console.log('userList  set finish'))
        .catch(err => console.error(err));

        let userchatroomList = firebase.database().ref('userchatroomList/' + uid);
        userchatroomList.set({chatrooms: [publicRoomId]}) // add to public
        .then(console.log('userchatroomList  set finish'))
        .catch(err => console.error(err));

        let chatroomList = firebase.database().ref('chatroomList/' + publicRoomId + '/users');
        chatroomList.once('value', (snapshot) => {
            let data = snapshot.val();
            data.push(uid);
            firebase.database().ref('chatroomList/' + publicRoomId).update({users: data});
        })
        .then(console.log('add user to public success'))
        .catch(err => console.error(err))

    }

    logInOut = (uid, nickName) => {
        console.log('uid: ' + uid, 'nickName: ' + nickName);
        if(uid == ''){ // logout
            this.setState({uid: '', userName: ''});
        }else if(nickName == ''){ // login
            const userList = firebase.database().ref('userList/' + uid + '/userName')
            userList.once('value', (snapshot) => {
                this.setState({uid: uid, userName: snapshot.val()});
            })
        }else{ // signup / google 
            let userList = firebase.database().ref('userList/' + uid);
            userList.once('value', (snapshot) => {
                if(snapshot.exists()){
                    console.log('exist user');
                }else{
                    userList.set({userName: nickName});
                    this.addUser(uid, nickName);
                    console.log('new user');
                }
            });
            this.setState({uid: uid, userName: nickName});
        }
        this.getChatRooms(uid);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log('current login')
            } else {
              // No user is signed in.
              console.log('current logout')
            }
        });
    }

    addChatRoom = (uid, chatRoomName) => {
        console.log('add chatroom ' + chatRoomName +' with uid: ' + uid);

        return firebase.database().ref('chatroomList').push({
            chatroomName: chatRoomName,
            users: [uid]
          }).then((ref) => {
            const CRid = ref.key;
        
            // Add to userchatroomList
            return firebase.database().ref('userchatroomList/' + uid + '/chatrooms').once('value').then((snapshot) => {
              const data = snapshot.val() || [];
              data.push(CRid);
              return firebase.database().ref('userchatroomList/' + uid).set({ chatrooms: data });
            });
          }).then(() => {
            console.log('====add chat room end====');
            this.getChatRooms(uid); // Call getChatRooms after successful updates
          });
    }

    render() {
        console.log(this.state.userName);
        if(this.state.userName !== '')
            return <MainPage 
                uid = {this.state.uid}
                userName = {this.state.userName}
                CRids = {this.state.CRids}
                chatRooms = {this.state.chatRooms}
                logoutFunc = {this.logInOut}
                addChatRoom = {this.addChatRoom}
            />;
        else 
            return <LSpage 
                loginFunc = {this.logInOut}
            />;
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));