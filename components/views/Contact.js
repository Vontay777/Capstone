import html from "html-literal";

export default state => html`
  <section id="contact">
    <form id="order" method="POST" action="">
      <h2>Contacts</h2>
      <div>
        <label for="Name">Name:</label>
        <input
          type="text"
          name="Name"
          id="Name"
          placeholder="Enter Your Name"
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
          required
        />
      </div>
      <input type="submit" name="submit" value="Submit" />
    </form>
  </section>
`;
