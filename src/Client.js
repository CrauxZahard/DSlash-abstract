import clientApi from './util/api'
import Abstract from './Abstract'
import {ROUTES} from './util/discord_api_routes'
import { startUp } from './util/client_startup'

export class Client {
    constructor(data = {}) {
        clientApi(this)

        Object.defineProperty(this, 'abstract', {
            value: new Abstract(this, ROUTES)
        })
        Object.defineProperty(this, 'token', {
            value: data.token
        })
        
        // @override
        startUp(this)
    }

    get channels() {
        return this.abstract.getType('channel')
    }

    get guilds() {
        return this.abstract.getType('guild')
    }

    get users() {
        return this.abstract.getType('user')
    }

}