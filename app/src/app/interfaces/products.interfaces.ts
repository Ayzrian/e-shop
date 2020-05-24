export interface IProductType {
  id?: number;
  type: string;
  characteristicsDescriptors: ICharacteristicDescriptor[];
}

export interface ICharacteristicDescriptor {
  id: number;
  name: string;
}

export interface IProduct {
  id?: number;
  typeId?: number;
  name: string;
  brand: string;
  price: number;
  imagePath: string;
  characteristics?: ICharacteristic[];
}

export interface ICharacteristic {
  descriptor?: ICharacteristicDescriptor;
  value: string;
  id?: number;
  descriptorId?: number;
}
