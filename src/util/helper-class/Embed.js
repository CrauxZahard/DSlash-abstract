function embedValidator(embed) {
    if(
        (
            (embed.text?.length || 0) +
            (embed.description?.length || 0) +
            (embed.author?.name?.length || 0) +
            (embed.fields?.reduce((prev, cur) => prev += (cur.name.length + cur.value.length), 0) || 0) +
            (embed.footer?.text?.length || 0)
        )
        > 6000
    ) return true
    return false
}

export class Embed {
    constructor() {}

    setTitle(text) {
        if(text.length > 256)
            throw new Error("title could only have up to 256 chars")
        this.title = text
        if(embedValidator(this))
            throw new Error("an embed could only have up to 6000 chars (all combined)")
        return this
    }

    setDescription(text) {
        if(text.length > 4096)
            throw new Error("description could only have up to 4096 chars")
        this.description = text
        if(embedValidator(this))
            throw new Error("an embed could only have up to 6000 chars (all combined)")
        return this
    }

    setFields(arrayOfField) {
        this.fields = arrayOfField
        if(embedValidator(this))
            throw new Error("an embed could only have up to 6000 chars (all combined)")
        return this
    }

    //set and add fields serve diff purpose, setFields will overwrite the whole object,
    //while addFields .push() the field

    addFields(arrayOfField) {
        arrayOfField.forEach(field => this.fields.push(field))
        return this
    }
    addField({name, value, inline}) {
        this.fields.push({name, value, inline})
        return this
    }

    setTimestamp(timestamp) {
        this.timestamp = timestamp
        return this
    }

    setColor(integer) {
        //TODO: make a function to convert hex, rgb, etc
        this.color = integer
        return this
    }

    setFooter({text, icon_url = null, proxy_icon_url = null}) {
        this.footer = {
            text,
            icon_url,
            proxy_icon_url
        }
        return this
    }

    setImage(pathOrUrl, {height = null, width = null}) {
        this.image = {
            url: pathOrUrl,
            height,
            width
        }
        return this
    }

    setAuthor({name, url = null, icon_url = null}) {
        this.author = {
            name,
            url,
            icon_url
        }
        return this
    }

    setThumbnail(pathOrUrl, {height = null, width = null}) {
        this.thumbnail = {
            url: pathOrUrl,
            height,
            width
        }
        return this
    }
}