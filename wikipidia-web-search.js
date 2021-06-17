let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");


function createAndSearchAppendResults(result) {
    let {
        title,
        link,
        description
    } = result;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);

    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);

    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl)

    let lineBreakEl = document.createElement("br");
    resultItemEl.appendChild(lineBreakEl)


    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description")
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl)
}

function displayResults(sarchResults) {
    spinner.classList.toggle("d-none");
    for (let result of sarchResults) {
        createAndSearchAppendResults(result)
    }

}

function searchWikipidia(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none")
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(responce) {
                return responce.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results)
            })
    }

}

searchInputEl.addEventListener("keydown", searchWikipidia)