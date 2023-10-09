import html from "html-literal";

export default state => html`<section id = "jumbotron">
<h1>Find a trail <span style="display: inline-block; font-size: 100px; color: #000000;"> 𓃥</span></h1>
<a href="Trails.js">"𓃠"</a>
<h2>
    The weather in ${state.weather.city} is ${state.weather.description}. Temperature is ${state.weather.temp}F, and it feels like ${state.weather.feelsLike}F.
  </h2>
</section `;
