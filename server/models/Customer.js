import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    validate: /^[A-Za-z0-9 ]*$/
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  review: {
    type: String
  }
});

// ,
// order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
