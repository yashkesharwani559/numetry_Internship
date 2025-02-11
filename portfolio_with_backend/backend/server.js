require("dotenv").config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const nodeMailer = require("nodemailer");

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Numetry_Internship").then(() => { console.log("database connected successfully") })
.catch(error => console.log(error))

const userSchema = {
    name: String,
    email: String,
    message: String,
}

const User = mongoose.model("User", userSchema);

const sendEmail = async (email, message, name) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.TO_EMAIL_USER,
            subject: "Email from " + name,
            text: "My email is "+ email + " " + message,
        };
        await transporter.sendMail(mailOptions);

        return "Email sent successfully"
    } catch (error) {
        return "Error sending email"
    }
}

const saveUser = async (reqBody) => {
    try {
        const user = new User(reqBody)
        await user.save();
        return "user saved successfully"
    } catch (error) {
        return "user can't saved"
    }
}

app.post("/api/email", async (req, resp) => {
    try {
        const reqBody = req.body;
    
        const emailMsg = await sendEmail(reqBody.email, reqBody.message, reqBody.name);
        const saveMsg = await saveUser(reqBody);
        resp.json(emailMsg+ " "+saveMsg );
    } catch (error) {
        console.log("occuring error")
    }
});


app.listen(PORT, () => {
    console.log("server started successfully");
})