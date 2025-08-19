import * as Yup from "yup";
import { EmailRegex, DigitRegex } from "./regex";

export const PasswordSchema = Yup.string()
  .trim()
//   .min(8, "Password must be at least 8 characters long")
//   .matches(
//     UppercaseRegex,
//     "Password must contain at least one uppercase letter"
//   )
  .matches(DigitRegex, "Password must contain at least one digit")
  .required("Password is required");

export const EmailSchema = Yup.string()
  .email("Should be a valid email")
  .matches(EmailRegex, "Email should be valid")
  .required("Email is required");

export const loginSchema = Yup.object().shape({
  email: Yup.string().matches(EmailRegex, "Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const changePasswordSchema = Yup.object().shape({
  old_password: PasswordSchema,
  new_password: PasswordSchema,
  confirm_password: PasswordSchema.oneOf(
    [Yup.ref("new_password")],
    "Passwords must match"
  ),
});

export const inviteUserSchema = Yup.object().shape({
  password: PasswordSchema,
  confirm_password: PasswordSchema.oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().matches(EmailRegex, "Invalid email").required("Email is required"),
});