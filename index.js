import {
    Grid,
    Divider,
} from '@material-ui/core'

import LSpage from './src/component/LSpage';
import MainPage from './src/component/mainPage'
import { useEffect } from 'react';
const publicRoomId = '-Nwn7QRE1r1Bfsu9K9ax';

export class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: '',
            userName: '',
            userEmail: '',
            CRids: [],
            chatRooms: [], 
            islisten: [], 
            firstload: true 
        };
    }

    //getChatRooms = (uid) => {
    //    if (uid === '') return;

    //    const userchatroomListRef = firebase.database().ref('userchatroomList/' + uid + '/chatrooms');

    //    return userchatroomListRef.once('value')
    //    .then((snapshot) => {
    //        const CRids = snapshot.val() || []; // handle empty list
    //        this.setState({CRids: CRids});

    //        return Promise.all(
    //          CRids.map((CRid) =>
    //            firebase.database().ref('chatroomList/' + CRid + '/chatroomName').once('value').then((snapshot) => snapshot.val())
    //          )
    //        );
    //    })
    //    .then((chatRoomNames) => {
    //        console.log('chatRooms:', chatRoomNames);
    //        this.setState({chatRooms: [...chatRoomNames] });
    //    })
    //    .catch((error) => {
    //        console.error('Error fetching chatrooms:', error);
    //    });
    //}

    CRidToCRName = (CRid) => {
        return firebase.database().ref('chatroomList/' + CRid + '/chatroomName').once('value')
        .then((snapshot) => snapshot.val())
        .catch(err => console.log('error:', err));
    }

    addUser= (uid, name) => {
        let userList = firebase.database().ref('userList/' + uid);
        userList.update({userName: name})
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

        // send addMem mes
        const CRid = publicRoomId;
        const newdata = {type: 'addMem', sender: uid, message: 'is added to this chatroom'};
        firebase.database().ref('chatList/' + CRid).push(newdata)
        .then(res => console.log('add member successfully'))
        .catch(err => console.error('error:', err));
    }

    logInOut = (uid, nickName, email) => {
        this.setState({userEmail: email});
        console.log('uid: ' + uid, 'nickName: ' + nickName);
        if(uid == ''){ // logout
            this.setState({uid: '', userName: ''});
            return;
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
                    userList.update({userName: nickName, email: email});
                    this.addUser(uid, nickName);
                    console.log('new user');
                }
            });
            this.setState({uid: uid, userName: nickName});
        }
        this.allowNotification();
        // this.getChatRooms(uid)


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
            const newdata = {type: 'addMem', sender: uid, message: 'is added to this chatroom'};
            firebase.database().ref('chatList/' + CRid).push(newdata)
            .then(res => console.log('send ' + mes, 'successfully'))
            .catch(err => console.error('error:', err));
        
            // Add to userchatroomList
            return firebase.database().ref('userchatroomList/' + uid + '/chatrooms').once('value').then((snapshot) => {
              const data = snapshot.val() || [];
              data.push(CRid);
              return firebase.database().ref('userchatroomList/' + uid).set({ chatrooms: data });
            });
          }).then(() => {
            console.log('====add chat room end====');
            // this.getChatRooms(uid); // Call getChatRooms after successful updates
          });
    }

    allowNotification = () => {
        console.log('permission ask');
        if (!('Notification' in window)) {
            console.log('This browser does not support notification');
        }
        if (Notification.permission === 'default' || Notification.permission === 'undefined') {
            Notification.requestPermission(function(permission) {
                console.log(permission);
            });
          }
    }

    sendNoti = (uid, CRid, message) => {
        firebase.database().ref('userList/' + uid + '/userName').once('value')
        .then(snapshot => {
            const userName = snapshot.val();
            firebase.database().ref('chatroomList/' + CRid + '/chatroomName').once('value')
            .then(snapshot => {
                const CRName = snapshot.val();
                const notificationTitle = `[${CRName}] ${userName}`;
                const notificationBody = message;

                // Create and show the notification
                const notification = new Notification(notificationTitle, { body: notificationBody });
                console.log('CRname:', CRName, 'user:', userName, 'mes:', message);
            });

        })

    }

    //sendNotification = () => {
    //    const { uid, CRids } = this.state; // Destructure uid and CRids from state
    //    // Check for Notification permission before proceeding
    //    if (Notification.permission !== 'granted') {
    //      console.log('Notification permission not granted.');
    //      return;
    //    }
    //    if(uid == null || uid === ''){
    //        console.log('not login');
    //        return;
    //    }

    //    // Loop through CRids and create listeners for each chatList
    //    console.log('first load before loop:', this.state.firstload, CRids);
    //    CRids.forEach((CRid) => {
    //        if(!this.state.islisten.includes(CRid)){
    //            this.setState(prev => ({
    //                islisten: [...prev.islisten, CRid]
    //            }));
    //            console.log('new listen to ', CRid);
    //            const chatListRef = firebase.database().ref('chatList/' + CRid);
    //            const listener = chatListRef.on('child_added', (dataSnapshot) => {
    //                const newMessage = dataSnapshot.val(); // Get the new message data

    //                // Check if the new message sender is not the current user
    //                if (!this.state.firstload && newMessage.sender !== uid && newMessage.type === 'send') {
    //                    console.log('newMes:', newMessage, 'CRid', CRid, 'firstload', this.state.firstload);
    //                    this.sendNoti(newMessage.sender, CRid, newMessage.message);
    //                }
    //            });
    //        }
    //    })
    //    this.setState({firstload: false})
    //}

    listenToCRid = (CRid, firstload) => {
        console.log('listenToCRid', CRid, this.state.firstload);
        const chatListRef = firebase.database().ref('chatList/' + CRid);
        chatListRef.on('child_added', (snapshot) =>{
            const newMessage = snapshot.val();
            if(!firstload && newMessage.sender !== this.state.uid && newMessage.type === 'send'){
                console.log('newMes:', newMessage, 'CRid', CRid, 'firstload', this.state.firstload);
                this.sendNoti(newMessage.sender, CRid, newMessage.message);
            }
        })

    }

    listenTouserchatroomList = () => {
        const userchatroomList = firebase.database().ref('userchatroomList/' + this.state.uid + '/chatrooms');
        return new Promise((resolve, reject) => {
            userchatroomList.on('child_added', snapshot => {
                console.log('snapshot val:', snapshot.val());
                const CRid = snapshot.val();
                this.CRidToCRName(CRid)
                .then(CRName => {
                    this.setState(prevState => {
                        return {
                        CRids: [...prevState.CRids, CRid], 
                        chatRooms: [...prevState.chatRooms, CRName]
                    }})
                })
                .then(() => {
                    this.listenToCRid(CRid, this.state.firstload);
                })
                .then(() => {
                    console.log('finish first load', this.state.CRids, this.state.chatRooms, this.state.firstload);
                    resolve();
                })
                .catch(err => console.error('error', err));
            });
        });
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.uid !== this.state.uid){
            this.listenTouserchatroomList()
            .then(() => {
                console.log('set firstload');
                this.setState({firstload: false})
            });
        }
    }
    
    render() {
        console.log(this.state.userName);
        if(this.state.userName !== '')
            return (
                <MainPage 
                    uid = {this.state.uid}
                    userName = {this.state.userName}
                    email = {this.state.userEmail}
                    CRids = {this.state.CRids}
                    chatRooms = {this.state.chatRooms}
                    logoutFunc = {this.logInOut}
                    addChatRoom = {this.addChatRoom}
                />
            );
        else 
            return (
            <Grid style={{width:'100vw', height: '100vh'}}>
                <LSpage 
                    loginFunc = {this.logInOut}
                />

            </Grid>
            )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));