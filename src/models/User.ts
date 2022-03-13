import mongoose from "mongoose";

const UserModel = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: String,
      password: String,
    },
    { timestamps: true }
  )
);

export { UserModel };
