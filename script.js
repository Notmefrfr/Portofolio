let z = 1

function openWindow(id){

  const win = document.getElementById(id)

  win.style.display = "block"
  win.classList.add("show")

  const w = win.offsetWidth
  const h = win.offsetHeight

  win.style.left = Math.max(20,(window.innerWidth-w)/2)+"px"
  win.style.top = Math.max(20,(window.innerHeight-h)/2)+"px"

  win.style.zIndex = ++z

  setActive(id)

  playClick()
}

function setActive(id){

  document.querySelectorAll("[data-app]").forEach(el=>{
    el.classList.remove("active")
  })

  document.querySelectorAll(`[data-app="${id}"]`).forEach(el=>{
    el.classList.add("active")
  })

}

function updateClock(){
  const now = new Date()
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute:'2-digit'
  })
  document.getElementById("clock").innerText = time
}

setInterval(updateClock,1000)
updateClock()

function closeWindow(id){

  const win = document.getElementById(id)

  win.style.display = "none"

  document.querySelectorAll(`[data-app="${id}"]`)
    .forEach(el=>el.classList.remove("active"))

  playClick()
}

/* ================= SOUNDS ================= */

const hoverSound = new Audio("assets/sounds/punch.mp3")
const music = new Audio("assets/sounds/lofi.mp3")
const clickSound = new Audio("assets/sounds/click.mp3")

hoverSound.volume = 0.4
music.loop = true
music.volume = 0.4

let musicPlaying = false

function toggleMusic(){

  const btn = document.querySelector(".music-toggle")

  if(musicPlaying){
    music.pause()
    musicPlaying = false
    btn.classList.remove("activate")
  }else{
    music.play()
    musicPlaying = true
    btn.classList.add("activate")
  }

  btn.textContent = musicPlaying ? "🔊" : "🔇"

  playClick()
}

/* Unlock ALL sounds (important for hover) */
document.addEventListener("click", () => {

  ;[music, hoverSound, clickSound].forEach(sound => {
    sound.play().then(() => {
      sound.pause()
      sound.currentTime = 0
    }).catch(()=>{})
  })

}, { once: true })

function playClick(){
  clickSound.currentTime = 0
  clickSound.play()
}

/* ================= DRAG ================= */

document.querySelectorAll(".window").forEach(win => {

  const header = win.querySelector(".title-bar")

  let offsetX = 0
  let offsetY = 0
  let isDown = false

  header.addEventListener("mousedown", (e) => {
    isDown = true

    win.style.zIndex = ++z

    offsetX = e.clientX - win.offsetLeft
    offsetY = e.clientY - win.offsetTop
  })

  document.addEventListener("mouseup", () => {
    isDown = false
  })

  document.addEventListener("mousemove", (e) => {
    if(!isDown) return

    win.style.left = e.clientX - offsetX + "px"
    win.style.top = e.clientY - offsetY + "px"
  })

})

/* ================= HOVER SOUNDS ================= */

let hoverTimeout = false

document.addEventListener("mouseover", (e) => {

  // ICON HOVER (ONLY the icon box)
  const icon = e.target.closest(".icon-img")
  if(icon && !hoverTimeout){
    hoverTimeout = true

    hoverSound.currentTime = 0
    hoverSound.playbackRate = 0.9 + Math.random()*0.2
    hoverSound.play()

    setTimeout(()=>hoverTimeout = false, 150)
  }


})

function toggleDark(){
  document.body.classList.toggle("dark")
  playClick()
}