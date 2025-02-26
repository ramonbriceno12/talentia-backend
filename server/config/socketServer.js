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
        console.log(`🟢 A user connected: ${socket.id}`);

        socket.on("register", (userId) => {
            if (!userId) {
                console.log(`⚠️ Invalid user ID: ${userId}`);
                return;
            }

            console.log(`🔵 Registering user ${userId} with socket ID: ${socket.id}`);

            onlineUsers.set(String(userId), socket.id);
            console.log("🟡 Active Users:", onlineUsers);

            // Send confirmation back to client
            socket.emit("registered", { success: true, userId });
        });

        socket.on("disconnect", () => {
            console.log(`🔴 A user disconnected: ${socket.id}`);

            setTimeout(() => {
                for (const [userId, socketId] of onlineUsers.entries()) {
                    if (socketId === socket.id) {
                        onlineUsers.delete(userId);
                        console.log(`🔴 User ${userId} removed from active list`);
                        break;
                    }
                }

                console.log("🟡 Active Users after disconnect:", onlineUsers);
            }, 5000); // Delay removal to ensure reconnections are handled
        });
    });
};

exports.io = () => io;
exports.onlineUsers = onlineUsers;
