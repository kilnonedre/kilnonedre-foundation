// 订单状态
export const EnumOrderStatus = {
  CREATED: 'CREATED', // 已创建（未支付）
  PAID: 'PAID', // 已支付（待发货）
  SHIPPED: 'SHIPPED', // 已发货
  COMPLETED: 'COMPLETED', // 已完成
  CANCELLED: 'CANCELLED', // 已取消
  REFUNDING: 'REFUNDING', // 退款中
  REFUNDED: 'REFUNDED', // 已退款
} as const

export type EnumOrderStatus =
  (typeof EnumOrderStatus)[keyof typeof EnumOrderStatus]

export const EnumOrderStatusLabel: Record<EnumOrderStatus, string> = {
  CREATED: '已创建（未支付）',
  PAID: '已支付（待发货）',
  SHIPPED: '已发货',
  COMPLETED: '已完成',
  CANCELLED: '已取消',
  REFUNDING: '退款中',
  REFUNDED: '已退款',
}
