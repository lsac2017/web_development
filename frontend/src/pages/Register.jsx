import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS } from '../constants/colors';
import Container from '../components/Container';
import { applicantAPI, projectsAPI } from '../services/api';
import useMediaQuery from '../hooks/useMediaQuery';
import { LABELS } from '../constants/text';

const Register = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: Personal, 1: Experience, 2: Resume, 3: Summary

  // State
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    degree: '',
    relevantExperience: '',
    email: '',
    projectAppliedFor: '',
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [buttonHover, setButtonHover] = useState(false);
  const [resumePreviewUrl, setResumePreviewUrl] = useState('');
  const [resumePreviewType, setResumePreviewType] = useState(''); // 'pdf' | 'doc' | ''
  
  // Removed admin notice and intro texts per requirements

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (resumePreviewUrl) URL.revokeObjectURL(resumePreviewUrl);
    };
  }, [resumePreviewUrl]);

  // Step titles removed from UI as requested; we keep only numeric indicators

  const validateStep = (currentStep) => {
    const stepErrors = {};
    if (currentStep === 0) {
      if (!formData.firstName.trim()) stepErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) stepErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) stepErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) stepErrors.email = 'Email is invalid';
      if (!formData.age) stepErrors.age = 'Age is required';
      else if (parseInt(formData.age) < 18) stepErrors.age = 'Age must be at least 18';
      if (!formData.degree.trim()) stepErrors.degree = 'Degree is required';
      if (!formData.projectAppliedFor) stepErrors.projectAppliedFor = 'Please select a project';
    } else if (currentStep === 1) {
      if (!formData.relevantExperience.trim()) stepErrors.relevantExperience = 'Relevant experience is required';
    } else if (currentStep === 2) {
      if (!formData.resume) stepErrors.resume = 'Resume is required';
    } else if (currentStep === 3) {
      // Summary step - nothing additional to validate
    }
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((s) => Math.min(3, s + 1));
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep((s) => Math.max(0, s - 1));
  };

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.data);
      } catch (error) {
        console.warn('Error fetching projects:', error);
        setProjects([
          'AI Data Extraction',
          'Machine Learning Enablement',
          'Genealogy',
          'Natural Language Processing',
          'AI-Enabled Customer Service',
          'Computer Vision',
          'Autonomous Driving Technology',
        ]);
      }
    };
    fetchProjects();
  }, []);

  // Prefill selected project from route
  useEffect(() => {
    const selected = location.state && location.state.selectedProject;
    if (selected && projects && projects.length) {
      const match = projects.find((p) =>
        typeof p === 'string' ? p : p.title === selected
      );
      if (match) {
        const value = typeof match === 'string' ? match : match.title;
        setFormData((prev) => ({ ...prev, projectAppliedFor: value }));
      }
    }
  }, [projects, location.state]);

  // Prefill from URL query (?project=...)
  useEffect(() => {
    const projectFromUrl = searchParams.get('project');
    if (projectFromUrl) {
      setFormData((prev) => ({ ...prev, projectAppliedFor: projectFromUrl }));
    }
  }, [searchParams]);

  // ---------- Styles ----------

  const titleStyle = {
    ...(isMobile ? TYPOGRAPHY.TITLE : TYPOGRAPHY.DISPLAY_SMALL),
    color: COLORS.DARK_SERPENT,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  };

  const subtitleStyle = {
    ...TYPOGRAPHY.BODY,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: `-${SPACING.SM}`,
    marginBottom: SPACING.XL,
  };

  const applicationContainerStyle = {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: isMobile ? SPACING.MD : SPACING.XL,
    backgroundColor: 'transparent',
    borderRadius: '16px',
  };

  const progressHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.MD,
    color: COLORS.DARK_SERPENT,
  };

  const progressBarTrackStyle = {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: SPACING.XL,
  };

  const progressBarFillStyle = (pct) => ({
    width: `${pct}%`,
    height: '100%',
    backgroundColor: COLORS.CASTLETON_GREEN,
  });

  // Stepper styles
  const stepperStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto 1fr auto',
    alignItems: 'center',
    columnGap: SPACING.MD,
    width: '100%',
    marginBottom: SPACING.XL,
  };

  const stepItemStyle = (active) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: `2px solid ${COLORS.CASTLETON_GREEN}`,
    backgroundColor: active ? COLORS.CASTLETON_GREEN : 'transparent',
    color: active ? COLORS.WHITE : COLORS.CASTLETON_GREEN,
    fontWeight: 700,
    transition: 'all 0.2s ease',
  });

  // removed stepLabelStyle (not used after simplified UI)

  // removed numberBadgeStyle; step circles now rendered directly by stepItemStyle

  const stepConnectorStyle = {
    height: '2px',
    width: '100%',
    background: `linear-gradient(90deg, rgba(4,98,65,0.15), ${COLORS.CASTLETON_GREEN})`,
    borderRadius: '2px',
  };

  // Subtitle removed

  // Header styles removed (unused)

  // headerDescriptionStyle removed (unused)

  const formStyle = {
    backgroundColor: COLORS.WHITE,
    padding: isMobile ? SPACING.LG : SPACING.XL,
    borderRadius: '16px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.06)',
    marginBottom: SPACING.XL,
    border: `0.5px solid rgba(4, 98, 65, 0.12)`,
  };

  const formGroupStyle = {
    marginBottom: SPACING.XL,
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.MD,
  };

  const summaryCardStyle = {
    backgroundColor: COLORS.SEA_SALT,
    border: `1px solid rgba(4, 98, 65, 0.12)`,
    borderRadius: '12px',
    padding: SPACING.XL,
    marginBottom: SPACING.XL,
  };

  const summaryGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: SPACING.LG,
  };

  const summaryItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.XS,
  };

  const summaryLabelStyle = {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.CASTLETON_GREEN,
    fontWeight: 700,
    letterSpacing: '0.3px',
  };

  const summaryValueStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.DARK_SERPENT,
  };

  const labelStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.DARK_SERPENT,
    fontWeight: '600',
    marginBottom: SPACING.SM,
    lineHeight: '1.3',
    display: 'block',
  };

  const inputStyle = {
    width: '100%',
    padding: `${SPACING.SM} ${SPACING.MD}`,
    border: `1px solid ${COLORS.LIGHT_GRAY}`,
    borderRadius: '8px',
    ...TYPOGRAPHY.BODY,
    transition: 'all 0.2s ease',
    backgroundColor: COLORS.WHITE,
    color: COLORS.DARK_SERPENT,
    boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    minHeight: '44px',
    lineHeight: '1.4',
    boxSizing: 'border-box',
    ':focus': {
      borderColor: COLORS.CASTLETON_GREEN,
      outline: 'none',
      boxShadow: '0 0 0 4px rgba(4, 98, 65, 0.10)',
    },
  };

  const getFocusedInputStyle = (field) => ({
    ...inputStyle,
    borderColor: focusedField === field ? COLORS.CASTLETON_GREEN : inputStyle.borderColor,
    boxShadow: focusedField === field 
      ? '0 0 0 4px rgba(4, 98, 65, 0.10)' 
      : inputStyle.boxShadow,
  });

  const errorStyle = {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.ERROR,
    marginTop: SPACING.SM,
    marginBottom: SPACING.SM, // spacing before next field
  };

  const submitButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.DARK_SERPENT,
    padding: `${SPACING.MD} ${SPACING.XL}`,
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: 48,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: SPACING.LG,
    boxShadow: '0 4px 12px rgba(255, 179, 71, 0.3)',
  };

  const primaryNavButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.DARK_SERPENT,
    padding: `${SPACING.MD} ${SPACING.XL}`,
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: 48,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    boxShadow: '0 4px 12px rgba(255, 179, 71, 0.3)',
  };

  const navButtonsRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: SPACING.MD,
    marginTop: SPACING.XL,
  };

  const secondaryButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: 'transparent',
    color: COLORS.CASTLETON_GREEN,
    padding: `${SPACING.MD} ${SPACING.XL}`,
    border: `2px solid ${COLORS.CASTLETON_GREEN}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: 48,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  };

  const bannerBase = {
    ...TYPOGRAPHY.BODY,
    borderRadius: '12px',
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    display: 'flex',
    alignItems: 'center',
    gap: SPACING.MD,
  };

  // successStyle removed (using popup alert instead)

  const errorMessageStyle = {
    ...bannerBase,
    color: '#842029',
    background: 'linear-gradient(90deg, #fde2e2, #fff0f0)',
    border: '1px solid #f5c2c7',
  };

  // ---------- Handlers ----------

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'resume') {
      setFormData((prev) => ({
        ...prev,
        resume: files[0],
      }));
      // Setup local preview if PDF; otherwise set type for message
      if (files && files[0]) {
        const file = files[0];
        // Cleanup old preview URL
        if (resumePreviewUrl) {
          URL.revokeObjectURL(resumePreviewUrl);
        }
        if (file.type === 'application/pdf') {
          const url = URL.createObjectURL(file);
          setResumePreviewUrl(url);
          setResumePreviewType('pdf');
        } else {
          setResumePreviewUrl('');
          setResumePreviewType('doc');
        }
      } else {
        if (resumePreviewUrl) URL.revokeObjectURL(resumePreviewUrl);
        setResumePreviewUrl('');
        setResumePreviewType('');
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = 'Age must be at least 18';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    } else if (!allowedTypes.includes(formData.resume.type)) {
      newErrors.resume = 'Only PDF and Word documents are allowed';
    } else if (formData.resume.size > maxSize) {
      newErrors.resume = 'File size must be less than 5MB';
    }

    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.projectAppliedFor)
      newErrors.projectAppliedFor = 'Please select a project';

    if (!formData.relevantExperience.trim())
      newErrors.relevantExperience = 'Relevant experience is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // Backend expects multipart/form-data on POST /api/applicants with @RequestParam fields
      const fd = new FormData();
      fd.append('firstName', formData.firstName);
      fd.append('lastName', formData.lastName);
      fd.append('age', String(parseInt(formData.age, 10)));
      fd.append('degree', formData.degree);
      fd.append('relevantExperience', formData.relevantExperience);
      fd.append('email', formData.email);
      fd.append('projectAppliedFor', formData.projectAppliedFor);
      if (formData.resume) {
        fd.append('resume', formData.resume);
      }

      const createResp = await applicantAPI.create(fd);
      if (createResp.status !== 201) {
        throw new Error('Unexpected response from server');
      }

      setSubmitStatus('success');
      window.alert("Application submitted successfully! We'll be in touch soon.");
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        degree: '',
        relevantExperience: '',
        email: '',
        projectAppliedFor: '',
        resume: null,
      });
      if (resumePreviewUrl) URL.revokeObjectURL(resumePreviewUrl);
      setResumePreviewUrl('');
      setResumePreviewType('');
      navigate('/');
    } catch (error) {
      console.error('Error submitting application:', error);
      const status = error?.response?.status;
      const apiMessage = error?.response?.data || error?.message || 'Submission failed';
      // Allow reapply when email already exists (backend may return 400/409)
      if (status === 400 || status === 409) {
        window.alert("We already have an application with this email. Your new application has been noted.");
        navigate('/');
        setSubmitStatus('success');
      } else {
        setErrors((prev) => ({ ...prev, submit: apiMessage }));
        setSubmitStatus('error');
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------- JSX ----------

  return (
    <div
      style={{
        background: COLORS.PAPER,
        minHeight: '100vh',
        padding: isMobile ? `${SPACING.XL} ${SPACING.MD}` : `${SPACING.XXL} ${SPACING.XL}`,
      }}
    >
      <Container>
        <div
          style={{
            width: '100%',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          <div style={applicationContainerStyle}>
          <h1 style={titleStyle}>{LABELS.REGISTER_TITLE}</h1>
          <div style={subtitleStyle}>{LABELS.REGISTER_SUBTITLE}</div>

          {/* Progress header */}
          <div style={progressHeaderStyle}>
            <div>
              {LABELS.STEP_OF} {step + 1} {LABELS.OF} 4
            </div>
            <div>
              {Math.round(((step + 1) / 4) * 100)}% {LABELS.COMPLETE_SUFFIX}
            </div>
          </div>
          <div style={progressBarTrackStyle}>
            <div style={progressBarFillStyle(Math.round(((step + 1) / 4) * 100))} />
          </div>

          <form style={formStyle} onSubmit={handleSubmit}>
            {/* Stepper - numbered circles only */}
            <div style={{
              ...stepperStyle,
              gridTemplateColumns: 'auto 1fr auto 1fr auto 1fr auto',
            }}>
              <div style={stepItemStyle(step === 0)}>1</div>
              <div style={stepConnectorStyle} />
              <div style={stepItemStyle(step === 1)}>2</div>
              <div style={stepConnectorStyle} />
              <div style={stepItemStyle(step === 2)}>3</div>
              <div style={stepConnectorStyle} />
              <div style={stepItemStyle(step === 3)}>4</div>
            </div>

            {/* Success alert shown via window.alert; inline success banner removed */}

            {(submitStatus === 'error' || errors.submit) && (
              <div style={errorMessageStyle}>
                <span>⚠️</span>
                <span>
                  {errors.submit || 'Failed to submit application. Please try again.'}
                </span>
              </div>
            )}

            {/* Step 3: Summary */}
            {step === 3 && (
              <div style={formGroupStyle}>
                <div style={summaryCardStyle}>
                  <div style={{ ...(isMobile ? TYPOGRAPHY.SUBHEADLINE : TYPOGRAPHY.HEADLINE), color: COLORS.DARK_SERPENT, marginBottom: SPACING.MD }}>
                    {LABELS.REVIEW_DETAILS}
                  </div>
                  <div style={summaryGridStyle}>
                    <div style={summaryItemStyle}>
                      <span style={summaryLabelStyle}>{LABELS.FIRST_NAME}</span>
                      <span style={summaryValueStyle}>{formData.firstName || '-'}</span>
                    </div>
                    <div style={summaryItemStyle}>
                      <span style={summaryLabelStyle}>{LABELS.LAST_NAME}</span>
                      <span style={summaryValueStyle}>{formData.lastName || '-'}</span>
                    </div>
                    <div style={summaryItemStyle}>
                      <span style={summaryLabelStyle}>{LABELS.EMAIL_ADDRESS}</span>
                      <span style={summaryValueStyle}>{formData.email || '-'}</span>
                    </div>
                    <div style={summaryItemStyle}>
                      <span style={summaryLabelStyle}>{LABELS.AGE}</span>
                      <span style={summaryValueStyle}>{formData.age || '-'}</span>
                    </div>
                    <div style={summaryItemStyle}>
                      <span style={summaryLabelStyle}>{LABELS.DEGREE}</span>
                      <span style={summaryValueStyle}>{formData.degree || '-'}</span>
                    </div>
                    <div style={summaryItemStyle}>
                      <span style={summaryLabelStyle}>{LABELS.PROJECT}</span>
                      <span style={summaryValueStyle}>{formData.projectAppliedFor || '-'}</span>
                    </div>
                    <div style={{ gridColumn: isMobile ? 'auto' : '1 / -1', ...summaryItemStyle }}>
                      <span style={summaryLabelStyle}>{LABELS.EXPERIENCE_LABEL}</span>
                      <span style={summaryValueStyle}>{formData.relevantExperience || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 0: Personal Information */}
            {step === 0 && (
              <>
                <div
                  style={
                    isMobile
                      ? { marginBottom: SPACING.XL }
                      : {
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: SPACING.MD,
                          marginBottom: SPACING.LG,
                        }
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.SM }}>
                    <label htmlFor="firstName" style={labelStyle}>
                      First name *
                    </label>
                    <input
                      style={getFocusedInputStyle('firstName')}
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                    {errors.firstName && <div style={errorStyle}>{errors.firstName}</div>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.SM }}>
                    <label htmlFor="lastName" style={labelStyle}>
                      Last name *
                    </label>
                    <input
                      style={getFocusedInputStyle('lastName')}
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField('')}
                      required
                    />
                    {errors.lastName && <div style={errorStyle}>{errors.lastName}</div>}
                  </div>
                </div>

                <div
                  style={
                    isMobile
                      ? { marginBottom: SPACING.LG }
                      : {
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: SPACING.MD,
                          marginBottom: SPACING.LG,
                        }
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.SM }}>
                    <label htmlFor="email" style={labelStyle}>
                      Email address *
                    </label>
                    <input
                      style={getFocusedInputStyle('email')}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      placeholder="your.email@example.com"
                      required
                    />
                    {errors.email && <div style={errorStyle}>{errors.email}</div>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.SM }}>
                    <label htmlFor="age" style={labelStyle}>
                      Age *
                    </label>
                    <input
                      style={getFocusedInputStyle('age')}
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('age')}
                      onBlur={() => setFocusedField('')}
                      min="18"
                      max="100"
                      required
                    />
                    {errors.age && <div style={errorStyle}>{errors.age}</div>}
                  </div>
                </div>

                <div
                  style={
                    isMobile
                      ? { marginBottom: SPACING.LG }
                      : {
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: SPACING.MD,
                          marginBottom: SPACING.LG,
                        }
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.SM }}>
                    <label htmlFor="degree" style={labelStyle}>
                      Degree *
                    </label>
                    <input
                      style={getFocusedInputStyle('degree')}
                      type="text"
                      id="degree"
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('degree')}
                      onBlur={() => setFocusedField('')}
                      placeholder="e.g., Bachelor of Computer Science"
                      required
                    />
                    {errors.degree && <div style={errorStyle}>{errors.degree}</div>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.SM }}>
                    <label htmlFor="projectAppliedFor" style={labelStyle}>
                      Select Project *
                    </label>
                    <select
                      style={{
                        ...getFocusedInputStyle('projectAppliedFor'),
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M5 7l5 5 5-5\' stroke=\'%236b7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E%27")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        paddingRight: '48px',
                      }}
                      id="projectAppliedFor"
                      name="projectAppliedFor"
                      value={formData.projectAppliedFor}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('projectAppliedFor')}
                      onBlur={() => setFocusedField('')}
                      required
                    >
                      <option value="">-- Select a project --</option>
                      {projects.map((project, index) => (
                        <option
                          key={index}
                          value={typeof project === 'string' ? project : project.title}
                        >
                          {typeof project === 'string' ? project : project.title}
                        </option>
                      ))}
                    </select>
                    {errors.projectAppliedFor && (
                      <div style={errorStyle}>{errors.projectAppliedFor}</div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Experience */}
            {step === 1 && (
              <div style={formGroupStyle}>
                <label htmlFor="relevantExperience" style={labelStyle}>
                  Relevant Experience *
                </label>
                <textarea
                  style={{
                    ...getFocusedInputStyle('relevantExperience'),
                    minHeight: '160px',
                    resize: 'vertical',
                    lineHeight: '1.6',
                  }}
                  id="relevantExperience"
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('relevantExperience')}
                  onBlur={() => setFocusedField('')}
                  placeholder="Describe your relevant experience and skills..."
                  required
                />
                {errors.relevantExperience && <div style={errorStyle}>{errors.relevantExperience}</div>}
              </div>
            )}

            {/* Step 2: Resume */}
            {step === 2 && (
              <div style={formGroupStyle}>
                {/* Resume (upload and preview) */}
                <label style={labelStyle}>
                  Resume (PDF or Word) *
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.MD }}>
                  <button
                    type="button"
                    onClick={() => document.getElementById('resume').click()}
                    style={{
                      ...inputStyle,
                      width: 'auto',
                      backgroundColor: COLORS.CASTLETON_GREEN,
                      color: COLORS.WHITE,
                      cursor: 'pointer',
                      border: `1.5px solid ${COLORS.CASTLETON_GREEN}`,
                    }}
                  >
                    Choose File
                  </button>
                  <span style={{ ...TYPOGRAPHY.CAPTION, color: '#6b7280', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {formData.resume ? formData.resume.name : 'No file selected'}
                  </span>
                </div>
                <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.GRAY, marginTop: SPACING.SM }}>
                  Accepted file types: .pdf, .doc, .docx (max 5MB)
                </div>
                {errors.resume && <div style={errorStyle}>{errors.resume}</div>}
                {resumePreviewType === 'pdf' && resumePreviewUrl && (
                  <div style={{ marginTop: SPACING.MD }}>
                    <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.DARK_SERPENT, marginBottom: SPACING.SM }}>
                      Preview (PDF):
                    </div>
                    <div style={{ border: `1px solid ${COLORS.LIGHT_GRAY}`, borderRadius: '8px', overflow: 'hidden', height: '360px', background: COLORS.WHITE }}>
                      <iframe
                        src={resumePreviewUrl}
                        title="Resume Preview"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                      />
                    </div>
                  </div>
                )}
                {resumePreviewType === 'doc' && (
                  <div style={{ ...TYPOGRAPHY.CAPTION, color: '#6b7280', marginTop: SPACING.SM }}>
                    Preview not available for Word documents. You can still submit; the admin will be able to download and view it.
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div style={navButtonsRowStyle}>
              <button
                type="button"
                onClick={handleBack}
                style={secondaryButtonStyle}
                disabled={step === 0}
              >
                {LABELS.BACK}
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  style={primaryNavButtonStyle}
                >
                  {LABELS.NEXT}
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    ...submitButtonStyle,
                    transform: buttonHover ? 'translateY(-2px) scale(1.02)' : 'none',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop: 0,
                  }}
                  disabled={loading}
                  onMouseEnter={() => setButtonHover(true)}
                  onMouseLeave={() => setButtonHover(false)}
                >
                  {LABELS.SUBMIT}
                </button>
              )}
            </div>
          </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
