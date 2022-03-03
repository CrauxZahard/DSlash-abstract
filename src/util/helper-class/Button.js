export class Button {
    constructor() {
        this.type = 2
    }

    setStyle(style) {
        //validation
        if(style > 5 || style < 1)
            throw new Error("valid style is only between 1-5")
        this.style = style
        return this
    }

    setLabel(text) {
        //validation
        if(text.length > 80)
            throw new Error("the maxmimum length of label text is 80 chars.")
        this.label = text
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

    setId(id) {
        //validation
        if(id.length > 100)
            throw new Error("the max length of custom_id is 100.")
        this.custom_id = id
        return this
    }

    setUrl(url) {
        /* CAUTION: using this method will overwrite existing type (if any) to type 5,
           since url is only valid in button with type 5
        */
        this.type = 5
        this.url = url
        return this
    }
    
    setDisabled(trueOrFalse = true) {
        this.disabled = trueOrFalse
        return this
    }
}