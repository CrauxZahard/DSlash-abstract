import clientApi from './util/api'
import Abstract from './Abstract'

export class Client {
    constructor(data = {}) {
        clientApi(this)
        Object.defineProperty(this, 'abstract', {
            value: new Abstract(this)
        })
        
        // @override
        this.channels.fetch = (id) => this.abstract.fetch(id, 'channel')
        this.guilds.fetch = (id) => this.abstract.fetch(id, 'guild')
        this.users.fetch = (id) => this.abstract.fetch(id, 'user')

        this.channels.fetchAll = () => this.abstract.fetchAll('channel')
        this.guilds.fetchAll = () => this.abstract.fetchAll('guild')
        this.users.fetchAll = () => this.abstract.fetchAll('user')
    }

    channels() {
        return this.abstract.getType('channel')
    }

    guilds() {
        return this.abstract.getType('guild')
    }

    users() {
        return this.abstract.getType('user')
    }

}