import App from './app';

class Server extends App {
	_PORT: Number = this.app.get('PORT');

	/**
	 * This function listens for requests on the port specified in the constructor and logs a message to
	 * the console when the server is running.
	 */
	listen() {
		this.app.listen(this._PORT, () => {
			console.log(`Server running on port ${this._PORT}`);
		});
	}
}

new Server().listen();
