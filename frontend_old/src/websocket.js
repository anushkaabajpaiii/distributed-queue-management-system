import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
    const socket = new SockJS("http://localhost:8082/ws");
    stompClient = Stomp.over(socket);

    stompClient.debug = () => {}; // disable logs

    stompClient.connect({}, () => {
        console.log("Connected to WebSocket!");
        stompClient.subscribe("/topic/queue", (msg) => {
            onMessageReceived(msg.body);
        });
    });
};

export const disconnectWebSocket = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
        console.log("WebSocket disconnected");
    }
};
