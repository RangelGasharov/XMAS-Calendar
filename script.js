const fieldWithLightColoredNumber = [1, 3, 4, 5, 6, 8, 13, 15, 16, 19, 20, 24]
function createButtons() {
    let calendarFieldsContainer = document.getElementById("calendarfields")
    for (i = 1; i <= 24; i++) {
        const btn = document.createElement("button")
        btn.innerHTML = i
        btn.classList.add("calendarfield", `calendarfield${i}`)
        btn.id = `calendarfield${i}`
        btn.value = i
        btn.style.backgroundImage = `url(./img/present_${i}.jpg)`
        if (fieldWithLightColoredNumber.includes(i)) {
            btn.style.color = "white"
        }
        calendarFieldsContainer.appendChild(btn)
    }
}
createButtons()

let currentDate = new Date("2022-12-20")
let currentYear = new Date(currentDate).getFullYear()
let month = 12;
const startingDate = new Date(`${currentYear}-${month}-01`)

const wrapper = document.getElementById("wrapper")
const buttonsOfCalendar = document.querySelectorAll(".calendarfield")
const popupWindow = document.getElementById("popup")
const overlay = document.getElementById("overlay")
const closingButton = document.getElementById("close-button")

buttonsOfCalendar.forEach(button => {
    button.addEventListener("click", () => {
        let buttonValue = button.value
        openPopUp(buttonValue)
    })
})

closingButton.addEventListener("click", () => {
    closePopUp()
})
const backgroundGif = document.getElementById("gif")
function openPopUp(buttonValue) {
    let openDateOfField = new Date(`${currentYear}-${month}-${buttonValue}`)
    let openDateOfFieldDay = openDateOfField.getDate()
    if ((currentDate >= openDateOfField) && (currentDate >= startingDate)) {
        popupWindow.classList.add("active")
        overlay.classList.add("active")
        backgroundGif.src = `gif/gif_${buttonValue}.gif`
    } else {
        alert(`It is not yet the ${openDateOfFieldDay}.${month}.${currentYear}`)
    }
}

function closePopUp() {
    popupWindow.classList.remove("active")
    overlay.classList.remove("active")
    backgroundGif.src = ""
}

const creditDiv = document.createElement("div")


const canvas = document.getElementById("canvas");
canvas.width = wrapper.offsetWidth
console.log(wrapper.offsetHeight)
canvas.height = wrapper.offsetHeight
const ctx = canvas.getContext("2d")

ctx.fillStyle = "#fff";
class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.clientWidth;
        this.y = Math.random() * canvas.clientHeight;
        this.radius = Math.random() * 3;
        this.velocity = this.radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();

        this.y += this.velocity;
        if (this.y > canvas.height) {
            this.x = Math.random() * canvas.clientWidth;
            this.y = 0;
        }
    }
}

let snowFlakes = [];
for (let i = 0; i < canvas.width / 3; i++) {
    snowFlakes.push(new Snowflake())
}

window.onresize = function () {
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = wrapper.offsetWidth
    canvas.height = wrapper.offsetHeight
    ctx.fillStyle = "#fff";
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snowFlakes.forEach((snowFlake) => { snowFlake.draw() })
}

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snowFlakes.forEach((snowFlake) => { snowFlake.draw() })
    requestAnimationFrame(animation)
}
animation();