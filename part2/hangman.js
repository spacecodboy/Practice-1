canvas = document.getElementById("canvas")
const startGameButton = document.getElementById("start_game")
const alphabet = document.getElementById("alphabet")
const hidWord = document.getElementById("hidden_word")
const result = document.getElementById("result")

let loseCount = 0
let winCount = 0

cities = ['Москва', 'Новосибирск', 'Екатеринбург', 'Казань', 'Челябинск', 'Самара', 'Уфа', 'Омск', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар', 'Тюмень', 'Саратов', 'Тольятти',
    'Ижевск', 'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Махачкала', 'Владивосток', 'Ярославль', 'Оренбург', 'Томск', 'Кемерово', 'Новокузнецк', 'Рязань', 'Киров', 'Севастополь', 'Астрахань',
    'Балашиха','Пенза','Калининград', 'Чебоксары', 'Липецк', 'Тула', 'Ставрополь', 'Курск', 'Сочи', 'Тверь', 'Магнитогорск', 'Иваново', 'Брянск','Чита','Купино','Черепаново']

const canvasBuilder = () => {
    let ctx = canvas.getContext("2d")
    ctx.beginPath()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3

    function reset() {
        let ctx = canvas.getContext("2d"); 
        ctx.clearRect(0,0, canvas.width, canvas.height);
    } 
    const drawLine = (frX, frY, tX, tY) => {
        ctx.moveTo(frX, frY)
        ctx.lineTo(tX, tY)
        ctx.stroke()
    }

    const drawScaffold = () => {
        reset()
        drawLine(10, 130, 130, 130);
        drawLine(10, 10, 10, 131);
        drawLine(10, 10, 70, 10);
        drawLine(70, 10, 70, 20);
    }

    const drawBody = () => {
        drawLine(70, 40, 70, 80);
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
    return { drawScaffold, drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg}
}

const rendering = (count) => {
    let {drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg} = canvasBuilder()
    switch (count) {
        case 1:
            drawHead()
            break
        case 2:
            drawBody()
            break
        case 3:
            drawRightArm()
            break
        case 4:
            drawLeftArm()
            break
        case 5:
            drawRightLeg()
            break
        case 6:
            drawLeftLeg()
            break
        default:
            break
    }
}   

const replaceCharacter = (string, index, replacement) => {
    return (
      string.slice(0, index) +
      replacement +
      string.slice(index + replacement.length)
    );
}


const mainGame = () => {
    let {drawScaffold} = canvasBuilder();
    drawScaffold();
      
    loseCount = 0
    winCount = 0
    let selectedWord = cities[Math.floor(Math.random() * cities.length)]
    selectedWord = selectedWord.toUpperCase()
    console.log(selectedWord)
    hiddenWord = ''
    for (let i = 0; i < selectedWord.length; i++) {
        
        hiddenWord += '_'
    }
    alphabet.innerHTML = "";
    hidWord.innerHTML = ""
    result.innerHTML = ""
    let cyryllic = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 
	'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    for (let i = 0; i < 33; i++) {
        let button = document.createElement("button")
        button.classList.add("letters")
        button.innerText = cyryllic[i]
        button.addEventListener("click", () => {
            let charArray = selectedWord.split("");  
            //let dashes = document.getElementsByClassName("dashes");
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                  if (char === button.innerText) {
                    //hiddenWord[index].innerText = char;
                    hiddenWord = replaceCharacter(hiddenWord, index, char)
                    hidWord.innerHTML = hiddenWord
                    winCount++
                    if (winCount == charArray.length) {
                        result.innerHTML = `<h2 class='win-msg'>Победа!</h2><p class='answer'>Загаданное слово <span>${selectedWord}</span></p>`
                    }
                  }
                });
              } else {
                loseCount += 1;
                rendering(loseCount);
                if (loseCount == 6) {
                    result.innerHTML = `<h2 class='lose-msg'>Проигрыш!</h2><p class='answer'>Загаданное слово <span>${selectedWord}</span></p>`;
                }
            }
            button.disabled = true
        })
        alphabet.append(button)
    }
    hidWord.innerHTML = hiddenWord

};

startGameButton.addEventListener("click", mainGame)
window.onload = mainGame    
