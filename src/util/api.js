import axios from 'axios'

export function clientApi(client) {
  Object.defineProperties(client.api, {
    get: {
      value: async (url) => {
        const res = await axios.get(url, {
          headers: { Authorization: `Bot ${client.token}` }
        }).catch(err => {throw err})
        return res.data
      }
    },
    
    
    delete: {
      value: async (url) => {
        const res = await axios.delete(url, {
          headers: { Authorization: `Bot ${client.token}` }
        }).catch(err => {throw err})
        return res.data
      }
    },
    
    
    patch: {
      value: async (url, data) => {
        const res = await axios.patch(url, data, {
          headers: { Authorization: `Bot ${client.token}` }
        }).catch(err => {throw err})
        return res.data
      }
    },
    
    
    put: {
      value: async (url, data) => {
        const res = await axios.put(url, data, {
          headers: { Authorization: `Bot ${client.token}` }
        }).catch(err => {throw err})
        return res.data 
      }
    },
    
    
    post: {
      value: async (url, data) => {
        const res = await axios.post(url, data, {
          headers: { Authorization: `Bot ${client.token}` }
        }).catch(err => {throw err})
        return res.data  
      }
    }
    
    
  })
}
