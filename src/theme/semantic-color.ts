import { EnumSemanticColor, EnumVariant } from '@/type/enum'

export type SemanticColorToken = {
  bg: string
  text: string
  border: string
  hoverBg: string
  hoverText: string
  focusRing: string
}

type ColorClassToken = {
  bg3: string
  bg4: string
  bg9: string
  bg10: string
  text11: string
  border7: string
  border9: string
  ring8: string
}

const createColor = (
  color: ColorClassToken,
  solidText = 'text-white'
): Record<EnumVariant, SemanticColorToken> => ({
  [EnumVariant.SOFT]: {
    bg: color.bg3,
    text: color.text11,
    border: color.border7,
    hoverBg: color.bg4,
    hoverText: '',
    focusRing: color.ring8,
  },

  [EnumVariant.SOLID]: {
    bg: color.bg9,
    text: solidText,
    border: color.border9,
    hoverBg: color.bg10,
    hoverText: '',
    focusRing: color.ring8,
  },

  [EnumVariant.OUTLINE]: {
    bg: 'bg-transparent',
    text: color.text11,
    border: color.border7,
    hoverBg: color.bg3,
    hoverText: '',
    focusRing: color.ring8,
  },

  [EnumVariant.GHOST]: {
    bg: 'bg-transparent',
    text: color.text11,
    border: 'border-transparent',
    hoverBg: color.bg3,
    hoverText: '',
    focusRing: color.ring8,
  },
})

const blue: ColorClassToken = {
  bg3: 'bg-[var(--blue-3)]',
  bg4: 'hover:bg-[var(--blue-4)]',
  bg9: 'bg-[var(--blue-9)]',
  bg10: 'hover:bg-[var(--blue-10)]',
  text11: 'text-[var(--blue-11)]',
  border7: 'border-[var(--blue-7)]',
  border9: 'border-[var(--blue-9)]',
  ring8: 'focus-visible:ring-[var(--blue-8)]',
}

const green: ColorClassToken = {
  bg3: 'bg-[var(--green-3)]',
  bg4: 'hover:bg-[var(--green-4)]',
  bg9: 'bg-[var(--green-9)]',
  bg10: 'hover:bg-[var(--green-10)]',
  text11: 'text-[var(--green-11)]',
  border7: 'border-[var(--green-7)]',
  border9: 'border-[var(--green-9)]',
  ring8: 'focus-visible:ring-[var(--green-8)]',
}

const amber: ColorClassToken = {
  bg3: 'bg-[var(--amber-3)]',
  bg4: 'hover:bg-[var(--amber-4)]',
  bg9: 'bg-[var(--amber-9)]',
  bg10: 'hover:bg-[var(--amber-10)]',
  text11: 'text-[var(--amber-11)]',
  border7: 'border-[var(--amber-7)]',
  border9: 'border-[var(--amber-9)]',
  ring8: 'focus-visible:ring-[var(--amber-8)]',
}

const red: ColorClassToken = {
  bg3: 'bg-[var(--red-3)]',
  bg4: 'hover:bg-[var(--red-4)]',
  bg9: 'bg-[var(--red-9)]',
  bg10: 'hover:bg-[var(--red-10)]',
  text11: 'text-[var(--red-11)]',
  border7: 'border-[var(--red-7)]',
  border9: 'border-[var(--red-9)]',
  ring8: 'focus-visible:ring-[var(--red-8)]',
}

const cyan: ColorClassToken = {
  bg3: 'bg-[var(--cyan-3)]',
  bg4: 'hover:bg-[var(--cyan-4)]',
  bg9: 'bg-[var(--cyan-9)]',
  bg10: 'hover:bg-[var(--cyan-10)]',
  text11: 'text-[var(--cyan-11)]',
  border7: 'border-[var(--cyan-7)]',
  border9: 'border-[var(--cyan-9)]',
  ring8: 'focus-visible:ring-[var(--cyan-8)]',
}

const slate: ColorClassToken = {
  bg3: 'bg-[var(--slate-3)]',
  bg4: 'hover:bg-[var(--slate-4)]',
  bg9: 'bg-[var(--slate-9)]',
  bg10: 'hover:bg-[var(--slate-10)]',
  text11: 'text-[var(--slate-11)]',
  border7: 'border-[var(--slate-7)]',
  border9: 'border-[var(--slate-9)]',
  ring8: 'focus-visible:ring-[var(--slate-8)]',
}

const semanticColorMap: Record<
  EnumSemanticColor,
  Record<EnumVariant, SemanticColorToken>
> = {
  [EnumSemanticColor.PRIMARY]: createColor(blue),
  [EnumSemanticColor.SUCCESS]: createColor(green),
  [EnumSemanticColor.WARNING]: createColor(amber, 'text-black'),
  [EnumSemanticColor.DANGER]: createColor(red),
  [EnumSemanticColor.INFO]: createColor(cyan, 'text-black'),
  [EnumSemanticColor.NEUTRAL]: createColor(slate),
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
    [EnumVariant.GHOST]: {
      bg: 'bg-transparent',
      text: 'text-[var(--slate-12)]',
      border: 'border-transparent',
      hoverBg: 'hover:bg-[var(--slate-3)]',
      hoverText: '',
      focusRing: 'focus-visible:ring-[var(--slate-8)]',
    },
  },
  [EnumSemanticColor.DEFAULT]: {
    [EnumVariant.SOFT]: {
      bg: 'bg-muted',
      text: 'text-foreground',
      border: 'border-border',
      hoverBg: 'hover:bg-muted/80',
      hoverText: '',
      focusRing: 'focus-visible:ring-ring',
    },
    [EnumVariant.SOLID]: {
      bg: 'bg-background',
      text: 'text-foreground',
      border: 'border-border',
      hoverBg: 'hover:bg-accent',
      hoverText: 'hover:text-accent-foreground',
      focusRing: 'focus-visible:ring-ring',
    },
    [EnumVariant.OUTLINE]: {
      bg: 'bg-background',
      text: 'text-foreground',
      border: 'border-input',
      hoverBg: 'hover:bg-accent',
      hoverText: 'hover:text-accent-foreground',
      focusRing: 'focus-visible:ring-ring',
    },
    [EnumVariant.GHOST]: {
      bg: 'bg-transparent',
      text: 'text-foreground',
      border: 'border-transparent',
      hoverBg: 'hover:bg-accent',
      hoverText: 'hover:text-accent-foreground',
      focusRing: 'focus-visible:ring-ring',
    },
  },
}

export const getSemanticColor = (
  semanticColor: EnumSemanticColor,
  variant: EnumVariant
): SemanticColorToken => {
  return semanticColorMap[semanticColor][variant]
}
