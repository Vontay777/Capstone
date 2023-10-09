import html from "html-literal";

export default state => html`
  <section id="trails">
  <h2>
    The weather in ${state.weather.city} is ${state.weather.description}. Temperature is ${state.weather.temp}F, and it feels like ${state.weather.feelsLike}F.
  </h2>
</section `;
