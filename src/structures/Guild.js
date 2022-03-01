import { ROUTES } from "../util/discord_api_routes"

export class Guild {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', {value: client})
        for(const [k,v] of Object.entries(rawData)) {
            this[k] = v
        }
    }

    get threads() {
        return {
            fetchAll: async () => {
                await this.client.abstract.fetchAll({url: ROUTES.GUILD + `${this.guild_id}/threads/active`, dataType: "thread"})
                return true
            }
        }
    }

    get channels() {
        return {
            fetchAll: async () => {
                const result = await this.client.abstract.fetchAll({url: ROUTES.GUILD + `${this.id}/channels`, dataType: 'channel'})
                return result
            },
            fetch: async (id) => {
                let exists = this.client.abstract.getType('channel').filter(channel => channel.guild_id === this.id).get(id)
                if(!exists) {
                    await this.channels.fetchAll()
                    exists = this.client.abstract.getType('channel').filter(channel => channel.guild_id === this.id).get(id)
                }
                return exists
            },
            create: async (data) => {
                const result = await this.client.api.post(ROUTES.GUILD + `${this.id}/channels`, data)
                return result
            },
            get: (id) => {
                return this.client.abstract
                .getType('channel')
                .filter(channel => channel.guild_id === this.id)
                .get(id)
            }
        }
    }
}