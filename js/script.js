const selects = document.querySelectorAll(".languages");
const exchange = document.querySelector(".exchange");
const btn = document.querySelector(".btn");
const firstText = document.getElementById("language");
const secondText = document.getElementById("second");
const copy = document.querySelectorAll(".icon");


selects.forEach((select, id) => {
    for (const country in countries) {
        let selected;
        if(id == 0 && country == "en-GB"){
            selected = "selected";
        }else if(id == 1 && country == "fa-IR"){
            selected = "selected";
        }
        let option = `<option value="${country}" ${selected}>
        ${countries[country]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
    }
});

btn.addEventListener("click", () => {
    let text = firstText.value;
    let translate1 = selects[0].value;
    let translate2 = selects[1].value;
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translate1}|${translate2}`
    fetch(apiURL).then(res => res.json()).then(data => {
        secondText.value = data.responseData.translatedText;
    });
})

exchange.addEventListener("click", () => {
    let text = firstText.value,
    selectLang = selects[0].value;
    selects[0].value = selects[1].value;
    selects[1].value = selectLang;
    firstText.value = secondText.value;
    secondText.value = text;
});

copy.forEach((btn) => {
    btn.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(firstText.value);
            }else{
                navigator.clipboard.writeText(secondText.value);
            }
        }else{
            let speech;
            if(target.id == "speak1"){
                speech = new SpeechSynthesisUtterance(firstText.value);
                console.log("one")
            }else{
                speech = new SpeechSynthesisUtterance(secondText.value)
                console.log("two")
            }
            speechSynthesis.speak(speech)
        }
    })
})