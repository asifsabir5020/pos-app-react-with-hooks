import socketIOClient from "socket.io-client";
import {SERVER} from "../utiles/globleConstants";
import {getServerPort} from "../utiles/globleUtils";
import {getUserEmail} from "../../containers/Auth/utils";

export const connectLoggedInUserWithSocket = () => {
    const socket = socketIOClient(`http://${SERVER}:${getServerPort()}`, { autoConnect: true, query: `userEmail=${getUserEmail()}` });
    socket.on("user-status-toggle", response => {
        console.log('user-status-toggle',response);
        localStorage.clear();
        window.location.reload();
    });
}