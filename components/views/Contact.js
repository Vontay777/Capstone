import html from "html-literal";

export default state => html`
  <section id="contactReview">
    <form
      id="order1"
      method="POST"
      action=""
      onsubmit="return confirm('Thank you! Will be sure to get back to you!');"
    >
      <h2>Contacts</h2>
      <div>
        <label for="Name">Name:</label>
        <input
          type="text"
          name="Name"
          id="Name"
          placeholder="Enter Your Name"
          size="60"
          required
        />
      </div>
      <div>
        <label for="Number">Phone:</label>
        <input
          type="text"
          name="Number"
          id="Number"
          placeholder="(###-###-####)"
          size="60"
          required
        />
      </div>
      <div>
        <label for="Email">Email:</label>
        <input
          type="text"
          name="Email"
          id="Email"
          placeholder="Email Address"
          size="60"
          required
        />
      </div>
      <div id="sub">
        <input type="submit" name="submit" value="Submit" alert="Thank you!" />
      </div>
      <div>
        <h2>
          About me
        </h2>
        <div id="po">
          <p>a lil about myself</p>
        </div>
      </div>
      <div id="yo">
        <img
          src="https://media.licdn.com/dms/image/D4E03AQEWxMdwtj22jA/profile-displayphoto-shrink_800_800/0/1693503687958?e=1704326400&v=beta&t=sWCOlqbHwfq0NqAL19ncLV_RiXzqiunFNMirTqtcYw4"
          class="yo"
        />
      </div>
    </form>
  </section>
`;
