import { ROUTES } from "../util/discord_api_routes"

export class Guild {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', {value: client})
        for(const [k,v] of Object.entries(rawData)) {
            this[k] = v
        }
    }

    get thread() {
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
                await this.client.abstract.fetchAll({url: ROUTES.GUILD + `${this.id}/channels`, dataType: 'channel'})
                return true
            },
            create: async (data) => {
                await this.client.api.post(ROUTES.GUILD + `${this.id}/channels`, data)
            }
        }
    }
}