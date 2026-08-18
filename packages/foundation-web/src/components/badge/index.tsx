import { Badge as ShadcnBadge } from '@/shadcn/components/badge'
import { getSemanticColor } from '@/theme'
import type * as types from './type'
import { cn, EnumSemanticColor, EnumVariant } from '@kilnonedre/foundation'

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
