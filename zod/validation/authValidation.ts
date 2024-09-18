import z from "zod";
import { loginSchema, registerSchema } from "@/zod/schema/authSchema";

export const validateLogin = (email: string, password: string) => {
  const toast = useToast();
  try {
    loginSchema.parse({
      email: email,
      password: password,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      const firstError = e.errors[0];
      toast.add({
        id: firstError.code,
        description: firstError.message,
        color: "red",
      });
      throw new Error("Login validation failed");
    }
  }
};

export const validateRegistration = (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const toast = useToast();

  try {
    registerSchema.parse({
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      const firstError = e.errors[0];
      toast.add({
        id: firstError.code,
        description: firstError.message,
        color: "red",
      });
      throw new Error("Registration validation failed");
    }
  }
};
