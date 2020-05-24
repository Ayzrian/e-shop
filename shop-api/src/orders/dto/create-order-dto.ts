import { CreateOrderProductDTO } from './create-order-product-dto';
import { RegisterUserDto } from '../../auth/dto/register-user.dto';
import { AddressDTO } from '../../users/dto/address.dto';

export class CreateOrderDTO {
  userId?: number;
  statusId: number;
  addressId?: number;
  user?: RegisterUserDto;
  address?: AddressDTO;
  products: CreateOrderProductDTO[];
}
