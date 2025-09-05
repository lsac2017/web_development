import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS } from '../constants/colors';
import Container from '../components/Container';
import useMediaQuery from '../hooks/useMediaQuery';

const About = () => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const heroStyle = {
    // Video background container
    position: 'relative',
    overflow: 'hidden',
    padding: isMobile ? `${SPACING.XXL} ${SPACING.LG}` : `${SPACING.SECTION} ${SPACING.XL}`,
    textAlign: 'center',
    minHeight: isMobile ? '60vh' : '65vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // subtle gradient overlay for readability
    background: 'linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.35) 35%, rgba(0,0,0,0.30) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  };

  const soundToggleStyle = {
    position: 'absolute',
    right: SPACING.XL,
    bottom: SPACING.XL,
    zIndex: 2,
    ...TYPOGRAPHY.CAPTION,
    padding: `${SPACING.XS} ${SPACING.MD}`,
    borderRadius: '999px',
    border: 'none',
    backgroundColor: 'rgba(255,255,255,0.85)',
    color: COLORS.DARK_SERPENT,
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    transition: 'background-color 0.2s ease',
  };

  const titleStyle = {
    ...(isMobile ? TYPOGRAPHY.DISPLAY_MOBILE : TYPOGRAPHY.DISPLAY),
    color: COLORS.WHITE,
    marginBottom: SPACING.XL,
  };

  const subtitleStyle = {
    ...TYPOGRAPHY.BODY_LARGE,
    color: COLORS.WHITE,
    maxWidth: '900px',
    margin: '0 auto',
  };

  const sectionStyle = {
    padding: `${SPACING.SECTION} ${SPACING.XL}`,
    backgroundColor: COLORS.WHITE,
  };

  const cardStyle = {
    backgroundColor: COLORS.SEA_SALT,
    padding: SPACING.XXL,
    borderRadius: '16px',
    marginBottom: SPACING.XL,
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(4, 98, 65, 0.1)',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
    },
  };

  const cardTitleStyle = {
    ...TYPOGRAPHY.SUBHEADLINE,
    color: COLORS.CASTLETON_GREEN,
    marginBottom: SPACING.MD,
  };

  const cardTextStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.DARK_SERPENT,
  };

  const valuesGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: isMobile ? SPACING.XL : SPACING.XXL,
    marginTop: SPACING.XXL,
  };

  const valueCardStyle = {
    backgroundColor: COLORS.PAPER,
    padding: SPACING.XXL,
    borderRadius: '16px',
    textAlign: 'center',
    border: `2px solid ${COLORS.CASTLETON_GREEN}`,
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px rgba(4, 98, 65, 0.15)',
    },
  };

  const valueIconStyle = {
    fontSize: '4rem',
    marginBottom: SPACING.LG,
    display: 'block',
  };

  const valueTitleStyle = {
    ...TYPOGRAPHY.SUBHEADLINE,
    color: COLORS.DARK_SERPENT,
    marginBottom: SPACING.MD,
  };

  const valueDescStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.DARK_SERPENT,
  };

  const sectionTitleStyle = {
    ...(isMobile ? TYPOGRAPHY.HEADLINE_MOBILE : TYPOGRAPHY.HEADLINE),
    color: COLORS.DARK_SERPENT,
    textAlign: 'center',
    marginBottom: SPACING.XXXL,
  };

  const impactStyle = {
    backgroundColor: COLORS.CASTLETON_GREEN,
    color: COLORS.WHITE,
    padding: `${SPACING.SECTION} ${SPACING.XL}`,
    textAlign: 'center',
  };

  const impactTitleStyle = {
    ...(isMobile ? TYPOGRAPHY.HEADLINE_MOBILE : TYPOGRAPHY.HEADLINE),
    color: COLORS.WHITE,
    marginBottom: SPACING.XL,
  };

  const impactTextStyle = {
    ...TYPOGRAPHY.BODY_LARGE,
    color: COLORS.WHITE,
    maxWidth: '1000px',
    margin: `0 auto ${SPACING.XXL}`,
  };

  const ctaButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.DARK_SERPENT,
    padding: `${SPACING.MD} ${SPACING.XXL}`,
    border: 'none',
    borderRadius: '12px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    boxShadow: '0 4px 12px rgba(255, 179, 71, 0.3)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(255, 179, 71, 0.4)',
    },
  };

  const impactStatsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: isMobile ? SPACING.XL : SPACING.XXL,
    marginTop: SPACING.XXL,
    textAlign: 'center',
  };

  const statNumberStyle = {
    ...TYPOGRAPHY.DISPLAY,
    fontSize: isMobile ? '2.5rem' : '3rem',
    color: COLORS.SAFFRON,
    marginBottom: SPACING.SM,
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        <video
          ref={videoRef}
          style={videoStyle}
          src="/videos/About.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
        />
        <div style={overlayStyle} />
        <Container style={{ padding: 0, position: 'relative', zIndex: 2 }}>
          <h1 style={titleStyle}>About Lifewood</h1>
          <p style={subtitleStyle}>
            Pioneering the future through innovation
          </p>
        </Container>
        <button
          type="button"
          aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
          onClick={() => {
            const next = !isMuted;
            setIsMuted(next);
            if (videoRef.current) {
              videoRef.current.muted = next;
              if (!next) {
                // Attempt to ensure playback after unmuting
                videoRef.current.play().catch(() => {});
              }
            }
          }}
          style={soundToggleStyle}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </section>

      {/* Mission Section */}
      <section style={sectionStyle}>
        <Container style={{ padding: 0 }}>
          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Our mission</h2>
            <p style={cardTextStyle}>
              At Lifewood, we believe technology should enhance human potential and create meaningful 
              solutions for tomorrow's challenges. Our mission is to develop cutting-edge artificial 
              intelligence and machine learning technologies that drive innovation across industries 
              while maintaining ethical standards and social responsibility.
            </p>
            <p style={cardTextStyle}>
              We are committed to creating sustainable, scalable solutions that not only advance 
              technological capabilities but also contribute positively to society and the environment. 
              Through collaboration, innovation, and dedication to excellence, we strive to be at the 
              forefront of the technological revolution.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision Section */}
      <section style={{...sectionStyle, backgroundColor: COLORS.SEA_SALT}}>
        <Container style={{ padding: 0 }}>
          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Our vision</h2>
            <p style={cardTextStyle}>
              To be the leading force in technological innovation, creating solutions that transform 
              industries and improve lives worldwide. We envision a world where artificial intelligence 
              and human intelligence work together seamlessly to solve the most pressing challenges 
              of our time.
            </p>
            <p style={cardTextStyle}>
              Our vision extends beyond just developing technology – we aim to cultivate a community 
              of brilliant minds who share our passion for innovation, ethical development, and 
              making a positive impact on society through technological advancement.
            </p>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section style={sectionStyle}>
        <Container style={{ padding: 0 }}>
          <h2 style={sectionTitleStyle}>Our core values</h2>
          <div style={valuesGridStyle}>
            <div style={valueCardStyle}>
              <span style={{...valueIconStyle, color: COLORS.SAFFRON}}>🎯</span>
              <h3 style={valueTitleStyle}>Excellence</h3>
              <p style={valueDescStyle}>
                We strive for excellence in everything we do, from code quality to client 
                relationships, ensuring our solutions exceed expectations.
              </p>
            </div>
            <div style={valueCardStyle}>
              <span style={{...valueIconStyle, color: COLORS.CASTLETON_GREEN}}>🤝</span>
              <h3 style={valueTitleStyle}>Collaboration</h3>
              <p style={valueDescStyle}>
                We believe the best solutions emerge from diverse perspectives working together 
                towards common goals.
              </p>
            </div>
            <div style={valueCardStyle}>
              <span style={{...valueIconStyle, color: COLORS.EARTH_YELLOW}}>🔬</span>
              <h3 style={valueTitleStyle}>Innovation</h3>
              <p style={valueDescStyle}>
                We continuously push boundaries, exploring new technologies and methodologies 
                to stay at the forefront of our field.
              </p>
            </div>
            <div style={valueCardStyle}>
              <span style={{...valueIconStyle, color: COLORS.SAFFRON}}>⚖️</span>
              <h3 style={valueTitleStyle}>Ethics</h3>
              <p style={valueDescStyle}>
                We develop technology responsibly, considering the ethical implications and 
                societal impact of our innovations.
              </p>
            </div>
            <div style={valueCardStyle}>
              <span style={{...valueIconStyle, color: COLORS.CASTLETON_GREEN}}>🌱</span>
              <h3 style={valueTitleStyle}>Growth</h3>
              <p style={valueDescStyle}>
                We foster continuous learning and professional development, helping our team 
                members reach their full potential.
              </p>
            </div>
            <div style={valueCardStyle}>
              <span style={{...valueIconStyle, color: COLORS.EARTH_YELLOW}}>🌍</span>
              <h3 style={valueTitleStyle}>Impact</h3>
              <p style={valueDescStyle}>
                We measure success not just by profits, but by the positive impact our 
                solutions have on communities worldwide.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Global Contribution Section */}
      <section style={impactStyle}>
        <Container style={{ padding: 0 }}>
          <h2 style={impactTitleStyle}>Our global contribution</h2>
          <p style={impactTextStyle}>
            Lifewood's impact extends across continents, with our technologies being implemented 
            in over 25 countries. We've contributed to breakthrough research in artificial 
            intelligence, supported educational initiatives in underserved communities, and 
            partnered with organizations to address global challenges through technology.
          </p>
          <div style={impactStatsGridStyle}>
            <div>
              <h3 style={statNumberStyle}>25+</h3>
              <p style={{...TYPOGRAPHY.BODY, color: COLORS.WHITE}}>Countries served</p>
            </div>
            <div>
              <h3 style={statNumberStyle}>1M+</h3>
              <p style={{...TYPOGRAPHY.BODY, color: COLORS.WHITE}}>Lives impacted</p>
            </div>
            <div>
              <h3 style={statNumberStyle}>100+</h3>
              <p style={{...TYPOGRAPHY.BODY, color: COLORS.WHITE}}>Research papers</p>
            </div>
            <div>
              <h3 style={statNumberStyle}>50+</h3>
              <p style={{...TYPOGRAPHY.BODY, color: COLORS.WHITE}}>Open source projects</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: COLORS.PAPER,
        padding: `${SPACING.SECTION} ${SPACING.XL}`,
        textAlign: 'center',
      }}>
        <Container style={{ padding: 0 }}>
          <h2 style={{
            ...(isMobile ? TYPOGRAPHY.HEADLINE_MOBILE : TYPOGRAPHY.HEADLINE),
            marginBottom: SPACING.LG,
            color: COLORS.DARK_SERPENT,
          }}>
            Join our mission
          </h2>
          <p style={{
            ...TYPOGRAPHY.BODY_LARGE,
            marginBottom: SPACING.XXL,
            color: COLORS.DARK_SERPENT,
            maxWidth: '700px',
            margin: `0 auto ${SPACING.XXL}`,
          }}>
            Be part of a team that's shaping the future of technology. Your skills and passion 
            can help us create solutions that matter.
          </p>
          <Link to="/register" style={ctaButtonStyle}>
            Apply to join us
          </Link>
        </Container>
      </section>
    </div>
  );
};

export default About;
