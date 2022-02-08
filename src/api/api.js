import axios from 'axios'
axios.defaults.baseURL = 'https://netease-cloud-three.vercel.app/'

const getBanners = async () => {
  return await axios.get('/banner?type=2')
}

const getPlayLists = async (count = 10) => {
  return await axios.get('/top/playlist/highquality?limit=' + count)
}

export {
  getBanners,
  getPlayLists
}
