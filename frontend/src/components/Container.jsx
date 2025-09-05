import React from 'react';
import { SPACING } from '../constants/colors';

/**
 * Container component to enforce consistent page width and horizontal padding.
 * Defaults to 80% width centered, with a sensible max width for large screens.
 */
const Container = ({ children, style }) => {
  const baseStyle = {
    width: '80%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${SPACING.XL}`,
  };

  return <div style={{ ...baseStyle, ...style }}>{children}</div>;
};

export default Container;
