// const io = require('socket.io')(http);


module.exports = function initializeSocket(io){
    //hash for usernames to socket ids
    const socketIds = {};
    
    
    /**
     * parties
     * username to roomname hash to manage socket traffic
     * for users who have joined respective part
     * partyName property is set by the first person to send the invite
     *  */ 
    const parties = {};
    
    
    io.on('connection', (socket) => {
        console.log('new websock connection');
    
        // connect usernames and socket ids
        socket.emit('user', 'who you is?')
        socket.on('user', (username) => {
            socketIds[username] = socket.id;
            // send everyone who's online on new connection
            io.emit('who online', Object.keys(socketIds))
        })
    
        //change username
        socket.on('change user', (oldName, newName) => {
            delete socketIds[oldName];
            socketIds[newName] = socket.id;
        });
        
    
        // handle who online request
        socket.on('who online', () => {
            socket.emit('who online', Object.keys(socketIds));
        });
    
        // handle invite
        socket.on('invite', (fromUsername, toUsername) => {
            // send invite 
            socket.broadcast.to(socketIds[toUsername]).emit('invite', fromUsername);
            // create a new party if there isn't one
            if (!parties[fromUsername]) {
                // usersByParty[fromUsername] = [fromUsername];
                parties[fromUsername] = { partyName: fromUsername, private: true };
                socket.join(fromUsername)
            }
            console.log('invite from:', fromUsername,'to', toUsername)
        });
    
         // handle accept invite
         socket.on('accept invite', (fromUsername, toUsername, userStars) => {
            let partyName = parties[toUsername].partyName;
             // send accept notification
            socket.broadcast.to(partyName).emit('invite accepted', fromUsername, userStars);
            // add new dancer to party!
            parties[fromUsername] = parties[toUsername];
            socket.join(partyName);
            let guests = [];
            for (let username in parties) {
                if (parties[username].partyName === partyName) {
                    guests.push(username);
                }
            }
            socket.emit('guests', guests);
        });
    
        socket.on('guests', (guests) => {
            console.log('welcome, server', guests);
        })
    
        // handle pose data
        socket.on('pose', (username, pose, skinName) => {
            if (parties[username]) {
                socket.broadcast.to(parties[username].partyName).emit('pose', username, pose, skinName);
            }
            // socket.broadcast.to(socketIds[friendUsername]).emit('pose', pose);
        })
    
        // handle song change
        socket.on('changeSong', (videoID) => {
            console.log(videoID, 'Server');
            io.emit('changeSong', videoID)
        })
    
    
        // handle song play
        socket.on('playSong', () => {
            // console.log('play song button emitted')
            io.emit('playSong')
        })
    
        //handle song pause
        socket.on('pauseSong', () => {
            // console.log('pause song button emitted')
            io.emit('pauseSong')
        })
    
        // handle chat
        socket.on('chat', (username, message, color) => {
            if (parties[username]) {
                socket.broadcast.to(parties[username].partyName).emit('chat', username, message, color);
                console.log(username, message)
            }
        });
    
        // handle stars
        socket.on('stars', (toUsername, fromUsername) => {
            socket.broadcast.to(parties[toUsername].partyName).emit('stars', toUsername, fromUsername);
        })
    
    
        // handle disconnect 
        socket.on('disconnect', () => {
            for(let username in socketIds) {
                if (socketIds[username] === socket.id){
                    delete socketIds[username];
                    delete parties[username];
                } 
            }
        });
    })

}
