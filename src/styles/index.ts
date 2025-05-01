import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                fr: { value: '#fff' },
                red: { value: '#E3646E' },
                purple: { value: '#BB72E9' },
                blue: { value: '#3996DB' },
                green: { value: '#00af9c' },
                yellow: { value: '#EABD5F' },
                gray: {
                    100: { value: '#E2E4E9' },
                    200: { value: '#C0C4CE' },
                    300: { value: '#878EA1' },
                    400: { value: '#393e43' },
                    500: { value: '#292C34' },
                    600: { value: '#16181D' },
                    700: { value: '#0D0E11' },
                },
            },
            
            fonts: {
                roboto: { value: 'Roboto' },
            },
    
            fontSizes: {
                sm: { value: '0.875rem' },
                normal: { value: '1rem' },
                md: { value: '1.125rem' },
                lg: { value: '1.25rem' },
                xl: { value: '1.5rem' },
                '2xl': { value: '3.5rem' },
            },
        },
    }
})

export const system = createSystem(defaultConfig, config)