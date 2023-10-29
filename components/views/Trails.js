import html from "html-literal";

export default state => html`
  <h2>Find a Park</h2>
  <h4>
    The weather in ${state.weather.city} is ${state.weather.description}.
    Temperature is ${state.weather.temp}F, and it feels like
    ${state.weather.feelsLike}F.
  </h4>
  <div id="map"></div>
`;
