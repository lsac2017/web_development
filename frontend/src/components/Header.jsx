import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS } from '../constants/colors';
import useMediaQuery from '../hooks/useMediaQuery';

const Header = () => {
  const location = useLocation();
  const isAdmin = localStorage.getItem('adminToken');
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);
  const [menuOpen, setMenuOpen] = useState(false);

  const headerStyle = {
    backgroundColor: COLORS.WHITE,
    padding: isMobile ? `${SPACING.SM} ${SPACING.MD}` : `${SPACING.MD} ${SPACING.XL}`,
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    height: '35px',
    // Responsive stacking on mobile to avoid overflow
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? SPACING.SM : 0,
  };
  

  const logoStyle = {
    ...(isMobile ? TYPOGRAPHY.HEADLINE_MOBILE : TYPOGRAPHY.HEADLINE),
    color: COLORS.CASTLETON_GREEN,
    textDecoration: 'none',
    fontWeight: '700',
  };

  const navStyle = {
    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
    gap: isMobile ? SPACING.SM : SPACING.LG,
    alignItems: 'stretch',
    flexDirection: isMobile ? 'column' : 'row',
    flexWrap: 'nowrap',
    justifyContent: isMobile ? 'flex-start' : 'flex-end',
    width: isMobile ? '100%' : 'auto',
    backgroundColor: isMobile ? COLORS.WHITE : 'transparent',
    border: isMobile ? `1px solid rgba(4, 98, 65, 0.08)` : 'none',
    borderRadius: isMobile ? '10px' : '0',
    padding: isMobile ? SPACING.MD : 0,
  };

  const linkStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.DARK_SERPENT,
    textDecoration: 'none',
    padding: `${SPACING.XS} ${SPACING.MD}`,
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    ':hover': {
      backgroundColor: COLORS.SEA_SALT,
    },
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: COLORS.CASTLETON_GREEN,
    color: COLORS.WHITE,
  };

  const ctaButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.DARK_SERPENT,
    padding: isMobile ? `${SPACING.XS} ${SPACING.MD}` : `${SPACING.SM} ${SPACING.LG}`,
    border: 'none',
    borderRadius: '10px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 6px rgba(255, 179, 71, 0.18)',
    ':hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 10px rgba(255, 179, 71, 0.28)',
    },
  };

  const burgerButtonStyle = {
    display: isMobile ? 'inline-flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
    border: `1px solid ${COLORS.LIGHT_GRAY}`,
    backgroundColor: COLORS.WHITE,
    cursor: 'pointer',
  };

  // mobileMenuStyle merged into navStyle via isMobile

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <img 
            src="/Lifewood_Logo.png" 
            alt="Lifewood Logo" 
            style={{ height: isMobile ? '56px' : '80px', objectFit: 'contain' }} 
          />
        </Link>
        
        <button
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={burgerButtonStyle}
        >
          {/* Simple burger icon */}
          <span style={{
            display: 'block',
            width: 18,
            height: 2,
            backgroundColor: COLORS.DARK_SERPENT,
            boxShadow: `0 6px 0 ${COLORS.DARK_SERPENT}, 0 -6px 0 ${COLORS.DARK_SERPENT}`,
          }} />
        </button>

        <nav style={navStyle}>
          <Link 
            to="/" 
            style={location.pathname === '/' ? activeLinkStyle : linkStyle}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={location.pathname === '/about' ? activeLinkStyle : linkStyle}
          >
            About Us
          </Link>
          <Link 
            to="/projects" 
            style={location.pathname === '/projects' ? activeLinkStyle : linkStyle}
          >
            Projects
          </Link>
          
          {!isAdmin ? (
            <>
              <Link 
                to="/register" 
                style={{
                  ...ctaButtonStyle,
                  ...(location.pathname === '/register' ? {backgroundColor: COLORS.EARTH_YELLOW} : {})
                }}
              >
                Apply/Register
              </Link>
              <Link 
                to="/login" 
                style={location.pathname === '/login' ? activeLinkStyle : linkStyle}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/admin/dashboard" 
                style={location.pathname === '/admin/dashboard' ? activeLinkStyle : linkStyle}
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                style={{
                  ...linkStyle,
                  backgroundColor: 'transparent',
                  border: `1px solid ${COLORS.DARK_SERPENT}`,
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
