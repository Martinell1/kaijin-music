import axios from 'axios'
axios.defaults.baseURL = 'https://netease-cloud-three.vercel.app/'

const getData = async () => {
  return await axios.get('/top/playlist/highquality')
}

export {
  getData
}
