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
    result.sort(function (a, b) {
        return a - b
    });
    results.push(result);
    result = [];
}
const unselBalls = () => {
    for (let i = 0; i < all.length; i++) {
        all[i].classList.contains('selected') ?
            all[i].classList.remove('selected') :
            all[i].style.opacity = 1;
    }
}
const handleDraw = () => {
    listBtn.style.opacity = 0.4;
    listBtn.removeEventListener("click", resultsList, false)
    if ($samples <= $collect) {
        mainBtn.removeEventListener("click", handleDraw);
        mainBtn.innerText = "l o s u j ę"
        mainBtn.classList.add("dots");
        drawing()
    } else {
        console.log('za mała pula')
    }
}
const drawing = () => {
    const wynikLosowania = Math.floor(Math.random() * $collect + 1);
    for (let i = 0; i < result.length; i++) {
        if (wynikLosowania === result[i]) {
            return drawing()
        }
    }
    let id = "ball" + wynikLosowania
    let wylosowana = document.getElementById(id);
    setTimeout(() => {
        wylosowana.classList.add('selected')
        if (result.length === $samples) {
            setTimeout(() => {
                mainBtn.classList.remove("dots");
                mainBtn.innerText = "Zapisz";
                mainBtn.style.color = "white";
                for (let i = 0; i < all.length; i++) {
                    !all[i].classList.contains('selected') ?
                        all[i].style.opacity = 0.45 :
                        null;
                }
            }, 666)
            mainBtn.addEventListener("click", reset)
            return
        }
        drawing()
    }, 666);
    result.push(wynikLosowania);
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
        list.classList.contains('open') ?
            listBtn.innerText = "Zamknij listę" :
            listBtn.innerText = "Lista po " + results.length + " losowaniu";
    } else {
        listBtn.innerText = "Nie losowałeś!";
    }
}
const updateInfo = () => {
    const infoTxt = `W grze nr ${results.length} wylosowano numery`
    const infoTxtH1 = ` ${results[results.length - 1]} `
    aside.innerText = "Jeszcze nie losowałeś";
    if (results.length > 0) {
        aside.innerText = infoTxt + infoTxtH1;
        listWRP.innerHTML += `<p>${infoTxt}<h1>${infoTxtH1}</h1></p><br>`
    }
}
const resetBtn = () => {
    listBtn.style.opacity = 1;
    mainBtn.innerText = "Losuj 6 z 49";
    mainBtn.style.color = "gold";
    mainBtn.removeEventListener("click", reset)
    mainBtn.addEventListener("click", handleDraw);
    listBtn.addEventListener("click", resultsList, false)
    if (results.length > 0) {
        listBtn.innerText = "Lista po " + results.length + " losowaniu";
    } else {
        listBtn.innerText = "Lista pusta";
    }
}
const ballGenerator = () => {
    for (let i = 1; i < $collect + 1; i++) {
        const ball = document.createElement("div");
        ball.textContent = i;
        ball.setAttribute("class", "kulki")
        ball.setAttribute("id", "ball" + i)
        ballsWrapper.appendChild(ball);
    }
}
ballGenerator();
resetBtn();
updateInfo();
const all = document.querySelectorAll('.kulki');