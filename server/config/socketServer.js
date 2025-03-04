const { Server } = require("socket.io");

let io;
const onlineUsers = new Map();

exports.setupSocketServer = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {

        socket.on("register", (userId) => {
            if (!userId) {
                return;
            }


            onlineUsers.set(String(userId), socket.id);

            // Send confirmation back to client
            socket.emit("registered", { success: true, userId });
        });

        socket.on("disconnect", () => {

            setTimeout(() => {
                for (const [userId, socketId] of onlineUsers.entries()) {
                    if (socketId === socket.id) {
                        onlineUsers.delete(userId);
                        break;
                    }
                }

            }, 5000); // Delay removal to ensure reconnections are handled
        });
    });
};

exports.io = () => io;
exports.onlineUsers = onlineUsers;
