import Debug from './util/debugger.js';
import routes from './util/discord_api_routes'

export class Abstract extends Map {
  constructor(client, opt = {}) {
    super()
    
    Object.defineProperties(this, {
      client: {
        value: client
      },
      _debug: {
        value: (new Debug('Abstract', client)).debug
      }
    })
    
    setInterval(this.clearCache, 21_600_000) // 6 hours
  }
  
  // map method
  get(key) {
    return super.get(key)
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
  * filter a cache.
  * @param {Function} fn function to filter
  * @returns {Cache} Cache class
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
  * @returns {Promise<Any>} resolves with data, or rejects with an instance of Error
  */
  async fetch(snowflake, dataType = 'generic') {
    try {
      const data = await this.client.api.get(routes[dataType] + snowflake)
      
      Object.defineProperty(data, '_timestamp', { value: Date.now(), writable: true })
      Object.defineProperty(data, '_type', { value: dataType })
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
  * @returns {Promise<boolean | Error>} resolves with true, or rejects with instance of Error
  */
  async fetchAll(dataType = 'generic') {
    try {
      const Data = await this.client.api.get(routes[dataType])
      
      Data.forEach(data => {
        Object.defineProperty(data, '_timestamp', { value: Date.now(), writable: true})
        Object.defineProperty(data, '_type', { value: dataType })
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
    const copyOfThis = this
    copyOfThis.filter(x => x._type === type)
    return copyOfThis
  }
  
}