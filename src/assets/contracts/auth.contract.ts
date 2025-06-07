import { loginResponse } from "@/assets/types/auth.types";


export interface AuthContract {
  EmailLogin: (username: string, password: string) => Promise<loginResponse>;
}