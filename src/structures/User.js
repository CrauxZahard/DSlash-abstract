export class User {
    constructor(client, rawData) {
        Object.defineProperty(this, 'client', {value: client})
        for(const [k, v] of Object.entries(rawData)) {
            this[k] = v
        }
    }
}