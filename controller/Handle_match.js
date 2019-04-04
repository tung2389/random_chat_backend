function handle_match(queue,rooms,socket){
    if(!queue){
        queue.push(socket);
    }
    else{
        match(queue,rooms,socket);
    }
}

function match(queue,rooms,socket){
    let partner = queue.pop();
    let room_name = socket.id + "#" + partner.id;

    //Send them into one room
    socket.join(room_name);
    partner.join(room_name);
    //save to rooms objects
    save_room(socket,partner,rooms,room_name);
}

function save_room(socket,partner,rooms,room_name){
    rooms[socket.id] = room_name;
    rooms[partner.id] = room_name;
}
module.exports = handle_match;