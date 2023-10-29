import html from "html-literal";

export default state => html`
  <header>
    <h1>${state.header}</h1>
    <img src="./assets/img/logocap1.png" class="logo" />
  </header>
`;
