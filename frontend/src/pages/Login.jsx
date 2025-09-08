import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS } from '../constants/colors';
import Container from '../components/Container';
import { adminAPI } from '../services/api';
import useMediaQuery from '../hooks/useMediaQuery';

const Login = () => {
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const cardStyle = {
    backgroundColor: COLORS.WHITE,
    padding: isMobile ? SPACING.XL : SPACING.XXL,
    borderRadius: '0',
    boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
    border: '1px solid rgba(4, 98, 65, 0.1)',
  };

  const titleStyle = {
    ...(isMobile ? TYPOGRAPHY.TITLE : TYPOGRAPHY.DISPLAY_SMALL),
    color: COLORS.DARK_SERPENT,
    textAlign: 'center',
    marginBottom: SPACING.SM,
  };

  const subtitleStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.CASTLETON_GREEN,
    textAlign: 'center',
    marginBottom: SPACING.LG,
  };

  const formGroupStyle = {
    marginBottom: SPACING.LG,
  };

  const labelStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.DARK_SERPENT,
    display: 'block',
    marginBottom: SPACING.SM,
    fontWeight: '600',
  };

  const inputStyle = {
    width: '100%',
    padding: `${SPACING.SM} ${SPACING.MD}`,
    border: `1px solid ${COLORS.LIGHT_GRAY}`,
    borderRadius: '0',
    ...TYPOGRAPHY.BODY,
    transition: 'all 0.2s ease',
    backgroundColor: COLORS.WHITE,
    color: COLORS.DARK_SERPENT,
    ':focus': {
      borderColor: COLORS.CASTLETON_GREEN,
      outline: 'none',
      boxShadow: `0 0 0 3px rgba(4, 98, 65, 0.1)`,
    },
  };

  const errorStyle = {
    ...TYPOGRAPHY.CAPTION,
    color: COLORS.ERROR,
    marginTop: SPACING.SM,
  };

  const submitButtonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.DARK_SERPENT,
    padding: `${SPACING.MD} ${SPACING.XL}`,
    border: 'none',
    borderRadius: '0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
    marginTop: SPACING.MD,
    marginBottom: SPACING.SM,
    boxShadow: '0 4px 12px rgba(255, 179, 71, 0.3)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(255, 179, 71, 0.4)',
    },
    ':disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  };

  // demoButtonStyle removed

  const errorMessageStyle = {
    ...TYPOGRAPHY.BODY,
    color: COLORS.ERROR,
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    borderRadius: '0',
    padding: SPACING.LG,
    marginBottom: SPACING.LG,
    textAlign: 'center',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear login error
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      setLoginError('');
      setErrors({});

      const response = await adminAPI.login(formData);
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setLoginError(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // fillDemoCredentials removed for security

  return (
    <div style={{backgroundColor: COLORS.PAPER, minHeight: '100vh'}}>
      <Container>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: isMobile ? SPACING.MD : SPACING.XL,
          paddingTop: isMobile ? SPACING.XL : SPACING.XXL,
        }}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>Admin Login</h1>
            <p style={subtitleStyle}>Enter your credentials to access the admin dashboard</p>

            {loginError && <div style={errorMessageStyle}>{loginError}</div>}

            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="email">Email address</label>
                <input
                  style={inputStyle}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="password">Password</label>
                <input
                  style={inputStyle}
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {errors.password && <div style={errorStyle}>{errors.password}</div>}
              </div>

              <button
                type="submit"
                style={submitButtonStyle}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            {/* Demo credential helpers removed for security */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
