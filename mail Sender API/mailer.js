require("dotenv").config();
const nodemailer = require("nodemailer");
const readline = require("readline");

// Create an interface for CLI input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to send email
async function sendEmail(to, message) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: "CLI Email",
            text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log("\n✅ Email sent successfully!");
    } catch (error) {
        console.error("\n❌ Error sending email:", error.message);
    } finally {
        rl.close();
    }
}

rl.question("Enter recipient email: ", (to) => {
    rl.question("Enter your message: ", (message) => {
        sendEmail(to, message);
    });
});
