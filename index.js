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
        "<a href='https://www.towergrovepark.org/'><img src = https://images.squarespace-cdn.com/content/v1/578fe1beff7c5055e845e712/1505946471919-632TX9MFKACTF7YOWLD3/IMG_6456.jpg?format=2500w width=300px />  " +
          "<b>Tower Grove Park </b></a>"
      )
      .addTo(map);

    L.marker([38.63815030200443, -90.27283398753545], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup(
        "<a href='https://www.forestparkforever.org/visit'><img src = https://images.squarespace-cdn.com/content/v1/5233160ae4b08346f3be204b/1611952053709-S8RGYX6L8O0ZV55TZFK3/DJI_0744+web.jpg?format=1500w height= 200px width=300px />  " +
          "<b> Forest Park </b></a>"
      )
      .addTo(map);

    L.marker([38.56325080105689, -90.26593619380246], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup(
        "<a href='https://www.stlouis-mo.gov/government/departments/parks/parks/browse-parks/view-park.cfm?parkID=5'><img src = https://www.stlouis-mo.gov/government/departments/parks/parks/images/5-22814163423685-large.jpg width=300px />  " +
          "<b> Carondelet Park </b></a>" +
          "Mon-Fri 6am-10pm"+
          "<a href='https://www.google.com/search?q=crondolet+park&rlz=1C1CHBF_enUS1016US1016&oq=crondolet+park&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQLhgKGK8BGMcBGIAEMg8IAhAuGAoYrwEYxwEYgAQyDwgDEC4YChivARjHARiABDIJCAQQABgKGIAEMgkIBRAAGAoYgAQyDwgGEC4YChivARjHARiABDIPCAcQLhgKGK8BGMcBGIAEMg8ICBAuGAoYrwEYxwEYgATSAQg1OTEyajBqNKgCALACAA&sourceid=chrome&ie=UTF-8#:~:text=MON,1.5%20hours%20here'<b> Population! </b></a>"
      )
      .addTo(map);

    L.marker([38.61626070515646, -90.21634994214477], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup(
        "<a href='https://www.stlouis-mo.gov/parks/parks/browse-parks/view-park.cfm?parkID=52'><img src = https://www.stlouis-mo.gov/government/departments/parks/parks/images/52-891414531675-large.jpg width=300px />  " +
          "<b> Lafayette Park </b></a>"
      )
      .addTo(map);

    L.marker([38.724412336817714, -90.48493758810969], {
      icon: L.mapquest.icons.marker(),
      draggable: false
    })
      .bindPopup(
        "<a href='https://stlouiscountymo.gov/st-louis-county-departments/parks/places/creve-coeur-lake-park/'><img src = https://d1ja9tyo8nbkbc.cloudfront.net/49710257_S0174/S0174/S0174-R0100/MAR23026043/64b0ebc0ac05a9112b1490e0.jpg?version=1689344228&width=640 width=300px />  " +
          "<b> Creve Coeur Lake </b></a>"
      )
      .addTo(map);
  }

  if (state.view === "Contact") {
    // Add an event handler for the submit button on the form
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      // Get the form element
      const inputList = event.target.elements;
      console.log("Input Element List", inputList);
      // Create an empty array to hold the toppings

      // Iterate over the toppings array
      // Create a request body object to send to the API
      const requestData = {
        Name: inputList.Name.value,
        Phone: inputList.Phone.value,
        Email: inputList.Email.value
      };
      // Log the request body to the console
      console.log("request Body", requestData);

      axios
        // Make a POST request to the API to create a new pizza
        .post(`${process.env.DOG_TRAILS_API}/customer`, requestData)
        .then(response => {
          //  Then push the new pizza onto the Pizza state pizzas attribute, so it can be displayed in the pizza list
          store.Contact.Customer.push(response.data);
          router.navigate("/Customer");
        })
        // If there is an error log it to the console
        .catch(error => {
          console.log("It puked", error);
        });
    });
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
      case "Contact":
        // New Axios get request utilizing already made environment variable
        axios
          .get(`${process.env.DOG_TRAILS_API}/customer`)
          .then(response => {
            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            console.log("response", response);
            store.Contact.Customer = response.data;
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
