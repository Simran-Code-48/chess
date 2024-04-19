import { WebSocket } from "ws"
import { Game } from "./Game"
import { PLAY } from "./messages";

export class GameManager{
	private games: Game[];
	private pendingUser: WebSocket;
	private users: WebSocket[];

	constructor(){
		this.games = []
	}
	addUser(socket: WebSocket){
		this.users.push(socket);
		this.addHandler(socket);
	}
	removeUser(socket: WebSocket){
		this.users = this.users.filter(user => user !== socket);
		//stop the game here because user left
	}
	private addHandler(socket: WebSocket){
		socket.on('message',(data) => {
			const message = JSON.parse(data.toString());

			if(message.type === PLAY){
				if(this.pendingUser){
					//start the game
					const game = new Game(this.pendingUser, socket);
					this.games.push(game);
					this.pendingUser = null;
				}else{
					this.pendingUser = socket;
				}
			}
			
			if(message.type === MOVE){
				const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
				if(game){
					game.makeMove(socket, message.move);
				}
			}
		})
	}
	private handleMessage(){

	}
}