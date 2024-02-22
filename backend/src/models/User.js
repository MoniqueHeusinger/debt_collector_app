import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    sixDigitCode: { type: String },
    emailVerified: { type: Boolean, default: false },
    userRole: [{ type: String, enum: ["admin", "editor"] }],
  },
  {
    collection: "users",
    timestamps: false,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
