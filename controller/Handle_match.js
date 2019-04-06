function handle_match(queue,rooms,names,socket,data){
    save_name(socket,data,names)
    if(queue.length === 0){
        queue.push(socket);
        send_waiting_request(socket);
    }
    else{
        match(queue,rooms,names,socket,data);
    }
}

function send_waiting_request(socket){
    socket.emit('please wait');
}

function match(queue,rooms,names,socket,data){
    let partner = queue.pop();
    let room_name = socket.id + "#" + partner.id;

    //Send them into one room
    join_in_room(socket,partner,room_name);

    //Save to rooms objects
    save_room(socket,partner,rooms,room_name);

    //Send needed information
    send_needed_info(socket,partner,room_name,names)
}

function save_name(socket,data,names){
    names[socket.id] = data.name;
}

function send_needed_info(socket,partner,room_name,names){
    // Send name and room_name to each clients
    socket.emit('starting chat', {'name': names[partner.id], 'room': room_name});
    partner.emit('starting chat', {'name': names[socket.id], 'room': room_name});
}

function save_room(socket,partner,rooms,room_name){
    rooms[socket.id] = room_name;
    rooms[partner.id] = room_name;
}

function join_in_room(socket,partner,room_name){
    socket.join(room_name);
    partner.join(room_name);
}
module.exports = handle_match;