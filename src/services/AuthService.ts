import { AuthContract } from "@/assets/contracts/auth.contract";
import { loginResponse } from "@/assets/types/auth.types";


export class AuthService implements AuthContract {
  public strategy = 'jwt'; 

  constructor(
    protected readonly logger, 
    protected readonly secret: string
  ) {}

  async Validate(token: string){
    if(!token) throw new Error('Token not found');
    if(token !== this.secret) throw new Error('Invalid token');
    // Implement token validation logic here
    return  {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'user',
    }
  }

  async EmailLogin(username: string, password: string): Promise<loginResponse> {
    // Implement login logic here
    return {
      token: this.secret,
      user:{
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
      }
    };
  }
}