import { Schema, model, models } from "mongoose"
import bcrypt from "bcryptjs"

interface IUser {
    name: string;
    email: string;
    password: string;
  }

const schema = new Schema<IUser>({
    name: String,
    email: String,
    password: String
}, {timestamps: true})

schema.pre('save', async function(next) {
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

schema.methods.correctPassword = async function(candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


const User =  models.User || model<IUser>("User", schema)

export default User