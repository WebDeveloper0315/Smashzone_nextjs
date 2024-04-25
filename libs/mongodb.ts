import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    mongoose.connect(process.env.NEXT_MONGO_URL || "");
  } catch (err) {
    console.log(err, "mongo error");
  }
};

export default connectMongoDb;
