import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  @Post('sign-up')
  registerUser() {
    return 'User has been register!';
  }

  @Post('logout')
  logout() {
  }

  @Post('login')
  login() {
  }
}
