// Lifewood Brand Colors
export const COLORS = {
  // Primary Colors
  PAPER: '#F5EEDB',           // Backgrounds
  WHITE: '#FFFFFF',           // Neutral sections
  SEA_SALT: '#F9F7F7',        // Light backgrounds
  DARK_SERPENT: '#133020',    // Primary text color
  CASTLETON_GREEN: '#046241', // Highlights, buttons, accents
  SAFFRON: '#FFB347',         // CTA highlights like Apply/Register button
  EARTH_YELLOW: '#FFC370',    // Secondary highlights
  
  // Additional utility colors
  ERROR: '#dc3545',
  SUCCESS: '#28a745',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
  LIGHT_GRAY: '#f8f9fa',
  DARK_GRAY: '#6c757d',
};

export const TYPOGRAPHY = {
  // Display - Largest text for main titles
  DISPLAY: {
    fontSize: '4rem',
    fontWeight: '700',
    letterSpacing: '0.02em',
    lineHeight: '1.1',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  DISPLAY_MOBILE: {
    fontSize: '2.5rem',
    fontWeight: '700',
    letterSpacing: '0.02em',
    lineHeight: '1.1',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  // Headlines - Section titles (2x body size)
  HEADLINE: {
    fontSize: '2rem',
    fontWeight: '600',
    letterSpacing: '0.01em',
    lineHeight: '1.2',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  HEADLINE_MOBILE: {
    fontSize: '1.5rem',
    fontWeight: '600',
    letterSpacing: '0.01em',
    lineHeight: '1.2',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  // Subheadlines - Smaller section titles
  SUBHEADLINE: {
    fontSize: '1.5rem',
    fontWeight: '600',
    letterSpacing: '0.01em',
    lineHeight: '1.3',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  // Body - Main content text (1x size)
  BODY: {
    fontSize: '1rem',
    fontWeight: '400',
    letterSpacing: '0.005em',
    lineHeight: '1.6',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  // Body Large - Emphasized body text
  BODY_LARGE: {
    fontSize: '1.125rem',
    fontWeight: '400',
    letterSpacing: '0.005em',
    lineHeight: '1.6',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  // Caption - Small text
  CAPTION: {
    fontSize: '0.875rem',
    fontWeight: '400',
    letterSpacing: '0.01em',
    lineHeight: '1.4',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  
  // Button text
  BUTTON: {
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.01em',
    lineHeight: '1',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    textTransform: 'none',
  },
};

// Spacing system based on 8px grid
export const SPACING = {
  XS: '0.25rem',    // 4px
  SM: '0.5rem',     // 8px
  MD: '1rem',       // 16px
  LG: '1.5rem',     // 24px
  XL: '2rem',       // 32px
  XXL: '3rem',      // 48px
  XXXL: '4rem',     // 64px
  SECTION: '5rem',  // 80px
};

// Responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: '768px',
  TABLET: '1024px',
  DESKTOP: '1200px',
};
