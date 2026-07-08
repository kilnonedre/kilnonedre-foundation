import * as React from 'react'
import { Button as ShadcnButton } from '@/shadcn/components/button'
import { Spinner } from '@/shadcn/components/spinner'
import { getSemanticColor } from '@/theme'
import { EnumSemanticColor, EnumVariant } from '@/type/enum'
import { cn } from '@/util'
import type * as types from './type'

export const Button = React.forwardRef<
  React.ElementRef<typeof ShadcnButton>,
  types.ConfigProp
>(
  (
    {
      semanticColor = EnumSemanticColor.DEFAULT,
      variant = EnumVariant.SOLID,
      type = 'button',
      loading,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const color = getSemanticColor(semanticColor, variant)

    return (
      <ShadcnButton
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          'whitespace-nowrap',
          variant !== EnumVariant.GHOST && 'border shadow-xs',
          color.bg,
          color.text,
          color.border,
          color.hoverBg,
          color.hoverText,
          color.focusRing,
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {loading && <Spinner data-icon="inline-start" />}
        {children}
      </ShadcnButton>
    )
  }
)

Button.displayName = 'Button'
