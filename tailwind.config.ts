import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '1024px',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        '4xl': ['40px', { lineHeight: '48px', fontWeight: '500' }],
        '3xl-bold': ['32px', { lineHeight: '38px', fontWeight: '700' }],
        '3xl-semibold': ['32px', { lineHeight: '38px', fontWeight: '600' }],
        '2xl-bold': ['24px', { lineHeight: '28px', fontWeight: '700' }],
        '2xl-semibold': ['24px', { lineHeight: '28px', fontWeight: '600' }],
        '2xl-medium': ['24px', { lineHeight: '28px', fontWeight: '500' }],
        '2xl-regular': ['24px', { lineHeight: '28px', fontWeight: '400' }],
        'xl-bold': ['20px', { lineHeight: '24px', fontWeight: '700' }],
        'xl-semibold': ['20px', { lineHeight: '24px', fontWeight: '600' }],
        'xl-medium': ['20px', { lineHeight: '24px', fontWeight: '500' }],
        'xl-regular': ['20px', { lineHeight: '24px', fontWeight: '400' }],
        '2lg-bold': ['18px', { lineHeight: '21px', fontWeight: '700' }],
        '2lg-semibold': ['18px', { lineHeight: '21px', fontWeight: '600' }],
        '2lg-medium': ['18px', { lineHeight: '21px', fontWeight: '500' }],
        '2lg-regular': ['18px', { lineHeight: '21px', fontWeight: '400' }],
        'lg-bold': ['16px', { lineHeight: '19px', fontWeight: '700' }],
        'lg-semibold': ['16px', { lineHeight: '19px', fontWeight: '600' }],
        'lg-medium': ['16px', { lineHeight: '19px', fontWeight: '500' }],
        'lg-regular': ['16px', { lineHeight: '19px', fontWeight: '400' }],
        'md-bold': ['14px', { lineHeight: '17px', fontWeight: '700' }],
        'md-semibold': ['14px', { lineHeight: '17px', fontWeight: '600' }],
        'md-medium': ['14px', { lineHeight: '17px', fontWeight: '500' }],
        'md-regular': ['14px', { lineHeight: '17px', fontWeight: '400' }],
        'sm-semibold': ['13px', { lineHeight: '16px', fontWeight: '600' }],
        'xs-semibold': ['12px', { lineHeight: '14px', fontWeight: '600' }],
        'xs-medium': ['12px', { lineHeight: '14px', fontWeight: '500' }],
        'xs-regular': ['12px', { lineHeight: '14px', fontWeight: '400' }],
      },
      colors: {
        brand: {
          primary: '#10B981',
          secondary: '#34D399',
          tertiary: '#A3E635',
          gradient: 'linear-gradient(#10B981, #A3E635)',
        },
        point: {
          purple: '#A855F7',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          pink: '#EC4899',
          rose: '#F43F5E',
          orange: '#F97316',
          yellow: '#EAB308',
        },
        background: {
          primary: '#0F172A',
          secondary: '#1E293B',
          tertiary: '#334155',
          inverse: '#FFFFFF',
        },
        interaction: {
          inactive: '#94A3B8',
          hover: '#059669',
          pressed: '#047857',
          focus: '#10B981',
        },
        border: {
          primary: '#F8FAFC',
        },
        status: {
          danger: '#DC2626',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          tertiary: '#E2E8F0',
          default: '#64748B',
          inverse: '#FFFFFF',
          disabled: '#94A3B8',
        },
        icon: {
          primary: '#64748B',
          inverse: '#F8FAFC',
          brand: '#10B981',
        },
      },
    },
  },
  plugins: [],
};

export default config;
