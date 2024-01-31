import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 8)
          throw new Error("Invalid password, must be at least 8 characters.");
      },
    },
  },
  { collection: "user_list" }
);
export default mongoose.model("User", UserSchema);