export class SelectMenuOption {
    constructor() {}

    setDefault(trueOrFalse = true) {
        this.default = trueOrFalse
        return this
    }

    setLabel(text) {
        //validation
        if(text.length > 100)
            throw new Error("the maxmimum length of label text is 100 chars.")
        this.label = text
        return this
    }
    
    setValue(text) {
        //validation
        if(text.length > 100)
            throw new Error("the maxmimum length of value is 100 chars.")
        this.value = text
        return this
    }

    setDescription(text) {
        //validation
        if(text.length > 100)
            throw new Error("the maxmimum length of description is 100 chars.")
        this.description= text
        return this
    }

    setEmoji({name, id = null, animated = null}) {
        /* every parameter except name is default to null, just incase the user want standard emoji instead of guild emoji */
        this.emoji = {
            name,
            id,
            animated
        }
        return this
    }
}