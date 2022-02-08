import axios from 'axios'
axios.defaults.baseURL = 'https://netease-cloud-three.vercel.app/'

const getBanners = async () => {
  return await axios.get('/banner?type=2')
}

const getPlayLists = async (count = 10) => {
  return await axios.get('/top/playlist/highquality?limit=' + count)
}

const getSingers = async (page = 0, type = 1, area = -1, initial = -1) => {
  return await axios.get('/artist/list?type=' + type + '&area=' + area + '&offset=' + page * 30 + '&initial=' + initial)
}

export {
  getBanners,
  getPlayLists,
  getSingers
}
