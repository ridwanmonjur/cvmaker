const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getOneUsersByUserId = async (req, res, next) => {
  const { userId } = req.userData;
  try {
    const user = await User.findOne({ _id: userId }).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getOneUserByUsername = async (req, res) => {
  let { username } = req.params
  console.log({ username })
  username = decodeURI(username)
  try {
    const user = await User.findOne({ username }).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const signup = async (req, res, next) => {
  try {
    if (req.body.confirmPassword !== req.body.password) {
      return res.status(409).json({
        message: "Passwords don't match",
      });
    }
    const searchUser = await User.find({ $or: [{ email: req.body.email, username: req.body.username }] });
    if (searchUser.length >= 1) {
      return res.status(409).json({
        message: "This email or username exists already. Both must be unique",
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }

  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      try {
        await user.save();
        res.status(201).json({ message: "Created user! Now please login!" });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    }
  });
};

const login = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed",
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.TOKEN_SECRET /* ,
          {
            expiresIn: "1h",
          } */
        );
        return res.status(200).json({
          message: "Auth successful",
          token: token,
          _id: user[0]._id
        });
      }
      res.status(401).json({
        message: "Auth failed",
      });
    });
  } catch (error) {
    res.status(500).json({ error: err });
  }
};

const updateUser = async (req, res, next) => {
  const id = req.params.userId;
  console.log({id, body: req.body, name: req.body.name, file: req.file})
  var userSearch;
  try {
    userSearch = await User.findById(id);
  } catch (err) {
    res.status(500).json({ error: err });
  }
  var filePath;
  if (req.file == undefined) {
    filePath = userSearch.aboutSectionImage;
  } else {
    filePath = req.file.path;
  }
  const {
    username, name, email
  } = userSearch
  const {
    jobTitle,
    jobDescription,
    aboutSectionTitle,
    aboutSectionContent,
    phone,
    address,
  } = req.body
  User.findByIdAndUpdate(
    id,
    {
      username,
      name,
      email,
      jobTitle,
      jobDescription,
      aboutSectionTitle,
      aboutSectionContent,
      phone,
      address,
      aboutSectionImage: filePath,
      password: userSearch.password
    },
    {new: true}
    )
    .then((user) => {
      res.status(200).json({
        message: "User updated successfully",
        user,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
};


module.exports = {  signup, login, getOneUserByUsername, getOneUsersByUserId, updateUser };
