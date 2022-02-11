export function shuffle (source) {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomIndex(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomIndex (max) {
  return Math.floor(Math.random() * (max + 1))
}

function swap (arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

export function formatTime (interval) {
  interval = interval | 0
  const minute = ((interval / 60 | 0) + '')
  const second = (interval % 60 + '')
  return `${fixed(minute)}:${fixed(second)}`
}

function fixed (item) {
  if (item.length === 1) {
    return '0' + item
  } else {
    return item
  }
}
