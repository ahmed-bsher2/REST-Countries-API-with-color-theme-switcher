const darkBtn = document.getElementsByClassName("dark-button")[0],
      darkMode = document.getElementsByClassName("mode"),
      cards = document.getElementsByClassName("cards")[0],
      searchBox = document.getElementsByClassName("search-box-input")[0],
      regionsArea = document.querySelector(".region-select"),
      regionsList = document.querySelectorAll(".region-list li a"),
      selectedRegoion = document.querySelector(".region-box-input"),
      regionIcon = document.querySelector(".region-box .region-icon");

// let path = "../all.json";  // file path for testing

let path = "https://restcountries.com/v3.1/all";
let searchText, Ecard, element, allCountries, filterd, clickedCountry, mainPageMode;

// dark button event
darkBtn.addEventListener("click", (e)=>{
    let element;
    if(darkMode[0].classList.contains("dark")){
        for (let i = 0; i < darkMode.length; i++) {
            element = darkMode[i].classList.remove("dark");
        }
    }
    else{
        for (let i = 0; i < darkMode.length; i++) {
            element = darkMode[i].classList.add("dark");
        }
    }
    // save dark mode value in local storage
    mainPageMode = JSON.stringify(Array.from(darkMode[0].classList));
    localStorage.setItem("mainPageDarkMode", mainPageMode)
})

start();

// region list
for(let i = 0; i < regionsList.length; i++){
    regionsList[i].addEventListener("click", (e)=>{
        selectedRegoion.value = e.target.innerHTML;
        regionIcon.classList.replace("fa-angle-up", "fa-circle-xmark");
        regionsArea.style.display = "none";
        deleteCards();
        filterd = allCountries.filter(o => o.region.match( e.target.innerHTML));
        creatCards(filterd);
    })
}

// add event to reagion list
regionIcon.addEventListener("click", ()=> {
    if(regionIcon.classList.contains("fa-angle-down") || regionIcon.classList.contains("fa-angle-up")){
        if( regionsArea.style.display == "block"){
            regionsArea.style.display = "none";
            regionIcon.classList.replace("fa-angle-up", "fa-angle-down");
        }
        else{
            regionsArea.style.display = "block";
            regionIcon.classList.replace("fa-angle-down", "fa-angle-up")
        }
    }
    else if(regionIcon.classList.contains("fa-circle-xmark")){
        regionIcon.classList.replace("fa-circle-xmark", "fa-angle-down");
        selectedRegoion.value = "Filter by Region";
        deleteCards();
        creatCards(allCountries);
    }
})

// search box event
searchBox.onkeyup = function(){ 
        searchText = searchBox.value;
        deleteCards();
        filterd = allCountries.filter(o => o.name.official.toLowerCase().includes(searchText.toLowerCase()));
        creatCards(filterd);
    };

// start page function
async function start() {
    allCountries = await getCuntries(path);
    sessionStorage.setItem("allCountries", JSON.stringify(allCountries));
    creatCards(allCountries);
    CheckDarkMode();
}

// fetch function
async function getCuntries(path) {
    const response = await fetch(path);
    const scrampled = await response.json();
    parsed = await JSON.parse(JSON.stringify(scrampled));
    return parsed
}

// create content function
function creatCards(cardsData) {
    cardsData.forEach(element => {
        const country = element.name.official;
        const popul = element.population;
        const flag = element.flags.png;
        const region = element.region;
        let capital = (typeof element.capital != 'undefined') ? element.capital.toString() : 'No Capital';

        
        // create card element
        const card = document.createElement("div");
        card.classList.add("card", "mode");
        const cardContent = `
            <div class="flag">
                <img src="${flag}" alt="flag">
            </div>
            <div class="info">
                <p class="name">${country}</p>
                <p class="lable">Population: <span class="population">${popul}</span></p>
                <p class="lable">Region: <span class="region">${region}</span></p>
                <div class="lable">Capital: <span class="capital">${capital}</span></div>
            </div>
        `;
        card.innerHTML += cardContent;

        // add events to card
        card.addEventListener("click", (e)=> {
            var el = e.target.parentNode;
            while(!el.classList.contains("card")){
                el = el.parentNode;
            }
            //check clicked country, and save it session storage 
            clickedCountry = el.children[1].children[0].innerHTML.toString();
            sessionStorage.setItem("clickedCountry", clickedCountry);

            // redirect to details page 
            window.location.href = "details.html";
        });

        //append card to page
        cards.appendChild(card);
        CheckDarkMode()
    });
}

// delete content function
function deleteCards() {
    Ecard = document.getElementsByClassName("card");
    while (element = Ecard[0]) {
        element.parentNode.removeChild(element);
    }
}

// check dark mode function
function CheckDarkMode(){
    let element;
    mainPageMode = (typeof (localStorage.getItem("mainPageDarkMode")) === 'undefined' || (localStorage.getItem("mainPageDarkMode") === null)) ? JSON.stringify(["mode"]) : localStorage.getItem("mainPageDarkMode");
    mainPageMode = JSON.parse(mainPageMode);
    if(mainPageMode.slice(-1) == "dark") {
        for (let index = 0; index < darkMode.length; index++) {
            element = darkMode[index].classList.add("dark");
        }
    }
}