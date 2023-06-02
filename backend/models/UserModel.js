const mongoose = require("mongoose");

const aboutSectionContent="I am an final student at the ___________. <br>"+
"Through my university studies, I acquired strong skills in the field of ___________. <br>" +
"The various projects at <Enter your project place> and internships at ___________ <br>" 
+ "that I have carried out have enabled me to develop not only ___________ <br>" +
"but also my ___________."

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobTitle: {  type: String, required: false, default: "Create your online CV with us!" },
  jobDescription: {  type: String, required: false, default: "Create an account or sign in! To make a beautiful CV." },
  aboutSectionImage: {  type: String, required: false, default: "uploads/avatar.png" },
  aboutSectionTitle: {  type: String, required: false, default: "Write your about section!" },
  aboutSectionContent: {  type: String, required: false, default: aboutSectionContent},
  phone: {  type: String, required: false, default: "Add phone"},
  address: {  type: String, required: false, default: "Add address"},
});

module.exports = mongoose.model("User", userSchema);
