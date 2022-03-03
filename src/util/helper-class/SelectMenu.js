export class SelectMenu {
    constructor() {
        this.type = 3
    }

    setId(id) {
        //validation
        if(id.length > 100)
            throw new Error("the max length of custom_id is 100.")
        this.custom_id = id
        return this
    }

    setValues({min, max}) {
        //some validation
        if(min && (min < 0 || min > 25))
            throw new Error("minimum value must be between 0 and 25")
        if(max && (max < 1 || max > 25))
            throw new Error("maximum value must be between 1 and 25")
        // set the min and max
        if(min) this.min_values = min
        if(max) this.max_values = max
        return this
    }

    setPlaceholder(text) {
        //validation
        if(text.length > 100)
            throw new Error("the maximum length of placeholder text is 100 chars only.")
        this.placeholder = text
        return this
    }

    setDisabled(trueOrFalse = true) {
        this.disabled = trueOrFalse
        return this
    }

    setOptions(arrayOfOption) {
        if(typeof(arrayOfOption) !== 'array') {
            arrayOfOption = [arrayOfOption]
        }
        this.options = arrayOfOption
        return this
     }
}