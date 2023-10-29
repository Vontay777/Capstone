import html from "html-literal";

export default state => html`
  <section id="contactReview">
    <form id="order1" method="POST" action="">
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
        <input type="submit" name="submit" value="Submit" />
      </div>
    </form>
  </section>
`;
