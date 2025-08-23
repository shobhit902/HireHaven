import { transporter } from "./nodemailer.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
export const sendVerificationEmail = async (to, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: `"HireHaven" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Verify your email - HireHaven",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    });

    console.log("Verification email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw err;
  }
};
export const sendWelcomeEmail = async (to, verificationToken) => {
  try {
    const info = await transporter.sendMail({
      from: `"HireHaven" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Verify your email - HireHaven",
      text: "Email verification successful! Welcome to HireHaven!"
    });

    console.log("Verification email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw err;
  }
};
