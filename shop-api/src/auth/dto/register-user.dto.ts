import { AddressDTO } from '../../users/dto/address.dto';
import { CardDTO } from '../../users/dto/card.dto';

export class RegisterUserDto {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  email: string;
  password?: string;
  phoneNumber: string;
  sex?: string;
  roleId?: number;
  addresses: AddressDTO[];
  cards?: CardDTO[];
}
