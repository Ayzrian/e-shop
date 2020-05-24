import { CreateCharacteristicDescriptorDTO } from './create-characteristic-descriptor.dto';

export class CreateProductTypeDTO {
  type: string;
  characteristicsDescriptors: CreateCharacteristicDescriptorDTO[];
}
