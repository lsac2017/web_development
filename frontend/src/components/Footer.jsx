import React from 'react';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS } from '../constants/colors';
import useMediaQuery from '../hooks/useMediaQuery';

const Footer = () => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);

  const footerStyle = {
    backgroundColor: COLORS.DARK_SERPENT,
    color: COLORS.WHITE,
    padding: isMobile ? `${SPACING.XXL} ${SPACING.LG} ${SPACING.LG}` : `${SPACING.XXXL} ${SPACING.XXL} ${SPACING.XXL}`,
    marginTop: 'auto',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: isMobile ? SPACING.XL : SPACING.XXL,
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.LG,
  };

  const titleStyle = {
    ...(isMobile ? TYPOGRAPHY.SUBHEADLINE_MOBILE : TYPOGRAPHY.SUBHEADLINE),
    color: COLORS.SAFFRON,
    marginBottom: SPACING.SM,
  };

  const textStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.SEA_SALT,
    lineHeight: '1.6',
  };

  const linkStyle = {
    ...textStyle,
    color: COLORS.WHITE,
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: SPACING.LG,
    marginTop: SPACING.LG,
  };

  const socialLinkStyle = {
    ...linkStyle,
    padding: SPACING.SM,
    backgroundColor: COLORS.CASTLETON_GREEN,
    borderRadius: '50%',
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: COLORS.SAFFRON,
      transform: 'translateY(-2px)',
    },
  };

  const copyrightStyle = {
    ...textStyle,
    textAlign: 'center',
    marginTop: SPACING.XXL,
    paddingTop: SPACING.XXL,
    borderTop: `1px solid ${COLORS.CASTLETON_GREEN}`,
    gridColumn: '1 / -1',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h3 style={titleStyle}>Lifewood</h3>
          <p style={textStyle}>
            Empowering innovation through cutting-edge technology solutions. 
            Join us in building the future with AI, machine learning, and advanced computing.
          </p>
          <div style={socialLinksStyle}>
            <a href="https://github.com/lsac2017" style={socialLinkStyle} title="LinkedIn">
              in
            </a>
            <a href="https://github.com/lsac2017" style={socialLinkStyle} title="Twitter">
              tw
            </a>
            <a href="https://github.com/lsac2017" style={socialLinkStyle} title="GitHub">
              gh
            </a>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={titleStyle}>Contact Info</h3>
          <div style={textStyle}>
            <p>📧 careers@lifewood.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 Silicon Valley, CA</p>
            <p>🌐 www.lifewood.com</p>
          </div>
        </div>

        <div style={sectionStyle}>
          <h3 style={titleStyle}>Quick Links</h3>
          <a href="/about" style={linkStyle}>About Us</a>
          <a href="/projects" style={linkStyle}>Our Projects</a>
          <a href="/register" style={linkStyle}>Apply Now</a>
          <a href="/login" style={linkStyle}>Admin Portal</a>
        </div>

        <div style={sectionStyle}>
          <h3 style={titleStyle}>Our Focus Areas</h3>
          <div style={textStyle}>
            <p>• Artificial Intelligence</p>
            <p>• Machine Learning</p>
            <p>• Computer Vision</p>
            <p>• Natural Language Processing</p>
            <p>• Autonomous Systems</p>
          </div>
        </div>

        <div style={copyrightStyle}>
          <p>© 2024 Lifewood. All rights reserved. | Designed for innovation and excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
