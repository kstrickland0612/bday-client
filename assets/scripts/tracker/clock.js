function runClock () {
  const now = new Date()

  const hour = now.getHours() % 12
  const min = now.getMinutes()
  const sec = now.getSeconds()

  const clock = document.querySelector('div.clock')
  const hourHand = clock.querySelector('div.hour')
  const minHand = clock.querySelector('div.minute')
  const secHand = clock.querySelector('div.second')

  const hourRotation = 30 * hour
  const minRotation = 6 * min + (6)
  const secRotation = 6 * sec

  hourHand.style.transform = 'rotate(' + hourRotation + 'deg)'
  minHand.style.transform = 'rotate(' + minRotation + 'deg)'
  secHand.style.transform = 'rotate(' + secRotation + 'deg)'

  requestAnimationFrame(runClock)
}

runClock()

module.exports = {
  runClock
}
