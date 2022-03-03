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

    addActionRow(arrayOfComponents = []) {
        // 1 message could only have up to 5 action rows
        if(this.components.length > 5) {
            throw new Error("a message could only have 5 action rows!")
        }

        this.components.push(
            {
                type: 1,
                components: arrayOfComponents
            }
        )
        return this
    }

    addComponents({actionRowIndex = 0, data}) {

        //an action row could only have up to 5 components
        if(this.components[actionRowIndex].components.length > 5) {
            throw new Error("an action row could only contain up to 5 components!")
        }

        //we can't add an action row into a sub-components
        if(data.type === 1) {
            throw new Error("can't add type \"1\" into a component")
        }

        // we can't have select menu and buttons on same action row index
        if(
            (
                // if this components has a button already, and the user trying to add a select menu
                this.components[actionRowIndex].components.some(c => c.type === 2)
                &&
                data.type === 3
            )
            ||
            (
                // or vice versa
                this.components[actionRowIndex].components.some(c => c.type === 3)
                &&
                data.type === 2
            )
        ) {
            throw new Error("You can't have select menu and button on the same action row index, try a different index instead.")
        }

        this.components[actionRowIndex].components.push(data)
        return this
    }
}