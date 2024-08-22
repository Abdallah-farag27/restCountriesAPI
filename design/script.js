let data;
let pendingData = true;
const countries = document.querySelector(".countries-grid");
fetch("/data.json")
  .then((res) => res.json())
  .then((Data) => {
    data = Data;
    // console.log(data);
    countries.innerHTML = "";
    let ahmed = 0;
    data.forEach((element, i) => {
      const html = `
        <div class="country" index=${ahmed++}>
          <img class="flag" src="${element.flag}" />
          <p class="name">${element.name}</p>
          <div class="info">
            <p>Population: <span>${element.population}</span></p>
            <p>Region: <span>${element.region}</span></p>
            <p>Capital: <span>${element.capital}</span></p>
          </div>
        </div>`;
      countries.insertAdjacentHTML("beforeend", html);
    });
    countries.addEventListener("click", (e) => {
      const country = e.target.closest(".country");
      if (country) console.log(data[+country.getAttribute("index")]);
    });
  })
  .catch(() => console.log("ahmed amr"));
