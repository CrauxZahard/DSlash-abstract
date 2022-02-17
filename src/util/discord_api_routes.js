const baseRoute = 'https://discord.com/api/v10/'
export const routes = {
    channel: baseRoute +'channels/',
    guild: baseRoute+'guilds/',
    user: baseRoute+'users/'
}

export function makeRoute(id, data) {
    //probably dumb ways to do
    if(data.type === 'channel') {
        const base = routes.channel+id
        if(data.target === 'messages') return base+'/messages'
        return base
    }
    if(data.type === 'guild') return routes.guilds+id
    if(data.type === 'user') {
        if(data.target === 'client') return routes.user+'@me/'

    }
}