function handle_exiting(socket,rooms){
    let room_name = rooms[socket.id];
    socket.broadcast.to(room_name).emit("Partner disconnected");
}