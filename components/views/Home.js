import html from "html-literal";

export default state => html`<section id = "jumbotron">
<h2>Find a trail <span style="display: inline-block; font-size: 200px; color: #736f4e;"> 𓃥</span></h2>
<a href="Trails.js">"𓃠"</a>
<h3>
    The weather in ${state.weather.city} is ${state.weather.description}. Temperature is ${state.weather.temp}F, and it feels like ${state.weather.feelsLike}F.
  </h3>
</section `;
