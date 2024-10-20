import axios from 'axios'
import jwt from 'jsonwebtoken'
import {storage, session} from '.'

export default class Axios {
  static instance = null

  constructor() {
    this.session = axios.create()
  }

  static getInstance(type = null) {
    if (Axios.instance === null) {
      Axios.instance = new Axios()
      if (type === 'deleteHeader') {
        Axios.instance.deleteFileHeader()
      } else {
        if (Axios.instance.getToken()) {
          if (type === 'file') {
            Axios.instance.setFileHeader()
          }
          Axios.instance.setToken()
        } else {
          Axios.instance.deleteToken()
        }
      }
    } else {
      Axios.instance.validate()
    }

    return this.instance
  }

  validate = () => {
    let flag = false
    if (Date.now() < jwt.decode(this.token).exp * 1000) {
      flag = true
    } else {
      let url = window.location.href
      if (url.indexOf('/password') === -1) {
        if (url.indexOf('/popup') > -1) {
          if (window) window.close()
        } else {
          window.location = '/logout'
        }
      }
      storage.set('isExpire', true)
    }
    return flag
  }

  getToken = () => {
    this.token = storage.get('Token')
    return !!this.token
  }

  setToken = (token) => {
    if (token) {
      this.token = token
    }

    if (this.validate()) {
      this.session.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    }
  }

  deleteToken = () => {
    delete this.session.defaults.headers.common['Authorization']
    Axios.instance = null
  }

  setFileHeader = () => {
    this.session.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  }

  deleteFileHeader = () => {
    delete this.session.defaults.headers.common['Content-Type']
  }

  setCache = (params) => {
    const url = params[0]
    if (url) {
      // const cache = session.get('cache') ? session.get('cache') : []
      const bypassCache = ['mapi.companywe.co.kr']
      const isBypass = bypassCache.filter((bypass) => url.indexOf(bypass) > -1).length > 0
      // const isNoCache = _.indexOf(cache, url) < 0

      if (!isBypass) {
        this.session.defaults.headers['Cache-Control'] = 'no-cache'
        // cache.push(url)
        // session.set('cache', cache)
      } else {
        delete this.session.defaults.headers['Cache-Control']
      }
    }
    return this.session
  }

  deleteCache = () => {
    session.remove('cache')
  }

  get = (...params) => this.setCache(params).get(...params)
  post = (...params) => this.session.post(...params)
  put = (...params) => this.session.put(...params)
  patch = (...params) => this.session.patch(...params)
  delete = (...params) => this.session.delete(...params)
}
