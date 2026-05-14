import * as zod from "zod";

export const loginschema = zod
  .object({
    email: zod.email("*Please enter your email"),
    password: zod
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Must be at least 8 characters with numbers and symbols",
      )
  })


export type loginschemaDataType = zod.infer<typeof loginschema>;
