import { EnumEntityStatus } from '@/type'
import { CommonAccount } from '@/type/common/common-account'
import { CommonMerchant } from '@/type/common/common-merchant'
import { UUID } from '@/type/uuid'

export interface CommonBaseResp {
  id: UUID // 唯一标识符
  entSt: EnumEntityStatus // 实体状态
  createdAt: Date // 创建时间
  createdBy: CommonAccount // 创建人
  updatedAt: Date | null // 更新时间
  updatedBy: CommonAccount | null // 更新人
  updatedReason: string | null // 更新原因
}

export interface CommonResp extends CommonBaseResp {
  merchant: CommonMerchant // 商户
}
