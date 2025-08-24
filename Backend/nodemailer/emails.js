import { transporter } from "./nodemailer.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplate.js";
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

export const sendWelcomeEmail = async (username, to) => {
  try {
    const info = await transporter.sendMail({
      from: `"HireHaven" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Welcome - HireHaven",
      html: WELCOME_EMAIL_TEMPLATE(username),
    });

    console.log("Verification email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw err;
  }
};

export const sendResetPasswordEmail = async (to, resetToken) => {
  try {
    const resetLink = `${process.env.CLIENT_RESET_URL}/reset-password?token=${resetToken}`;
    const info = await transporter.sendMail({
      from: `"HireHaven" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Reset Your Password - HireHaven",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetLink),
    });

    console.log("Reset password email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending reset password email:", err);
    throw err;
  }
};

export const sendResetPasswordSuccessful = async (to) => {
  try {
    const info = await transporter.sendMail({
      from: `"HireHaven" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Password Reset Successful - HireHaven",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });

    console.log("Password reset successful email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending password reset successful email:", err);
    throw err;
  }
};
