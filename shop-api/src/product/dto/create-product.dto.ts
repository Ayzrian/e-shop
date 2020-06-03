import { CreateCharacteristicDTO } from './create-characteristic.dto';

export class CreateProductDTO {
  id?: number;
  typeId: number;
  brand: string;
  name: string;
  price: number;
  characteristics: CreateCharacteristicDTO[];
}
