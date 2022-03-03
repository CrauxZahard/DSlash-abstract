export class TextInput {
    constructor() {
        this.type = 4
    }

    setId(id) {
        //validation
        if(id.length > 100)
            throw new Error("the max length of custom_id is 100.")
        this.custom_id = id
        return this
    }

    setStyle(style) {
        //valid styles are only 1 or 2
        if(style !== 1 || style !== 2) 
            throw new Error("Valid choices for style are 1 or 2")
        this.style = style
        return this
    }

    setLabel(text) {
        this.label = text
    }

    setLength({min, max}) {
        //some validation
        if(min && (min < 0 || min > 4000))
            throw new Error("minimum legth must be between 0 and 4000")
        if(max && (max < 1 || max > 4000))
            throw new Error("maximum length must be between 1 and 4000")
        // set the min and max
        if(min) this.min_length = min
        if(max) this.max_length = max
        return this
    }

    setRequired(trueOrFalse) {
        this.required = trueOrFalse
        return this
    }

    setValue(text) {
        //validation
        if(text.length > 4000)
            throw new Error("the maximum length of pre-filled value text is 4000 chars")
        this.value = text
        return this
    }

    setPlaceholder(text) {
        //validation
        if(text.length > 100)
            throw new Error("the maximum length of placeholder text is 100 chars only.")
        this.placeholder = text
        return this
    }
}