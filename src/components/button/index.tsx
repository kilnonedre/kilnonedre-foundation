import { Button as ShadcnButton } from '@/shadcn/components/button'
import { Spinner } from '@/shadcn/components/spinner'
import { EnumSemanticColor, EnumVariant } from '@/type/enum'
import { cn } from '@/util'
import type * as types from './types'

const colorMap = {
  PRIMARY: {
    [EnumVariant.SOFT]: 'bg-primary/10 text-primary hover:bg-primary/20',
    [EnumVariant.SOLID]: 'bg-primary text-white hover:bg-primary/90',
    [EnumVariant.OUTLINE]:
      'border border-primary text-primary bg-transparent hover:bg-primary/10',
  },
  SUCCESS: {
    [EnumVariant.SOFT]: 'bg-green-50 text-green-700 hover:bg-green-100',
    [EnumVariant.SOLID]: 'bg-green-500 text-white hover:bg-green-600',
    [EnumVariant.OUTLINE]:
      'border border-green-500 text-green-600 bg-transparent hover:bg-green-50',
  },
  WARNING: {
    [EnumVariant.SOFT]: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
    [EnumVariant.SOLID]: 'bg-yellow-500 text-white hover:bg-yellow-600',
    [EnumVariant.OUTLINE]:
      'border border-yellow-500 text-yellow-600 bg-transparent hover:bg-yellow-50',
  },
  DANGER: {
    [EnumVariant.SOFT]: 'bg-red-50 text-red-700 hover:bg-red-100',
    [EnumVariant.SOLID]: 'bg-red-500 text-white hover:bg-red-600',
    [EnumVariant.OUTLINE]:
      'border border-red-500 text-red-600 bg-transparent hover:bg-red-50',
  },
  INFO: {
    [EnumVariant.SOFT]: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
    [EnumVariant.SOLID]: 'bg-blue-500 text-white hover:bg-blue-600',
    [EnumVariant.OUTLINE]:
      'border border-blue-500 text-blue-600 bg-transparent hover:bg-blue-50',
  },
  NEUTRAL: {
    [EnumVariant.SOFT]: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    [EnumVariant.SOLID]: 'bg-gray-500 text-white hover:bg-gray-600',
    [EnumVariant.OUTLINE]:
      'border border-gray-400 text-gray-700 bg-transparent hover:bg-gray-100',
  },
  DARK: {
    [EnumVariant.SOFT]: 'bg-black/10 text-black hover:bg-black/20',
    [EnumVariant.SOLID]: 'bg-black text-white hover:bg-black/90',
    [EnumVariant.OUTLINE]:
      'border border-black text-black bg-transparent hover:bg-black/10',
  },
} as const

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
  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      size={size}
      disabled={disabled || loading}
      className={cn(
        'whitespace-nowrap',
        colorMap[semanticColor][variant],
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {loading && <Spinner data-icon="inline-start" />}
      {children}
    </ShadcnButton>
  )
}
