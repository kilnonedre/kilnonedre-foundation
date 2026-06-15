import { Badge as ShadcnBadge } from '@/shadcn/components/badge'
import { getSemanticColor } from '@/theme'
import { EnumSemanticColor, EnumVariant } from '@/type/enum'
import { cn } from '@/util'
import type * as types from './type'

export * from './preset'

export const Badge = ({
  semanticColor = EnumSemanticColor.PRIMARY,
  variant = EnumVariant.SOLID,
  children,
  className,
}: types.ConfigProp) => {
  const color = getSemanticColor(semanticColor, variant)

  return (
    <ShadcnBadge
      className={cn(
        'pointer-events-none whitespace-nowrap',
        color.bg,
        color.text,
        variant === EnumVariant.OUTLINE && ['border', color.border],
        className
      )}
    >
      {children}
    </ShadcnBadge>
  )
}
