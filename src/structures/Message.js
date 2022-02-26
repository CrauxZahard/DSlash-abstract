export class Message {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', {value: client})
        for(const [k, v] of Object.entries(rawData)) {
            this[k] = v
        }
    }

    async edit(data) {
        const result = await this.client.api.patch(`https://discord.com/api/v10/channels/${this.channel_id}/messages/${this.id}`, data)
        return new Message(this.client, result)
    }

    async delete() {
        await this.client.api.delete(`https://discord.com/api/v10/channels/${this.channel_id}/messages/${this.id}`)
        return true
    }
}