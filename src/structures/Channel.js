import { Message } from "./Message"
import { ROUTES } from "../util/discord_api_routes"

export class Channel {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', {value: client})

        for(const [k, v] of Object.entries(rawData)) {
            this[k] = v //lazy attempt lmfao
        }
    }

    async edit(data) {
        const result = await this.client.api.patch(ROUTES.CHANNEL + this.id, data).catch(err => {throw err})
        return new Channel(this.client, result)
    }

    async delete() {
        await this.client.api.delete(ROUTES.CHANNEL + this.id)
        return true
    }

    async send(data) {
        const result = await this.client.api.post(ROUTES.CHANNEL + `${this.id}/messages`, data).catch(err => {throw err})
        return new Message(this.client, result)
    }

    get threads() {
        // bro is this code even readable?
        // nvm just leave this messy code lol
        return {
            create: async ({messageId = null, name, type = 11, rate_limit_per_user, auto_archive_duration, invitable}) => {
                if(messageId === null) {
                    // starts thread without message
                    const result = await this.client.api.post(ROUTES.CHANNEL + `${this.id}/threads`, {
                        name,
                        auto_archive_duration,
                        rate_limit_per_user,
                        type,
                        invitable
                    })
                    return result
                }
                // starts thread with message
                const result = await this.client.api.post(ROUTES.CHANNEL + `${this.id}/messages/${messageId}/threads`, {
                    name,
                    auto_archive_duration,
                    rate_limit_per_user
                })
                return result
            },

            // fetches all thread in this guild
            fetchAll: async () => {
                const result = await this.client.abstract.fetchAll({url: ROUTES.GUILD + `${this.guild_id}/threads/active`, dataType: "thread"})
                return result
            },

            // fetch a single thread in this guild
            fetch: async (id) => {
                let exists = this.client.abstract.getType('thread').filter(thread => thread.guild_id === this.guild_id).get(id)
                if(!exists) {
                    await this.threads.fetchAll()
                    exists = this.client.abstract.getType('thread').filter(thread => thread.guild_id === this.guild_id).get(id)
                }
                return exists
            },

            archived: {
                public: async ({limit}) => {
                    let baseRoute = ROUTES.CHANNEL + `${this.id}/threads/archived/public`
                    if(limit) baseRoute += `?limit=${limit}`
                    const result = await this.client.api.get(baseRoute)
                    return result
                },
                private: async ({limit}) => {
                    let baseRoute = ROUTES.CHANNEL + `${this.id}/threads/archived/private`
                    if(limit) baseRoute += `?limit=${limit}`
                    const result = await this.client.api.get(baseRoute)
                    return result
                },
                joined: async ({limit}) => {
                    let baseRoute = ROUTES.CHANNEL + `${this.id}/users/@me/threads/archived/private`
                    if(limit) baseRoute += `?limit=${limit}`
                    const result = await this.client.api.get(baseRoute)
                    return result
                }
            },

            get: (id) => {
                return this.client.abstract.getType('channel').get(id)
            }
        }
    }
}