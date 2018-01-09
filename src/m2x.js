const config = require('./config')
const M2X = require('m2x')

class M2XWrapper {
  constructor(apiKey, deviceId) {
    this.m2x = new M2X(config.get('m2x:apiKey'))
    this.deviceId = config.get('m2x:deviceId')
  }

  postUpdates(params) {
    return new Promise((resolve, reject) => {
      this.m2x.devices.postUpdates(this.deviceId, params, response => {
        if (response.status === 202) {
          resolve()
        } else {
          const error = new Error('Failed to post updates to M2X')
          error.status = response.status
          error.error = response.error()
          reject(error)
        }
      })
    })
  }
}

module.exports = new M2XWrapper()
