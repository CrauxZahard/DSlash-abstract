import clientApi from './util/api'
import Abstract from './Abstract'
import routes from './util/discord_api_routes'
import { startUp } from './util/client_startup'

export class Client {
    constructor(data = {}) {
        clientApi(this)

        Object.defineProperty(this, 'abstract', {
            value: new Abstract(this, routes)
        })
        Object.defineProperty(this, 'token', {
            value: data.token
        })
        
        // @override
        startUp(this)
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