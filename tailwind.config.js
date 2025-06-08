/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#D87D4A',  // Orange/Copper
          light: '#FBAF85',    // Light Orange (hover)
        },
        secondary: '#101010',   // Almost Black
        dark: {
          DEFAULT: '#000000',   // Pure Black
          light: '#191919',     // Slightly lighter black for backgrounds
        },
        white: '#FFFFFF',       // Pure White
        gray: {
          light: '#F1F1F1',    // Light Gray
          cream: '#FAFAFA',    // Very Light Gray
        },
        // Utility colors
        border: '#CFCFCF',      // Form borders
        error: '#CD2C2C',       // Error state
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        // Heading sizes
        h1: ['56px', {
          lineHeight: '58px',
          letterSpacing: '2px',
          fontWeight: '700',
        }],
        h2: ['40px', {
          lineHeight: '44px',
          letterSpacing: '1.5px',
          fontWeight: '700',
        }],
        h3: ['32px', {
          lineHeight: '36px',
          letterSpacing: '1.15px',
          fontWeight: '700',
        }],
        h4: ['28px', {
          lineHeight: '38px',
          letterSpacing: '2px',
          fontWeight: '700',
        }],
        h5: ['24px', {
          lineHeight: '33px',
          letterSpacing: '1.7px',
          fontWeight: '700',
        }],
        h6: ['18px', {
          lineHeight: '24px',
          letterSpacing: '1.3px',
          fontWeight: '700',
        }],
        // Body & special text
        body: ['15px', {
          lineHeight: '25px',
          fontWeight: '500',
        }],
        overline: ['14px', {
          lineHeight: '19px',
          letterSpacing: '10px',
          fontWeight: '400',
        }],
        subtitle: ['13px', {
          lineHeight: '25px',
          letterSpacing: '1px',
          fontWeight: '700',
        }],
        nav: ['13px', {
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: '700',
        }],
      },
      spacing: {
        'section': '120px',     // Section padding
        'container': '165px',   // Container padding
      },
      container: {
        center: true,
        padding: '24px',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1110px',         // Custom max-width from design
        },
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      opacity: {
        '15': '0.15',
      },
    },
  },
  plugins: [],
};
