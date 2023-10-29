import html from "html-literal";

export default state => html`
  <header>
    <h1>${state.header}</h1>
    <link rel="icon" type="image/png" href="./assets/img/logocap1.png" />
    <img src=url(assets/img/logocap1.png class="logo" )/>
  </header>
`;
