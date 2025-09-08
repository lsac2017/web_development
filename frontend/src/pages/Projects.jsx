"use client"

import { useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS } from "../constants/colors"
import { LABELS } from "../constants/text"
import Container from "../components/Container"
import useMediaQuery from "../hooks/useMediaQuery"

const Projects = () => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`)
  const isTablet = useMediaQuery(`(max-width: ${BREAKPOINTS.TABLET})`)
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

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
  }

  const heroStyle = {
    background: COLORS.SEA_SALT,
    padding: 0, // full bleed
  }

  // Split layout: 70% video (left), 30% text (right)
  const heroInnerStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '70% 30%',
    gap: 0, // no space between video and text
    alignItems: 'stretch',
    minHeight: isMobile ? '70vh' : isTablet ? '80vh' : '90vh',
  }

  const heroVideoWrapStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0, // sharp edges
  }

  const heroVideoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }

  const heroTextStyle = {
    backgroundColor: COLORS.WHITE,
    borderRadius: 0, // sharp edges
    padding: isMobile ? SPACING.LG : SPACING.XL,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: isMobile ? 'center' : 'left',
  }

  // Hardcoded projects to avoid 403 fetch errors and duplicates
  const projects = useMemo(() => [
    {
      title: 'AI Data Extraction',
      description: 'Advanced machine learning algorithms that intelligently extract and structure data from complex, unstructured sources with unprecedented accuracy.',
      category: 'Machine Learning',
      difficulty: 'Advanced',
      duration: '6-8 months'
    },
    {
      title: 'Machine Learning Enablement',
      description: 'Comprehensive platforms and frameworks that democratize ML capabilities, making advanced AI accessible to researchers and developers worldwide.',
      category: 'Platform',
      difficulty: 'Expert',
      duration: '8-12 months'
    },
    {
      title: 'Genealogy',
      description: 'AI-powered genealogical research tools that help people discover their heritage through intelligent pattern recognition and historical data analysis.',
      category: 'Research',
      difficulty: 'Intermediate',
      duration: '4-6 months'
    },
    {
      title: 'Natural Language Processing',
      description: 'Cutting-edge NLP systems that understand and generate human language with remarkable nuance, enabling seamless human-AI communication.',
      category: 'AI',
      difficulty: 'Advanced',
      duration: '6-9 months'
    },
    {
      title: 'AI-Enabled Customer Service',
      description: 'Intelligent customer service solutions that provide personalized, efficient support while maintaining the human touch customers value.',
      category: 'Applications',
      difficulty: 'Intermediate',
      duration: '3-6 months'
    },
    {
      title: 'Computer Vision',
      description: 'Revolutionary visual recognition systems that can interpret and understand visual information with human-level accuracy and beyond.',
      category: 'Vision',
      difficulty: 'Advanced',
      duration: '6-9 months'
    },
    {
      title: 'Autonomous Driving Technology',
      description: 'Next-generation self-driving systems that prioritize safety, efficiency, and environmental sustainability in transportation.',
      category: 'Robotics',
      difficulty: 'Expert',
      duration: '12+ months'
    },
  ], [])


  const innerContainerStyle = {
    padding: `${SPACING.XL} 0`,
  }

  const headerStyle = {
    ...(isMobile ? TYPOGRAPHY.DISPLAY_MOBILE : TYPOGRAPHY.DISPLAY),
    color: COLORS.DARK_SERPENT,
    textAlign: isMobile ? 'center' : 'left',
    marginBottom: SPACING.LG,
  }

  const subtitleStyle = {
    ...TYPOGRAPHY.BODY_LARGE,
    color: COLORS.CASTLETON_GREEN,
    textAlign: isMobile ? 'center' : 'left',
    marginBottom: SPACING.XL,
    maxWidth: "800px",
    margin: isMobile ? `0 auto ${SPACING.XXL}` : `0 0 ${SPACING.XXL}`,
    lineHeight: "1.6",
  }

  const projectsGridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, minmax(0, 1fr))",
    gap: isMobile ? SPACING.MD : SPACING.LG,
    alignItems: "stretch",
  }

  const projectCardStyle = {
    backgroundColor: COLORS.WHITE,
    borderRadius: "20px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    border: "1px solid rgba(4, 98, 65, 0.08)",
    overflow: "hidden",
    transition: "all 0.4s ease",
    cursor: "pointer",
    position: "relative",
    ":hover": {
      transform: "translateY(-12px)",
      boxShadow: "0 20px 48px rgba(0,0,0,0.15)",
    },
    display: "flex",
    flexDirection: "column",
    height: "100%",
  }


  const projectImageStyle = {
    width: "100%",
    height: isMobile ? "220px" : "260px",
    backgroundColor: COLORS.SEA_SALT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  }

  const projectImagePlaceholderStyle = {
    fontSize: "4rem",
    color: COLORS.CASTLETON_GREEN,
    opacity: 0.6,
  }

  const projectContentStyle = {
    padding: isMobile ? SPACING.MD : SPACING.LG,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  }

  const projectCategoryStyle = {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.CASTLETON_GREEN,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: SPACING.SM,
  }

  const projectTitleStyle = {
    ...TYPOGRAPHY.HEADLINE,
    color: COLORS.DARK_SERPENT,
    marginBottom: SPACING.MD,
    fontSize: isMobile ? "1.3rem" : "1.5rem",
    lineHeight: "1.3",
  }

  const projectDescriptionStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.DARK_GRAY,
    marginBottom: SPACING.XL,
    lineHeight: "1.7",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    flexGrow: 1,
  }

  // Removed difficulty/duration metadata styles per requirements

  const applyButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.DARK_SERPENT,
    padding: `${SPACING.SM} ${SPACING.XL}`, // reduced height
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
    width: "90%", // avoid touching card edges
    alignSelf: "center", // center within flex column
    textDecoration: "none",
    display: "inline-block",
    textAlign: "center",
    fontWeight: "600",
    marginTop: SPACING.LG, // spacing to avoid overlap with meta
    boxShadow: "0 4px 12px rgba(255, 179, 71, 0.25)",
    // Keep hover subtle to avoid layout shift/overlap
    ":hover": {
      boxShadow: "0 6px 16px rgba(255, 179, 71, 0.35)",
      backgroundColor: COLORS.EARTH_YELLOW,
    },
  }

  const getProjectIcon = (project) => {
    const projectTitle = typeof project === "string" ? project : project.title
    const icons = {
      "AI Data Extraction": "",
      "Machine Learning Enablement": "",
      "Genealogy": "",
      "Natural Language Processing": "",
      "AI-Enabled Customer Service": "",
      "Computer Vision": "",
      "Autonomous Driving Technology": "",
    }
    return icons[projectTitle] || ""
  }

  const getProjectImage = (project) => {
    const title = typeof project === "string" ? project : project.title
    const imageMap = {
      "AI Data Extraction": "/product_images/AI_Data_Extraction.jpeg",
      "Machine Learning Enablement": "/product_images/Machine_Learning_Enable.png",
      "Genealogy": "/product_images/Genealogy.png",
      "Natural Language Processing": "/product_images/Natural_Language_Processing.png",
      "AI-Enabled Customer Service": "/product_images/AI_Enabled_Customer_Service.png",
      "Computer Vision": "/product_images/Computer_Vision.png",
      // Note: filename has a typo 'Autonomoues' in provided assets
      "Autonomous Driving Technology": "/product_images/Autonomoues_Driving_Technology.jpeg",
    }
    return imageMap[title] || null
  }

  return (
    <div
      style={{
        backgroundColor: COLORS.PAPER,
        minHeight: "100vh",
        paddingTop: 0,
        paddingBottom: isMobile ? SPACING.XL : SPACING.XXL,
      }}
    >
      <section style={heroStyle}>
        <Container style={{ width: '100%', maxWidth: '100%', margin: 0, padding: 0 }}>
          <div style={heroInnerStyle}>
            <div style={heroVideoWrapStyle}>
              <video
                ref={videoRef}
                src="/videos/Project.mp4"
                style={heroVideoStyle}
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
              <button
                type="button"
                aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
                onClick={() => {
                  const next = !isMuted
                  setIsMuted(next)
                  if (videoRef.current) {
                    videoRef.current.muted = next
                    if (!next) {
                      videoRef.current.play().catch(() => {})
                    }
                  }
                }}
                style={soundToggleStyle}
              >
                {isMuted ? LABELS.UNMUTE : LABELS.MUTE}
              </button>
            </div>
            <div style={heroTextStyle}>
              <h1 style={headerStyle}>Our Projects</h1>
              <p style={subtitleStyle}>
                Explore cutting-edge technology projects that are shaping the future. Join our innovative team and
                contribute to groundbreaking solutions in AI, machine learning, and advanced computing.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <br />
      <br />
      <Container>
        <div style={innerContainerStyle}>
          <div style={projectsGridStyle}>
            {projects.map((project, index) => (
              <div key={project.title || index} style={projectCardStyle}>
                <div style={projectImageStyle}>
                  {getProjectImage(project) ? (
                    <img
                      src={getProjectImage(project)}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={projectImagePlaceholderStyle}>{getProjectIcon(project)}</div>
                  )}
                </div>
                <div style={projectContentStyle}>
                  <div style={projectCategoryStyle}>{project.category}</div>
                  <h3 style={projectTitleStyle}>{project.title}</h3>
                  <p style={projectDescriptionStyle}>{project.description}</p>
                  {/* Removed difficulty and duration as requested */}
                  <Link
                    to="/register"
                    state={{ selectedProject: project.title }}
                    style={applyButtonStyle}
                  >
                    Apply for this Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Projects
