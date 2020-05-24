import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AddressDTO } from './dto/address.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post('/:id/addresses')
  createUserAddress(@Param('id') userId: number, @Body() address: AddressDTO) {
    return this.usersService.addUserAddress(userId, address);
  }

  @Get('/:id/addresses')
  getUserAddresses(@Param('id') userId: number) {
    return this.usersService.getUserAddresses(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@Req() req) {
    return req.user;
  }
}
