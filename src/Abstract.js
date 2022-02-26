import { Channel } from './structures/Channel.js';
import { Message } from './structures/Message.js';
import { Thread } from './structures/Thread.js';
import { User } from './structures/User.js';

import Debug from './util/debugger.js';

export class Abstract extends Map {
  constructor(client, routes /* if the user want a custom of routes */) {
    super()
    
    Object.defineProperties(this, {
      client: {
        value: client
      },
      _debug: {
        value: (new Debug('Abstract', client)).debug
      },
      routes: {
        value: routes
      }
    })
    
    setInterval(this.clearCache, 21_600_000) // 6 hours
  }
  
  // map method
  get(key, shouldTransform = true) {
    if(shouldTransform === false) return super.get(key)
    return this.transform(super.get(key))
  } 
  
  
  set(key, value) {
    return super.set(key, value) 
  }
  
  
  clear() {
    return super.clear()
  }
  
  
  has(key) {
    return super.has(key) 
  }
  
  
  delete(key) {
    return super.delete(key) 
  }
  
  // Custom Function
  
  
  /**
  * filter an Abstract.
  * @param {Function} fn function to filter
  * @returns {Abstract} Abstract class
  */
  filter(fn) {
    if(typeof(fn) !== 'function') throw new Error('Supplied parameter is not a function')
    
    for(const [key, value] of this) {
      if(!fn(value, key)) this.delete(key)
    }

    return this
  }
  
  
  /**
  * @param {Integer} amount amount to return. Default: 1
  * @param {String} type type of Map to return. Valid choice: 'key', 'value', or 'array'. Default: 'value'
  * @returns {String | Array<any>} either key, value, or Object[]<key, value>
  */
  first(amount = 1, type = 'value') {
    if(amount <= 0) return new Error('\'amount\' parameter should be equals or greater than 1')
    
    if(type == 'array') {
      const arr = [...super.entries()]
      arr.slice(0, amount)
      const returnedArray = []
      arr.forEach(element => returnedArray.push({key: element[0], value: element[1]}) )
      return returnedArray
    }
    
    if(type == 'key') {
      const arr = [...super.keys()]
      return arr.slice(0, amount)
    }
    
    if(type == 'value') {
      const arr = [...super.values()]
      return arr.slice(0, amount)
    }
    return new Error('Specified \'type\' parameter is not valid.\nExpected: either \'key\', \'value\', or \'array\'.\nInstead got: \'' + type + '\'')
  }
  
  
  /**
  * fetches something from pre-defined path.
  * @param {String} snowflake a snowflake that identify something
  * @returns {Promise<any>} resolves with data, or rejects with an instance of Error
  */
  async fetch(snowflake, option) {
    try {
      const data = await this.client.api.get(this.routes[dataType] + snowflake)
      
      Object.defineProperty(data, '_timestamp', { value: Date.now(), writable: true })
      Object.defineProperty(data, '_type', { value: option.dataType })
      super.set(data.id || data.name, data)
      this._debug('fetching success')
      return super.get(data.id || data.name)
      
    }
    catch (err) {
      this._debug(`error while fetching ${snowflake}. Status Code: ${err.statusCode}. Message: ${err.message}`)
      throw err
    }
  }
  
  /** 
  * fetches all datas from this url
  * @returns {Promise<Boolean | Error>} resolves with true, or rejects with instance of Error
  */
  async fetchAll(option) {
    try {
      const Data = await this.client.api.get(option.url)
      
      Data.forEach(data => {
        Object.defineProperty(data, '_timestamp', { value: Date.now(), writable: true})
        Object.defineProperty(data, '_type', { value: option.dataType })
        super.set(data.id || data.name, data)
      })
      this._debug('success fetched all data from the url.')
      return true
    }
    catch (err) {
      this._debug('an error has occured while fetching all data!.\n' + `Status Code: ${err.statusCode}\nMessage: ${err.message}`)
      throw err
    }
  }
  
  /**
  * clear an expired data
  * @returns {Boolean} true
  */
  clearCache() {
    
    this.filter(data => {
        return (data._timestamp + this.expiredTime) <= Date.now() 
    })
    
    this._debug('cache cleared.')
    
    return true
  }

  getType(type) {
    const copyOfThis = new Abstract(this.client, this.routes)
    copyOfThis.setAll(...this.entries()).filter(t => t === type)
    return copyOfThis
  }

  setAll(arrayOfData) {
    arrayOfData.forEach(arr => this.set(arr[0], arr[1]))
    return this
  }

  transform(data) {
    if(data._type === 'channel') return new Channel(this.client, data)
    if(data._type === 'message') return new Message(this.client, data)
    if(data._type === 'user') return new User(this.client, data)
    if(data._type === 'thread') return new Thread(this.client, data)
    return super.get(data.id)
  }
  
}