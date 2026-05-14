import * as zod from "zod";

export const sginupSchema = zod
  .object({
    name: zod.string().min(1, "*Please enter your name"),
    email: zod.email("*Please enter your email"),
    password: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Must be at least 8 characters with numbers and symbols",
      ),
    rePassword: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "*Please confirm your password",
      ),
    phone: zod
      .string()
      .min(1, "*Phone number is required")
      .regex(
        /^01[0125][0-9]{8}$/,
        "*Please enter a valid Egyptian phone number (e.g., 01012345678)",
      ),
  })
  .refine(
    function (params) {
      return params.password === params.rePassword;
    },
    {
      error: "Password And rePassword Not Matched",
      path: ["rePassword"],
    },
  );

export type sginupschemaDataType = zod.infer<typeof sginupSchema>;
