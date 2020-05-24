import { CreateCharacteristicDTO } from './create-characteristic.dto';

export class CreateProductDTO {
  typeId: number;
  brand: string;
  name: string;
  price: number;
  characteristics: CreateCharacteristicDTO[];
}
