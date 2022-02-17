import { makeRoute } from "../util/discord_api_routes"
import { Message } from "./Message"
export class Channel {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', {value: client})

        for(const [k, v] of Object.entries(rawData)) {
            this[k] = v //lazy attempt lmfao
        }
    }

    async edit(data) {
        const result = await this.client.api.patch(makeRoute(this.id), data).catch(err => {throw err})
        return new Channel(this.client, result)
    }

    async delete() {
        await this.client.api.delete(makeRoute(this.id, {type: 'channel'}))
        return true
    }

    async send(data) {
        const result = await this.client.api.post(makeRoute(this.id, {target: 'messages', type: 'channel'}), data).catch(err => {throw err})
        return new Message(this.client, result)
    }
}