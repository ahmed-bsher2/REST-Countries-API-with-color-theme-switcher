const darkBtn = document.getElementsByClassName("dark-button")[0],
      darkMode = document.getElementsByClassName("mode"),
      backBtn = document.querySelector(".control-bar button"),
      country = document.getElementsByClassName("country")[0];


let mainPageMode, allCountries, clickedCountry, selectedCountry, countryName, countryNativeName, countryPopulation, countryRegion, countrySubRegion, countryCapital, countryDomain, countryCurrency, countryLanguages, countryFlag, countryBorders, borderName;
    
// get saved session data 
allCountries = sessionStorage.getItem("allCountries");
allCountries = JSON.parse(allCountries);

clickedCountry = sessionStorage.getItem("clickedCountry");
selectedCountry = allCountries.filter(o => o.name.official.toString().includes(clickedCountry.toString()));

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

// back button event
backBtn.addEventListener("click", ()=> {
    window.location.href = "index.html";
})

// start function
countryDetails(selectedCountry)

// country details function
function countryDetails(selectedCountry){
    countryName = selectedCountry[0].name.common;
    countryNativeName = selectedCountry[0].name.nativeName;
    countryNativeName = (typeof selectedCountry[0].name.nativeName != 'undefined') ? countryNativeName = countryNativeName[Object.keys(countryNativeName)[0]].official.toString() : 'No Native Name';
    countryPopulation = selectedCountry[0].population;
    countryRegion = selectedCountry[0].region;
    countrySubRegion = selectedCountry[0].subregion;
    countryCapital = (typeof selectedCountry[0].capital != 'undefined') ? selectedCountry[0].capital.toString() : 'No Capital';
    countryDomain = (typeof selectedCountry[0].tld != 'undefined') ? selectedCountry[0].tld[0].toString() : 'No TLD';
    countryCurrency = selectedCountry[0].currencies;
    countryCurrency =(typeof selectedCountry[0].currencies != 'undefined') ? countryCurrency = countryCurrency[Object.keys(countryCurrency)[0]].name.toString() : 'No Currencies';
    countryLanguages = selectedCountry[0].languages;
    countryLanguages = Object.keys(countryLanguages).map((key) => countryLanguages[key]).toString();
    countryFlag = selectedCountry[0].flags.png;
    countryBorders = (typeof selectedCountry[0].borders != 'undefined') ? selectedCountry[0].borders : 'No Borders';
    
    createContent()
    CheckDarkMode(mainPageMode)
}

// create content function
function createContent() {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card", "mode");
        var countryCardContent = `
            <div class="country-flag">
                <img src="${countryFlag}" alt="">
            </div>
            <div class="country-info">
                <div class="country-name">${countryName}</div>
                <div class="country-data">
                    <div class="native-name">
                        Native Name: <span>${countryNativeName}</span>
                    </div>
                    <div class="top-level-domain">
                        Top Level Domain: <span>${countryDomain}</span>
                    </div>
                    <div class="population">
                        Population: <span>${countryPopulation}</span>
                    </div>
                    <div class="currencies">
                        Currencies: <span>${countryCurrency}</span>
                    </div>
                    <div class="region">
                        Region: <span>${countryRegion}</span>
                    </div>
                    <div class="Languages">
                        Languages: <span>${countryLanguages}</span>
                    </div>
                    <div class="sub-region">
                        Sub Region: <span>${countrySubRegion}</span>
                    </div>
                    <div class="capital">
                        Capital: <span>${countryCapital}</span>
                    </div>
                </div>
                <div class="country-border">
                    Border Countries: 
                    <div class="borders">
        `;

        // add borders content 
        if(countryBorders != 'No Borders'){
            for (let i = 0; i < countryBorders.length; i++) {
                borderName = allCountries.filter(o => o.cca3.toString().includes(countryBorders[i].toString()));
                countryCardContent += `<button class="border-btn mode">${borderName[0].name.common.toString()}</button>`;
            }
        }
        else {
            countryCardContent += `<span>No Borders</span>`;
        }
        
        // close content section
        countryCardContent += `
                </div>
            </div>
        </div>
        `;
        countryCard.innerHTML += countryCardContent;
        country.appendChild(countryCard);
        
        // add events to border buttons
        let borderBtn = document.getElementsByClassName("border-btn");
        for (let i = 0; i < borderBtn.length; i++) {
            borderBtn[i].addEventListener("click", (e)=> {
                selectedCountry = allCountries.filter(o => o.name.common.toString().includes(borderBtn[i].innerHTML.toString())).slice(-1);
                deleteElements();
                countryDetails(selectedCountry)
            });
        }
}

// empty data function
function deleteElements() {
    countryCard = document.getElementsByClassName("country-card");
    countryCard[0].remove();
}

// check dark mode function
function CheckDarkMode(mainPageMode){
    let element;
    mainPageMode = (typeof (localStorage.getItem("mainPageDarkMode")) === 'undefined' || (localStorage.getItem("mainPageDarkMode") === null)) ? JSON.stringify(["mode"]) : localStorage.getItem("mainPageDarkMode");
    mainPageMode = JSON.parse(mainPageMode);
    if(mainPageMode.slice(-1) == "dark") {
        for (let index = 0; index < darkMode.length; index++) {
            element = darkMode[index].classList.add("dark");
        }
    }
}