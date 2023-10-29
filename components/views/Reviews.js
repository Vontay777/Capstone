import html from "html-literal";

export default state => html`
  <section id="bio">
    <h2>La'Vonte Wallace </h2>
    <form id="order" method="POST" action="">
      <table id="Customer">
        <tr>
          <th>Reviews!</th>
        </tr>

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
        <label for="Email">Email:</label>
        <input
          type="text"
          name="Email"
          id="Email"
          placeholder="Email Address"
          required
          />
        </div>
        <label for="Review">Review:</label>
        <input
          type="text"
          name="Review"
          id="Review"
          placeholder="Leave a Review"
          required
          />
        </div>
        <input type="submit" name="submit" value="Submit" />




      ${state.Customer.map(customer => {
        return `<tr><td>${customer.phone}</td><td>${customer.email}</td><td>${customer.name}`;
      }).join("")}
    </table>
  </section>
`;
