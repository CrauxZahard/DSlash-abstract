export class Debug {
    constructor(name, client) {
        this.name = name
        this.client = client
    }

    debug(text) {
        const today = new Date()
        this.client.emit('debug', `[DSlash-abstract] |   ${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}   |   [${this.name}]: ${text}`)
    }
}