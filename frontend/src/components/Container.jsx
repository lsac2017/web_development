import React from 'react';
import { SPACING, BREAKPOINTS } from '../constants/colors';
import useMediaQuery from '../hooks/useMediaQuery';

/**
 * Container component to enforce consistent page width and horizontal padding.
 * Defaults to 80% width centered, with a sensible max width for large screens.
 */
const Container = ({ children, style }) => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);
  const isTablet = useMediaQuery(`(max-width: ${BREAKPOINTS.TABLET})`);

  const baseStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${isMobile ? SPACING.MD : isTablet ? SPACING.LG : SPACING.XL}`,
  };

  return <div style={{ ...baseStyle, ...style }}>{children}</div>;
};

export default Container;
