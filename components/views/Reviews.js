import html from "html-literal";

export default state => html`
  <section id="contactReview">
    <form id="order1" method="POST" action="">
      <h2> Leave a Review </h2>


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
          size="50"
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
        <div>
        <label for="Review"></label>
        <input
          type="text"
          name="Review"
          id="Review"
          placeholder="Leave a Review"
          size="80"
          height="400"
          required
          />
        </div>
        <div id =sub>
        <input type="submit" name="submit" value="Submit"  />
        </div>



        ${state.Customer.map(customer => {
          return `<tr><td>${customer.phone}</td><td>${customer.email}</td><td>${customer.name}`;
        }).join("")}
    </table>
  </section>
`;
