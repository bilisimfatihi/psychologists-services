import * as yup from "yup";

export const appointmentSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9+ ]+$/, "Invalid phone number"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email"),

  time: yup
    .string()
    .required("Meeting time is required"),

  comment: yup
    .string()
    .max(300, "Comment must be under 300 characters"),
});
