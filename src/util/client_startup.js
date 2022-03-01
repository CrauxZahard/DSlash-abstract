import { routes, makeRoute } from "./discord_api_routes"

export function startUp(client) {
    client.channels.fetch = (id) => client.abstract.fetch(id, {dataType: 'channel'})
    client.channels.fetchAll = () => client.abstract.fetchAll({dataType: 'channel'})

    client.guilds.fetch = (id) => client.abstract.fetch(id, {dataType: 'guild'})
    client.guilds.fetchAll = () => client.abstract.fetchAll({dataType: 'guild'})

    client.users.fetch = (id) => client.abstract.fetch(id, {dataType: 'user'})
    client.users.fetchAll = () => client.abstract.fetchAll({dataType: 'user'})
}