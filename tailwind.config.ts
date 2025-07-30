import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        code: ['"Source Code Pro"', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'smooth-slide-in-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'smooth-slide-out-bottom': {
            from: { transform: 'translateY(0)' },
            to: { transform: 'translateY(100%)' },
        },
        'slide-in-top': {
            from: { transform: 'translateY(-100%)' },
            to: { transform: 'translateY(0)' },
        },
        'slide-out-top': {
            from: { transform: 'translateY(0)' },
            to: { transform: 'translateY(-100%)' },
        },
        'slide-in-left': {
            from: { transform: 'translateX(-100%)' },
            to: { transform: 'translateX(0)' },
        },
        'slide-out-left': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-100%)' },
        },
        'slide-in-right': {
            from: { transform: 'translateX(100%)' },
            to: { transform: 'translateX(0)' },
        },
        'slide-out-right': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 1s ease-in-out forwards',
        'smooth-slide-in-bottom': 'smooth-slide-in-bottom 0.7s cubic-bezier(0.32, 1, 0.45, 1) forwards',
        'smooth-slide-out-bottom': 'smooth-slide-out-bottom 0.5s cubic-bezier(0.55, 0, 0.68, 0) forwards',
        'slide-in-top': 'slide-in-top 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-out-top': 'slide-out-top 0.5s cubic-bezier(0.5, 0, 0.75, 0) forwards',
        'slide-in-left': 'slide-in-left 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-out-left': 'slide-out-left 0.5s cubic-bezier(0.5, 0, 0.75, 0) forwards',
        'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-out-right': 'slide-out-right 0.5s cubic-bezier(0.5, 0, 0.75, 0) forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
