let data;
let darkMode = false;
let pendingData = true;
const countries = document.querySelector(".countries-grid");
const btnTheme = document.querySelector(".theme");
const body = document.body;
const header = document.querySelector(".frontBar");
const searchBar = document.querySelector(".searchbar");
const filter = document.querySelector(".filter");
const page1 = document.querySelector(".page-1");
const page2 = document.querySelector(".country--info");

(async function () {
  try {
    const res = await fetch("/data.json");
    const data = await res.json();
    console.log(data);
    countries.innerHTML = "";
    let index = 0;
    const displayCountry = function (e) {
      const countryEl = e.target.closest(".country");
      // if (country) console.log(data[+country.getAttribute("index")]);
      if (!countryEl) return;
      const country = data[+countryEl.getAttribute("index")];
      console.log(country);
      let html = ` <button class="back-button">🔙 Back</button>
      <div class="details">
        <div>
          <img class="country__flag" src="${country.flag}" />
        </div>
        <div class="country-details">
          <h2 class="country__name">${country.name}</h2>
          <div class="country-statistics">
            <div class="first-column">
              <p>Native Name: <span>${country.nativeName}</span></p>
              <p>Population: <span>${country.population}</span></p>
              <p>Region: <span>${country.region}</span></p>
              <p>Sub Region: <span>${country.subregion}</span></p>
              <p>Capital: <span>${country.capital}</span></p>
            </div>
            <div class="secound-column">
              <p>Top Level Domain: <span>${country.topLevelDomain[0]}</span></p>
              <p>Currencies: <span>${country.currencies[0].name}</span></p>
              <p>
                Languages:
                <span>${country.languages[0].name}</span>
              </p>
            </div>
          </div>
          <div class="border-countries">
            <p>Border Countries:</p>`;
      if (country.borders) {
        country.borders.forEach((borderCode) => {
          const border = data.find((el) => el.alpha3Code === borderCode);
          if (border) {
            const htmlB = `
            <button class="border-country--btn">${border.name}</button>
            `;
            html += htmlB;
          }
        });
      }
      html += "</div></div></div>";

      page1.classList.add("hidden");
      page2.innerHTML = "";
      page2.insertAdjacentHTML("afterbegin", html);
      page2.classList.remove("hidden");
    };
    data.forEach((element, i) => {
      const html = `
      <div class="country" index=${index++}>
      <img class="flag" src="${element.flag}" />
      <p class="name">${element.name}</p>
      <div class="info">
      <p>Population: <span class="data">${element.population}</span></p>
      <p>Region: <span class="data">${element.region}</span></p>
      <p>Capital: <span class="data">${element.capital}</span></p>
      </div>
      </div>`;
      countries.insertAdjacentHTML("beforeend", html);
    });
    countries.addEventListener("click", displayCountry);
    btnTheme.addEventListener("click", function (e) {
      e.preventDefault();
      darkMode = !darkMode;
      const cards = document.querySelectorAll(".country");
      const allData = document.querySelectorAll(".data");
      if (darkMode) {
        btnTheme.textContent = "🌞 Light Mode";
        body.classList.add("dark-mode");
        header.style.backgroundColor = "#2e3a4b";
        searchBar.style.backgroundColor = "#2e3a4b";
        filter.style.backgroundColor = "#2e3a4b";
        allData.forEach(
          (span) => (span.style.color = "rgba(200, 200, 200, 0.7)")
        );
        cards.forEach((card) => (card.style.backgroundColor = "#2e3a4b"));
      } else {
        btnTheme.textContent = "🌜 Dark Mode";
        body.classList.remove("dark-mode");
        header.style.backgroundColor = "white";
        searchBar.style.backgroundColor = "white";
        filter.style.backgroundColor = "white";
        allData.forEach((span) => (span.style.color = " rgba(0, 0, 0, 0.7)"));
        cards.forEach((card) => (card.style.backgroundColor = "white"));
      }
    });
  } catch (err) {
    console.error(err.message);
  }
})();

