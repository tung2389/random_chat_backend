function handle_sending(socket,rooms,data){
    let room_name = rooms[socket.id];
    socket.broadcast.to(room_name).emit("message",data);
}
module.exports = handle_sending;