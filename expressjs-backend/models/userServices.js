//import mongoose from "mongoose";
import mongoose from "mongoose";
import userModel from "./user.js";
import dotenv from 'dotenv';
import { generateAccessToken } from "./auth.js";
import bcrypt from 'bcrypt';
dotenv.config()

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);
const check = process.env.Working
const uri = process.env.MONGODB_URI

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => console.log(error));

  async function getUsers() {
    const promise = await userModel.find()
    return promise
  }

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(username, pwd) {

  try {
    const hash = await bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(pwd, salt))

  const user = {
    username:username,
    password:hash,
  }
    const userToAdd = new userModel(user)
    const savedUser = await userToAdd.save();
    return {savedUser};
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function updateUser(id, user) {
  try {
    const userToUpdate = await userModel.findById(id);
    userToUpdate.name = user.name;
    userToUpdate.password = user.password;
    const savedUser = await userToUpdate.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function deleteUser(id) {
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}


async function findUserByName(name) {
  return await userModel.findOne({ username: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

export default{
  addUser,
  getUsers,
  deleteUser,
  updateUser,
  findUserById,
  findUserByName,
  findUserByJob,
};