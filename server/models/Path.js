import mongoose from "mongoose";

const pathSchema = new mongoose.Schema();

const Path = mongoose.model("Path", pathSchema);

export default Path;
