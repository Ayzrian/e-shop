
export enum EOrderStatus {
  PENDING_SHIPPING = "Ожидает отправки",
  PENDING_PAYMENT = "Ожидает оплаты",
  SHIPPING = "В дороге",
  PENDING_CONFIRMATION = "Ожидает подтверждения",
  PAID = "Оплачено",
  REIMBURSE = "Возврат"
}

export interface ICreateOrderParams {

}
