canvas = document.getElementById("canvas");
const startGameButton = document.getElementById("start_game");
const alphabet = document.getElementById("alphabet");
const hidWord = document.getElementById("hidden_word");
const result = document.getElementById("result");

let loseCount = 0;
let winCount = 0;

cities = ['Москва', 'Новосибирск', 'Екатеринбург', 'Казань', 'Челябинск', 'Самара', 'Уфа', 'Омск', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар', 'Тюмень', 'Саратов', 'Тольятти',
    'Ижевск', 'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Махачкала', 'Владивосток', 'Ярославль', 'Оренбург', 'Томск', 'Кемерово', 'Новокузнецк', 'Рязань', 'Киров', 'Севастополь', 'Астрахань',
    'Балашиха','Пенза','Калининград', 'Чебоксары', 'Липецк', 'Тула', 'Ставрополь', 'Курск', 'Сочи', 'Тверь', 'Магнитогорск', 'Иваново', 'Брянск','Чита','Купино','Черепаново'];

const canvasBuilder = () => {
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;

    let img = new Image();
    img.onload = function() {
	    ctx.drawImage(img, 230, 20);
        };
    img.src = "/images/hi.jpg";

    function resetCanvas() {
        let ctx = canvas.getContext("2d"); 
        ctx.clearRect(0,0, canvas.width, canvas.height);
    } 

    const drawLine = (X1, Y1, X2, Y2) => {
        ctx.moveTo(X1, Y1);
        ctx.lineTo(X2, Y2);
        ctx.stroke();
    }

    const drawScaffold = () => {
        resetCanvas();
        drawLine(10, 190, 130, 190); //down
        drawLine(10, 180, 130, 180);
        drawLine(130, 180, 130, 190);
        drawLine(10, 10, 10, 191); //left
        drawLine(20, 10, 20, 191);
        drawLine(10, 10, 70, 10); //up
        drawLine(10, 20, 70, 20); 
        drawLine(70, 10, 70, 45);
    }

    const drawHead = () => {
        ctx.beginPath();
        ctx.arc(70, 60, 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(65, 55, 1, 0, Math.PI * 2) ;//eye
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(75, 55, 1, 0, Math.PI * 2); //eye
        ctx.stroke();
        drawLine(65, 65, 75, 65);
    }

    const drawBody = () => {
        drawLine(70, 75, 70, 120);
    }

    const drawLeftArm = () => {
        drawLine(70, 100, 50, 70);
    }

    const drawRightArm = () => {
        drawLine(70, 100, 90, 70);
    }

    const drawRightLeg = () => {
        drawLine(70, 120, 90, 150);
    }

    const drawLeftLeg = () => {
        drawLine(70, 120, 50, 150);
        drawLine(60, 51, 70, 60);
        drawLine(68, 51, 79, 60);
        drawLine(59, 60, 69, 51);
        drawLine(69, 60, 79, 51);
    }

    return {drawScaffold, drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg};
}

const renderBody= (count) => {
    let {drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg} = canvasBuilder();
    switch (count) {
        case 1:
            drawHead();
            break;
        case 2:
            drawBody();
            break;
        case 3:
            drawRightArm();
            break;
        case 4:
            drawLeftArm();
            break;
        case 5:
            drawRightLeg();
            break;
        case 6:
            drawLeftLeg();
            break;
        default:
            break;
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
    alphabet.innerHTML = "";
    hidWord.innerHTML = "";
    result.innerHTML = "";
    let cyryllic = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 
	'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
    let {drawScaffold} = canvasBuilder();
    drawScaffold();
    loseCount = 0;
    winCount = 0;
    let selectedWord = cities[Math.floor(Math.random() * cities.length)];
    selectedWord = selectedWord.toUpperCase();
    console.log(selectedWord);
    hiddenWord = '';

    for (let i = 0; i < selectedWord.length; i++) {
        hiddenWord += '_';
    }

    for (let i = 0; i < 33; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = cyryllic[i];
        button.addEventListener("click", () => {
            let charArray = selectedWord.split("");  
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                  if (char === button.innerText) {
                    hiddenWord = replaceCharacter(hiddenWord, index, char)
                    hidWord.innerHTML = hiddenWord
                    winCount++
                    if (winCount == charArray.length) {
                        result.innerHTML = `<h2 class='win_msg'>Победа!</h2><p class='answer'>Загаданное слово ${selectedWord}</p>`
                    }
                  }
                });
              } else {
                loseCount += 1;
                renderBody(loseCount);
                if (loseCount == 6) {
                    result.innerHTML = `<h2 class='lose_msg'>Проигрыш!</h2><p class='answer'>Загаданное слово ${selectedWord}</p>`;
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
