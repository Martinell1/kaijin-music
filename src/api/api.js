import axios from 'axios'
axios.defaults.baseURL = 'https://netease-cloud-three.vercel.app/'

const getBanner = async () => {
  return await axios.get('/banner?type=2')
}

export {
  getBanner
}
