import { CommonAccount } from '@/type/common/common-account'
import { UUID } from '@/type/uuid'

export interface CommonResp {
  id: UUID // 车辆ID
  entSt: string // 实体状态
  merchantId: UUID // 商户ID
  createdAt: Date // 创建时间
  createdBy: CommonAccount // 创建人
  updatedAt?: Date // 更新时间
  updatedBy?: CommonAccount // 更新人
  updatedReason?: string // 更新原因
}
