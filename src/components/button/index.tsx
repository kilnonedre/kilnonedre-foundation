import { Button as ShadcnButton } from '@/shadcn/components/button'
import { Spinner } from '@/shadcn/components/spinner'
import { getSemanticColor } from '@/theme'
import { EnumSemanticColor, EnumVariant } from '@/type/enum'
import { cn } from '@/util'
import type * as types from './type'

export const Button = ({
  semanticColor = EnumSemanticColor.PRIMARY,
  variant = EnumVariant.SOLID,
  children,
  className,
  onClick,
  disabled,
  type = 'button',
  size,
  loading,
}: types.ConfigProp) => {
  const color = getSemanticColor(semanticColor, variant)

  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      size={size}
      disabled={disabled || loading}
      className={cn(
        'whitespace-nowrap',
        'border',
        color.bg,
        color.text,
        color.border,
        color.hoverBg,
        color.hoverText,
        color.focusRing,
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {loading && <Spinner data-icon="inline-start" />}
      {children}
    </ShadcnButton>
  )
}
