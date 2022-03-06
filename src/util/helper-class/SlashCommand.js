export class ApplicationCommand {
    constructor(client) { 
        this.application_id = client.applicationId
    }

    setName(name) {
        this.name = name
        return this
    }

    setId(unique_id) {
        this.id = unique_id
        return this
    }

    setType(type) {
        if(typeof(type) === "string") {
            if(type === "slashCommand") this.type = 1
            if(type === "userCommand") this.type = 2
            if(type === "messageCommand") this.type = 3
            return this
        }
        this.type = type
        return this
    }

    setApplicationId(snowflake) {
        this.application_id = snowflake
        return this
    }

    setGuild(id) {
        this.guild_id = id
        return this
    }

    setDescription(text) {
        this.description = this.type === 1 ? text : ""
        return this
    }

    setOptions(arrayOfOption) {
        this.options = arrayOfOption
    }
}