const canvas = document.getElementById("canvas")
const startGameButton = document.getElementById("start_game")
const letterContainer = document.getElementById("alphabet");

let themes = {
  };

const canvasBuilder = () => {
    const ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3

    const drawLine = (frX, frY, tX, tY) => {
        ctx.moveTo(frX, frY)
        ctx.lineTo(tX, tY)
        ctx.stroke()
    }

    const drawScaffold = () => {
        ctx.clearRect(0, 0, ctx.canvas.widht, ctx.canvas.height)
        drawLine(10, 130, 130, 130);
        drawLine(10, 10, 10, 131);
        drawLine(10, 10, 70, 10);
        drawLine(70, 10, 70, 20);
    }

    const drawBody = () => {
        drawLine(70, 40, 70, 80)
    }

    const drawLeftArm = () => {
        drawLine(70, 50, 50, 70)
    }

    const drawRightArm = () => {
        drawLine(70, 50, 90, 70)
    }

    const drawLeftLeg = () => {
        drawLine(70, 80, 50, 110)
    }

    const drawRightLeg = () => {
        drawLine(70, 80, 90, 110)
    }

    const drawHead = () => {
        ctx.beginPath()
        ctx.arc(70, 30, 10, 0, Math.PI * 2)
        ctx.stroke()
    }

    return {drawScaffold, drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg}

}


const wordGenerate = () => {

}


const rendering = () => {
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    let cyryllic = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 
	'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    for (let i = 0; i < 33; i++) {
        let button = document.createElement("button")
        button.classList.add("letters")
        button.innerText = cyryllic[i]
        letterContainer.append(button)
        button.addEventListener("click", () => {
            drawHead()
        })
    }
    let {drawScaffold} = canvasBuilder()
    drawScaffold()
}

startGameButton.addEventListener("click", rendering)
window.onload = rendering