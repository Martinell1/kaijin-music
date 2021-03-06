import axios from 'axios'
axios.defaults.baseURL = 'https://netease-cloud-three.vercel.app/'

const getBanners = async () => {
  return await axios.get('/banner?type=2')
}

const getPlayLists = async (count = 10) => {
  return await axios.get('/top/playlist/highquality?limit=' + count)
}

const getAlbumDetail = async (id) => {
  return await axios.get('/playlist/detail?id=' + id)
}

const getAlbumSongs = async (id) => {
  return await axios.get('/playlist/track/all?id=' + id)
}

const getSingers = async (page = 0, type = 1, area = -1, initial = -1) => {
  return await axios.get('/artist/list?type=' + type + '&area=' + area + '&offset=' + page * 30 + '&initial=' + initial)
}

const getSingerDetail = async (id) => {
  return await axios.get('/artist/detail?id=' + id)
}

const getSingerSongs = async (id) => {
  return await axios.get('/artist/songs?id=' + id)
}

const getMusicUrl = async (id) => {
  return await axios.get('/song/url?id=' + id)
}

const checkMusicAble = async (id) => {
  return axios.get('/check/music?id=' + id)
    .catch((err) => {
      return err.response
    })
}

const lyricMap = []
const getLyric = async (song) => {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const id = song.id
  const lyric = lyricMap[id]
  if (lyric) {
    return Promise.resolve(lyric)
  }
  return await axios.get('/lyric?id=' + song.id)
}

const getToplist = async () => {
  return await axios.get('/toplist/detail')
}

const getSearchHotKeys = async () => {
  return await axios.get('/search/hot/detail')
}

const doSearch = async (keywords, page) => {
  return await axios.get('/cloudsearch?keywords=' + keywords + '&offset=' + page * 30)
}

export {
  getBanners,
  getPlayLists,
  getAlbumDetail,
  getAlbumSongs,
  getSingers,
  getSingerDetail,
  getSingerSongs,
  getMusicUrl,
  checkMusicAble,
  getLyric,
  getToplist,
  getSearchHotKeys,
  doSearch
}
