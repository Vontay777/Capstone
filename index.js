import { Header, Nav, Footer, Main } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo("/");

function render(state = store.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
  ${Main(state)}
  ${Footer()}
  `;
  afterRender(state);
  router.updatePageLinks();
}

function afterRender(state) {
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  if (state.view === "Trails") {
    L.mapquest.key = process.env.MAPQUEST_API_KEY;
    let map = L.mapquest.map("map", {
      center: [38.628644466090925, -90.2659900654653],
      layers: L.mapquest.tileLayer("map"),
      zoom: 11
    });

    L.marker([38.605211006893214, -90.25532408411401], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup(
        "<img src = https://www.stlouis-mo.gov/government/departments/parks/parks/images/115-13417135525139-large.jpg max-width: 20px/>  " +
          "Tower Grove Parks"
      )
      .addTo(map);

    L.marker([38.63815030200443, -90.27283398753545], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup("Forest Park")
      .addTo(map);

    L.marker([38.56325080105689, -90.26593619380246], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup("Carondelet Park")
      .addTo(map);

    L.marker([38.61626070515646, -90.21634994214477], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup("Lafayette Park")
      .addTo(map);

    L.marker([38.724412336817714, -90.48493758810969], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup("Creve Coeur Lake")
      .addTo(map);
  }
}

router.hooks({
  before: (done, params) => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    switch (view) {
      case "Home":
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
          )
          .then(response => {
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
            store.Home.weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      case "Trails":
        // New Axios get request utilizing already made environment variable
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
          )
          .then(response => {
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
            store.Trails.weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };
            done();
          })
          .catch(error => {
            console.log("It puked", error);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      if (view in store) {
        render(store[view]);
      } else {
        render(store.Viewnotfound);
        console.log(`View ${view} not defined`);
      }
    }
  })
  .resolve();
