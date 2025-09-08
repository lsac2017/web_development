import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS } from '../constants/colors';
import Container from '../components/Container';
import useMediaQuery from '../hooks/useMediaQuery';

const Home = () => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);
  const isTablet = useMediaQuery(`(max-width: ${BREAKPOINTS.TABLET})`);
  const headerHeight = isMobile ? 48 : 64; // must match Header.jsx

  const heroStyle = {
    background: `linear-gradient(135deg, ${COLORS.PAPER} 0%, #ffffff 60%)`,
    textAlign: 'center',
    minHeight: 'auto',
    display: 'block',
    padding: 0,
  };

  const heroVideoWrapperStyle = {
    position: 'relative',
    width: '100%',
    // Make hero area shorter on small screens to keep CTA above the fold
    height: isMobile
      ? `calc(70vh - ${headerHeight}px)`
      : isTablet
      ? `calc(85vh - ${headerHeight}px)`
      : `calc(100vh - ${headerHeight}px)`,
    borderRadius: '0',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.12)'
  };

  const heroVideoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  };

  const heroOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.45) 100%)',
    zIndex: 1,
  };

  const titleStyle = {
    ...(isMobile ? TYPOGRAPHY.DISPLAY_MOBILE : TYPOGRAPHY.DISPLAY),
    color: COLORS.DARK_SERPENT,
    marginBottom: isMobile ? SPACING.LG : SPACING.XL,
    textAlign: 'center',
  };

  // Subtitle and description styles were unused; removed to keep code tidy

  const ctaButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.DARK_SERPENT,
    padding: `${isMobile ? SPACING.MD : SPACING.LG} ${isMobile ? SPACING.XL : SPACING.XXL}`,
    border: 'none',
    borderRadius: '12px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    marginBottom: isMobile ? SPACING.SM : SPACING.MD,
    boxShadow: '0 4px 12px rgba(255, 179, 71, 0.3)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(255, 179, 71, 0.4)',
    },
  };

  const secondaryButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: 'rgba(4, 98, 65, 0.12)',
    color: COLORS.CASTLETON_GREEN,
    padding: `${isMobile ? SPACING.MD : SPACING.LG} ${isMobile ? SPACING.XL : SPACING.XXL}`,
    border: `2px solid ${COLORS.CASTLETON_GREEN}`,
    borderRadius: '12px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    marginBottom: isMobile ? SPACING.SM : SPACING.MD,
  };

  const featuresStyle = {
    backgroundColor: COLORS.WHITE,
    padding: `${isMobile ? SPACING.XXL : SPACING.SECTION} ${isMobile ? SPACING.MD : SPACING.XL}`,
  };

  const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
    gap: isMobile ? SPACING.XL : SPACING.XXL,
    maxWidth: '1200px',
    margin: '0 auto',
    alignItems: 'stretch',
  };

  const featureCardStyle = {
    backgroundColor: COLORS.SEA_SALT,
    padding: isMobile ? SPACING.XL : SPACING.XXL,
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(4, 98, 65, 0.1)',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
    },
  };

  const featureIconStyle = {
    fontSize: isMobile ? '2.5rem' : isTablet ? '3.25rem' : '4rem',
    marginBottom: isMobile ? SPACING.MD : SPACING.LG,
    display: 'block',
  };

  const featureTitleStyle = {
    ...TYPOGRAPHY.SUBHEADLINE,
    color: COLORS.DARK_SERPENT,
    marginBottom: SPACING.MD,
  };

  const featureDescStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.DARK_SERPENT,
  };

  const statsStyle = {
    backgroundColor: COLORS.CASTLETON_GREEN,
    color: COLORS.WHITE,
    padding: `${isMobile ? SPACING.XXL : SPACING.SECTION} ${isMobile ? SPACING.MD : SPACING.XL}`,
    textAlign: 'center',
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: isMobile ? SPACING.LG : SPACING.XXL,
    maxWidth: '1000px',
    margin: `${SPACING.XXL} auto 0`,
  };

  const statItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const statNumberStyle = {
    ...TYPOGRAPHY.DISPLAY,
    fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
    color: COLORS.SAFFRON,
    marginBottom: SPACING.SM,
  };

  const ctaButtonsRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: isMobile ? SPACING.SM : SPACING.MD,
    justifyContent: 'center',
    alignItems: 'center',
  };

  const statLabelStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.WHITE,
  };

  // Count-up animation utilities
  const useInView = (options = { threshold: 0.2 }) => {
    const { threshold } = options;
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold });
      observer.observe(el);
      return () => observer.disconnect();
    }, [threshold]);
    return { ref, inView };
  };

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const formatNumber = (value, { suffix = '', abbreviate = false, showPlus = false, isPercent = false } = {}) => {
    let display = value;
    if (abbreviate) {
      if (value >= 1000000) {
        display = Math.round(value / 1000000);
        suffix = 'M' + (showPlus ? '+' : '');
      } else if (value >= 1000) {
        display = Math.round(value / 1000);
        suffix = 'K' + (showPlus ? '+' : '');
      } else {
        suffix = (showPlus ? '+' : '') + suffix;
      }
    } else if (isPercent) {
      suffix = '%';
    } else if (showPlus) {
      suffix = '+' + suffix;
    }
    return `${display}${suffix}`;
  };

  const Stat = ({ target, duration = 1500, label, options = {} }) => {
    const { ref, inView } = useInView();
    const [value, setValue] = useState(0);

    useEffect(() => {
      if (!inView) return;
      let raf; const start = performance.now();
      const animate = (ts) => {
        const elapsed = ts - start;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(t);
        const current = Math.round(target * eased);
        setValue(current);
        if (t < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, [inView, duration, target]);

    return (
      <div style={statItemStyle} ref={ref}>
        <span style={statNumberStyle}>
          {formatNumber(value, options)}
        </span>
        <span style={statLabelStyle}>{label}</span>
      </div>
    );
  };

  return (
    <div style={{ paddingTop: headerHeight, marginTop: 0 }}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={heroVideoWrapperStyle}>
          <video
            style={heroVideoStyle}
            src="/videos/Home.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Lifewood hero background video"
          />
          <div style={heroOverlayStyle} />
          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container style={{ padding: 0 }}>
              <h1 style={{ ...titleStyle, color: COLORS.WHITE }}>Welcome to Lifewood</h1>
              <div style={ctaButtonsRowStyle}>
                <Link to="/register" style={ctaButtonStyle}>
                  Apply now
                </Link>
                <Link to="/projects" style={secondaryButtonStyle}>
                  View projects
                </Link>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={featuresStyle}>
        <Container style={{ padding: 0 }}>
          <h2 style={{
            ...(isMobile ? TYPOGRAPHY.HEADLINE_MOBILE : TYPOGRAPHY.HEADLINE),
            textAlign: 'center',
            marginBottom: SPACING.XXXL,
            color: COLORS.DARK_SERPENT,
          }}>
            Why choose Lifewood?
          </h2>
          <div style={featuresGridStyle}>
            <div style={featureCardStyle}>
              <span style={{...featureIconStyle, color: COLORS.CASTLETON_GREEN}}>🌱</span>
              <h3 style={featureTitleStyle}>Sustainable innovation</h3>
              <p style={featureDescStyle}>
                We develop eco-friendly technology solutions that prioritize environmental sustainability 
                while delivering cutting-edge performance.
              </p>
            </div>
            <div style={featureCardStyle}>
              <span style={{...featureIconStyle, color: COLORS.SAFFRON}}>🚀</span>
              <h3 style={featureTitleStyle}>Future-ready solutions</h3>
              <p style={featureDescStyle}>
                Our projects leverage the latest technologies to create solutions that are built for 
                tomorrow's challenges and opportunities.
              </p>
            </div>
            <div style={featureCardStyle}>
              <span style={{...featureIconStyle, color: COLORS.CASTLETON_GREEN}}>🤝</span>
              <h3 style={featureTitleStyle}>Community impact</h3>
              <p style={featureDescStyle}>
                Every project we undertake is designed to create positive change and meaningful 
                impact in communities around the world.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section style={statsStyle}>
        <Container style={{ padding: 0 }}>
          <h2 style={{
            ...(isMobile ? TYPOGRAPHY.HEADLINE_MOBILE : TYPOGRAPHY.HEADLINE),
            textAlign: 'center',
            marginBottom: SPACING.MD,
            color: COLORS.WHITE,
          }}>
            Our impact in numbers
          </h2>
          <div style={statsGridStyle}>
            <Stat target={50} label="Projects completed" options={{ showPlus: true }} />
            <Stat target={25} label="Countries reached" options={{ showPlus: true }} />
            <Stat target={100000} label="Lives impacted" options={{ abbreviate: true, showPlus: true }} />
            <Stat target={95} label="Client satisfaction" options={{ isPercent: true }} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: COLORS.PAPER,
        padding: `${isMobile ? SPACING.XXL : SPACING.SECTION} ${isMobile ? SPACING.MD : SPACING.XL}`,
        textAlign: 'center',
      }}>
        <Container style={{ padding: 0 }}>
          <h2 style={{
            ...(isMobile ? TYPOGRAPHY.HEADLINE_MOBILE : TYPOGRAPHY.HEADLINE),
            color: COLORS.DARK_SERPENT,
            marginBottom: SPACING.LG,
          }}>
            Ready to shape the future?
          </h2>
          <p style={{
            ...TYPOGRAPHY.BODY_LARGE,
            color: COLORS.DARK_SERPENT,
            marginBottom: isMobile ? SPACING.XL : SPACING.XXL,
            maxWidth: '700px',
            margin: `0 auto ${SPACING.XXL}`,
          }}>
            Join our team of innovators and help us create technology solutions that make a real difference in the world.
          </p>
          <Link to="/register" style={{
            ...ctaButtonStyle,
            marginRight: '0',
            padding: `${isMobile ? SPACING.MD : SPACING.LG} ${isMobile ? SPACING.XXL : SPACING.XXXL}`,
          }}>
            Start your journey
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default Home;
