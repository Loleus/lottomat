const $samples = 6;
const $collect = 49;
let result = [];
const results = [];
const ballsWrapper = document.querySelector("section")
const mainBtn = document.getElementById("losuj");
const listBtn = document.getElementById("pokaz");
const aside = document.querySelector('aside');
const list = document.querySelector('aside.list');
const listWRP = document.querySelector('aside.list div');

const sortYourNumbers = () => {
    result.sort((a, b) => a - b);
    results.push(result);
    result = [];
}
const end = () => {
    setTimeout(() => {
        mainBtn.removeEventListener("click", handleDraw);
        mainBtn.addEventListener('click', reset)
        listBtn.disabled = false;
        mainBtn.disabled = false;
        mainBtn.classList.remove("dots");
        mainBtn.innerText = "Zapisz";
        for (const item of balls) {
            if (!item.classList.contains('selected')) {
                item.style.opacity = 0.4;
            }
        }
    }, 333)
}
const unselBalls = () => {
    for (const item of balls) {
        item.classList.remove('selected');
        item.style.opacity = 1;
    }
}
const getNumber = () => {
    let rndNumber = Math.floor(Math.random() * 49 + 1);
    for (elem of result) {
        if (rndNumber === elem) {
            return getNumber();
        }
    }
    return rndNumber
}
const showInTimeout = (newNumber, i) => {
    setTimeout(() => {
        renderBalls(newNumber);
        if (i ===5) {
            return end();
        }
    }, 333* (i + 1))
}
const fillArray = () => {
    for (let i = 0; i < 6; i++) {
        let newNumber = getNumber();
        result.push(newNumber);
        showInTimeout(newNumber, i)
    }
}
const handleDraw = () => {
    listBtn.style.opacity = 0.4;
    listBtn.disabled = true;
    mainBtn.disabled = true;
    if ($samples <= $collect) {
        mainBtn.innerText = "losuję"
        mainBtn.classList.add("dots");
        fillArray();
    } else {
        console.log('za mała pula')
    }
}
const renderBalls = (wynikLosowania) => {
    const id = "ball" + wynikLosowania
    const wylosowana = document.getElementById(id);
        wylosowana.classList.add('selected') // color selected ball
}
const reset = () => {
    sortYourNumbers();
    unselBalls();
    resetBtn();
    updateInfo();
}
const resultsList = () => {
    if (results.length > 0) {
        list.classList.toggle('open')
        if (list.classList.contains('open')) {
            listBtn.innerText = "Zamknij listę"
            mainBtn.disabled = true;
            mainBtn.style.opacity = 0.4;
            listBtn.style.background = "rgba(175, 76, 76, 0.3)"
        } else {
            listBtn.innerText = "Lista po " + results.length + " losowaniu";
            mainBtn.disabled = false;
            mainBtn.style.opacity = 1;
            listBtn.style.background = "rgba(77, 107, 164, 0.36)";
        }
    } else {
        listBtn.innerText = "Nie losowałeś!";
    }
}
const updateInfo = () => {
    const infoTxt = `W grze nr ${results.length} wylosowano numery`
    const infoTxtH1 = ` ${results[results.length - 1]} `
    aside.innerText = "Jeszcze nie losowałeś";
    if (results.length > 0) {
        aside.innerText = "Ostatnie losowanie: " + infoTxtH1;
        listWRP.innerHTML += `<p>${infoTxt}<h1>${infoTxtH1}</h1></p>`
    }
}
const resetBtn = () => {
    listBtn.style.opacity = 1;
    mainBtn.innerText = "Losuj 6 z 49";
    mainBtn.style.color = "#faec29";
    mainBtn.removeEventListener("click", reset)
    mainBtn.addEventListener("click", handleDraw);
    listBtn.addEventListener("click", resultsList, false)
    if (results.length > 0) {
        listBtn.innerText = "Lista po " + results.length + " losowaniu";
        listBtn.style.background = "rgba(77, 107, 164, 0.36)";
    } else {
        listBtn.innerText = "Lista pusta";
        listBtn.style.background = "rgba(175, 76, 76, 0.3)";
    }
}
const ballGenerator = () => {
    for (let i = 1; i < $collect + 1; i++) {
        const ball = document.createElement("div");
        const id = "ball" + i;
        ball.textContent = i;
        ball.setAttribute("class", "kulki")
        ball.setAttribute("id", id)
        ballsWrapper.appendChild(ball);
    }
}
ballGenerator();
resetBtn();
updateInfo();
const balls = document.querySelectorAll('.kulki');
