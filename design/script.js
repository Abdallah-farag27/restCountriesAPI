let data;
let darkMode = false;
let pendingData = true;
const countries = document.querySelector(".countries-grid");
const btnTheme = document.querySelector(".theme");
const body = document.body;
const header = document.querySelector(".frontBar");
const searchBar = document.querySelector(".searchbar");
const filter = document.querySelector(".filter");
(async function () {
  try {
    const res = await fetch("/data.json");
    const data = await res.json();
    console.log(data);
    countries.innerHTML = "";
    let index = 0;
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
    countries.addEventListener("click", (e) => {
      const country = e.target.closest(".country");
      if (country) console.log(data[+country.getAttribute("index")]);
    });
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
