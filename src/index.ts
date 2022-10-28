import App from "./app";

class Server extends App {

    _PORT: Number = this.app.get('PORT');

    listen() {
        this.app.listen(this._PORT, () => {
            console.log(`Server running on port ${this._PORT}`)
        })
    }
}

new Server().listen();