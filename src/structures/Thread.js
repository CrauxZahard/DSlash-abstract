import { ROUTES } from "../util/discord_api_routes"
import { Message } from "./Message"

export class Thread {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', {value: client})
        for(const [k,v] of Object.entries(rawData)) {
            this[k] = v
        }
    }

    async add(memberId = '@me') {
        await this.client.api.put(ROUTES.CHANNEL + `${this.id}/thread-members/${memberId}`)
        return true
    }

    async delete(memberId = '@me') {
        await this.client.api.delete(ROUTES.CHANNEL + `${this.id}/thread-members/${memnberId}`)
        return true
    }

    async getMember(memberId) {
        const result = await this.client.api.get(ROUTES.CHANNEL + `${this.id}/thread-members/${memnberId}`)
        return result
    }

    async getMembers() {
        const result = await this.client.api.get(ROUTES.CHANNEL + `${this.id}/thread-members`)
        return result
    }

    async send(data) {
        const result = await this.client.api.post(ROUTES.CHANNEL + `${this.id}/messages`, data)
        return new Message(this.client, result)
    }
}