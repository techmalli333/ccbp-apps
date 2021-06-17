let changeTimeEl = document.getElementById("changeTime");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");
let givenText = "";

let count = 0;
let intervalId = setInterval(function() {
    count += 1;
    changeTimeEl.textContent = count;
}, 1000);

function changeText() {
    changeTimeEl.textContent = "";
    quoteDisplayEl.textContent = "";
    quoteInputEl.value = "";
    resultEl.textContent = "";
    spinner.classList.remove("d-none");
    clearInterval(intervalId); // it  clear previous timer
    count = 0; // reset count
    intervalId = setInterval(function() { // set new timer
        count += 1;
        changeTimeEl.textContent = count;
    }, 1000);

    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add("d-none");
            let {
                content
            } = jsonData;
            quoteDisplayEl.textContent = content;
            givenText = content;
        });

}

function findResult() {
    if (givenText === quoteInputEl.value) {
        resultEl.textContent = "You completed in " + count + " Seconds";
        clearInterval(intervalId);
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
}

changeText();
resetBtnEl.addEventListener("click", changeText);
submitBtnEl.addEventListener("click", findResult);