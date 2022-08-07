const progress = document.getElementById('progress')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const area = document.querySelectorAll('.area')
const jokeEl = document.getElementById('joke')

let currentActive = 1

next.addEventListener('click', () => {
  currentActive++
  if (currentActive > area.length) {
    currentActive = area.length
  }
  update()
})
prev.addEventListener('click', () => {
  currentActive--
  if (currentActive < 1) {
    currentActive = 1
  }
  update()
})
function update() {
  area.forEach((area, idx) => {
    if (idx < currentActive) {
      area.classList.add('active')
    } else {
      area.classList.remove('active')
    }
  })
  const actives = document.querySelectorAll('.active')

  progress.style.width = ((actives.length - 1) / (area.length - 1)) * 100 + '%'

  if (currentActive === 1) {
    prev.disabled = true
  } else if (currentActive === area.length) {
    next.disabled = true
  } else {
    prev.disabled = false
    next.disabled = false
  }
}
next.addEventListener('click', generateJoke)
prev.addEventListener('click', generateJoke)
generateJoke()
//Using ASYNC / AWAIT
async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  }
  const res = await fetch('https://icanhazdadjoke.com/', config)
  const data = await res.json()
  jokeEl.innerHTML = data.joke
}
