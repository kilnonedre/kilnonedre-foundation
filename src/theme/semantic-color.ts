import { EnumSemanticColor, EnumVariant } from '@/type/enum'

export type SemanticColorToken = {
  bg: string
  text: string
  border: string
  hoverBg: string
  hoverText: string
  focusRing: string
}

const createColor = (
  color: string,
  solidText = 'text-white'
): Record<EnumVariant, SemanticColorToken> => ({
  [EnumVariant.SOFT]: {
    bg: `bg-[var(--${color}-3)]`,
    text: `text-[var(--${color}-11)]`,
    border: `border-[var(--${color}-7)]`,
    hoverBg: `hover:bg-[var(--${color}-4)]`,
    hoverText: '',
    focusRing: `focus-visible:ring-[var(--${color}-8)]`,
  },

  [EnumVariant.SOLID]: {
    bg: `bg-[var(--${color}-9)]`,
    text: solidText,
    border: `border-[var(--${color}-9)]`,
    hoverBg: `hover:bg-[var(--${color}-10)]`,
    hoverText: '',
    focusRing: `focus-visible:ring-[var(--${color}-8)]`,
  },

  [EnumVariant.OUTLINE]: {
    bg: 'bg-transparent',
    text: `text-[var(--${color}-11)]`,
    border: `border-[var(--${color}-7)]`,
    hoverBg: `hover:bg-[var(--${color}-3)]`,
    hoverText: '',
    focusRing: `focus-visible:ring-[var(--${color}-8)]`,
  },
})

const semanticColorMap: Record<
  EnumSemanticColor,
  Record<EnumVariant, SemanticColorToken>
> = {
  [EnumSemanticColor.PRIMARY]: createColor('blue'),
  [EnumSemanticColor.SUCCESS]: createColor('green'),
  [EnumSemanticColor.WARNING]: createColor('amber', 'text-black'),
  [EnumSemanticColor.DANGER]: createColor('red'),
  [EnumSemanticColor.INFO]: createColor('cyan', 'text-black'),
  [EnumSemanticColor.NEUTRAL]: createColor('slate'),
  [EnumSemanticColor.DARK]: {
    [EnumVariant.SOFT]: {
      bg: 'bg-[var(--slate-4)]',
      text: 'text-[var(--slate-12)]',
      border: 'border-[var(--slate-8)]',
      hoverBg: 'hover:bg-[var(--slate-5)]',
      hoverText: '',
      focusRing: 'focus-visible:ring-[var(--slate-8)]',
    },
    [EnumVariant.SOLID]: {
      bg: 'bg-[var(--slate-12)]',
      text: 'text-[var(--slate-1)]',
      border: 'border-[var(--slate-12)]',
      hoverBg: 'hover:bg-[var(--slate-11)]',
      hoverText: '',
      focusRing: 'focus-visible:ring-[var(--slate-8)]',
    },
    [EnumVariant.OUTLINE]: {
      bg: 'bg-transparent',
      text: 'text-[var(--slate-12)]',
      border: 'border-[var(--slate-8)]',
      hoverBg: 'hover:bg-[var(--slate-3)]',
      hoverText: '',
      focusRing: 'focus-visible:ring-[var(--slate-8)]',
    },
  },
}

export const getSemanticColor = (
  semanticColor: EnumSemanticColor,
  variant: EnumVariant
): SemanticColorToken => {
  return semanticColorMap[semanticColor][variant]
}
