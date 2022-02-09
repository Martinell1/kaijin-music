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
  arr[i] = t
  arr[j] = t
}
