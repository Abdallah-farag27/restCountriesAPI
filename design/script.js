// async function getJSON() {
//   return fetch("/data.json")
//     .then((response) => response.json())
//     .then((responseJson) => responseJson);
// }
// async function caller() {
//   data = await getJSON();
//   console.log(data);
// }
let data;
let pendingData = true;
const countries = document.querySelector(".countries-grid");
fetch("/data.json")
  .then((res) => res.json())
  .then((Data) => {
    data = Data;
    console.log(data);
    countries.innerHTML = "";
    data.forEach((element) => {
      zico(element);
    });
  })
  .catch(() => console.log("ahmed amr"));

function zico(country) {
  const html = `
      <div class="counrty">
        <img class="flag" src="${country.flag}" />
        <p class="name">${country.name}</p>
        <div class="info">
          <p>Population: <span>${country.population}</span></p>
          <p>Region: <span>${country.region}</span></p>
          <p>Capital: <span>${country.capital || "No Capital"}</span></p>
        </div>
      </div>`;
  countries.insertAdjacentHTML("beforeend", html);
}
