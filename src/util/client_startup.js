import { routes, makeRoute } from "./discord_api_routes"

export function startUp(client) {
    client.channels.fetch = (id) => client.abstract.fetch(id, 'channel')
    client.channels.fetchAll = () => client.abstract.fetchAll('channel')

    client.guilds.fetch = (id) => client.abstract.fetch(id, 'guild')
    client.guilds.fetchAll = () => client.abstract.fetchAll('guild')

    client.users.fetch = (id) => client.abstract.fetch(id, 'user')
    client.users.fetchAll = () => client.abstract.fetchAll('user')
}