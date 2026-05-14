import { z } from "zod";

export const checkoutSchema = z.object({
  city: z
    .string()
    .min(3, "City name must be at least 3 characters")
    .nonempty("City is required"),
  
  details: z
    .string()
    .min(10, "Please provide a more detailed address")
    .nonempty("Street address is required"),
  
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number (e.g., 01012345678)"),
  
  postalCode: z
    .string()
    .regex(/^[0-9]{5}$/, "Zip code must be exactly 5 digits")
    .optional()
    .or(z.literal("")), // يسمح بأن يكون فارغاً
});

// استخراج النوع (Type) لاستخدامه في TypeScript
export type CheckoutFormData = z.infer<typeof checkoutSchema>;