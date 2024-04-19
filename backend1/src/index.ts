/* websocket server */
import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });
//intialize game manager
console.log('intialize game manager')
const gameManager = new GameManager();

//user connect =>
wss.on('connection', function connection(ws) {
	console.log('user connected')
	//add user
	gameManager.addUser(ws);
	//disconnect => remove user
	ws.on('disconnect', () => {console.log('User disconnected');gameManager.removeUser(ws)})
});