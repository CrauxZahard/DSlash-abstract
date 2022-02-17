# DSlash-abstract
a Discord API framework using REST API instead of gateway. Packed within a single abstract class that holds any type of data 

## Required external package
- [axios](https://www.npmjs.com/package/axios)
- [fastify](https://www.npmjs.com/package/fastify) (to make a REST API)
- [tweetnacl](https://www.npmjs.com/package/tweetnacl) (to validate interaction request)
- additionally, you should have [Node.js](https://nodejs.org/en/) with version 16.x (minimum) installed.

### If you are going to use this
You shouldn't expect to receive any gateway events such as receiving message from an user. Anything you wanna do should be in form of an application command or an interaction (e.g buttons, select menu, etc.)

### What is an abstract class?
Think of it as one big box, a box that could store anything. In this case, the box stores any type of data, without any validation or anything. So... u maybe asking how to know what data is 'this thing'? well, each time the client request a data, it will add `_type` propperty on that data, so that will make us atleast slightly easier to manage datas. Let's take a look at this example:
```js
import Client from './index.js'

//create a new instance of dslash's Client
const client = new Client()

const result = await client.abstract.fetch('735351058888523796', { dataType: 'guild' })
// or you can do: const result = await client.guilds.fetch('735351058888523796')

console.log(result)
/*
{
    id: '735351058888523796',
    name: 'DiscordSlash',
    ...etc,
    _type: 'guild'
}
*/
```

### Contributions are welcomed!
You can contribute by:
- Report unclear doucmentation
- Report a bug
- Implement new features
