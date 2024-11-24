import { extendTheme } from '@chakra-ui/react'

export const DarkTheme = extendTheme({
  styles: {
    global: {
      body: {
        color: '#fafafa',
      },

      'button, input, textarea': {
        color: '#fafafa',
      },
    },
  },
  colors: {
    bg: '#09090b',
    fr: '#fafafa',
    card: '#09090b',
    cardFr: '#fafafa',
    popover: '#09090b',
    popoverFr: '#fafafa',
    primary: '#fafafa',
    primaryFr: '#18181b',
    secondary: '#27272a',
    secondaryFr: '#fafafa',
    muted: '#27272a',
    mutedFr: '#a1a1aa',
    accent: '#27272a',
    accentFr: '#fafafa',
    destructive: '#ed4545',
    destructiveFr: '#fafafa',
    border: '#27272a',
    input: '#27272a',
    ring: '#d4d4d8',
    sucess: '#1cd05e',
    sucess1: '#77dd77',
    skeleton: '#333',
    skeletonFr: '#5b5859',
  },
})
