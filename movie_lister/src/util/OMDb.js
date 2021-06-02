'use strict'

import axios from 'axios'
class OMDb {
  constructor (title) {
    this.title = title
  }

  static searchFor (title) {
    return axios.get(`http://www.omdbapi.com/?apikey=a5604b75&s=${title}*&y=2020`)
  }  

  static details (id) {
    return axios.get(`http://www.omdbapi.com/?apikey=a5604b75&i=${id}`)
  }

}

export default OMDb