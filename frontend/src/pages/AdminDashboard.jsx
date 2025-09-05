import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS } from '../constants/colors';
import Container from '../components/Container';
import { applicantAPI, API_BASE_URL } from '../services/api';
import { fetchResumeBlob } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMediaQuery from '../hooks/useMediaQuery';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.MOBILE})`);
  const isTablet = useMediaQuery(`(max-width: ${BREAKPOINTS.TABLET})`);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingApplicant, setEditingApplicant] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isProcessing, setIsProcessing] = useState(false);

  // Resume viewer modal state
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    degree: '',
    relevantExperience: '',
    email: '',
    projectAppliedFor: ''
  });

  const projects = [
    'AI Data Extraction',
    'Machine Learning Enablement',
    'Genealogy',
    'Natural Language Processing',
    'AI-Enabled Customer Service',
    'Computer Vision',
    'Autonomous Driving Technology'
  ];

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchApplicants();
  }, [navigate]);

  const fetchApplicants = async () => {
    try {
      const response = await applicantAPI.getAll();
      setApplicants(response.data);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      toast.error('Error loading applicants', { position: 'top-right', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // -------- Utility Actions --------
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully', { position: 'top-right', autoClose: 2000 });
    navigate('/login');
  };

  const exportCSV = () => {
    if (!applicants || applicants.length === 0) {
      toast.info('No applicants to export', { position: 'top-right', autoClose: 2000 });
      return;
    }
    const headers = ['First Name','Last Name','Email','Degree','Project','Status','Applied On'];
    const rows = applicants.map(a => [
      a.firstName || '',
      a.lastName || '',
      a.email || '',
      a.degree || '',
      a.projectAppliedFor || '',
      a.status || 'pending',
      a.createdAt ? new Date(a.createdAt).toISOString() : ''
    ]);
    const csv = [headers, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'applicants.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openResume = async (applicant) => {
    try {
      setShowResumeModal(true);
      // Fetch as blob and create an object URL for reliable inline preview
      const response = await fetchResumeBlob(applicant.id);
      const blob = response.data;
      const url = URL.createObjectURL(blob);
      // Revoke old URL if any
      if (resumeUrl) URL.revokeObjectURL(resumeUrl);
      setResumeUrl(url);
    } catch (err) {
      console.error('Failed to load resume preview:', err);
      toast.error('Unable to preview resume. Try downloading instead.');
      setShowResumeModal(false);
    }
  };

  const closeResume = () => {
    setShowResumeModal(false);
    if (resumeUrl) URL.revokeObjectURL(resumeUrl);
    setResumeUrl('');
  };

  const statCardStyle = {
    backgroundColor: COLORS.WHITE,
    padding: SPACING.XL,
    borderRadius: '0',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    textAlign: 'center',
    border: '1px solid rgba(4, 98, 65, 0.1)',
  };

  const headerStyle = {
    ...(isMobile ? TYPOGRAPHY.DISPLAY_MOBILE : TYPOGRAPHY.DISPLAY),
    color: COLORS.DARK_SERPENT,
    marginBottom: SPACING.XXL,
    textAlign: 'center',
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: SPACING.LG,
    marginBottom: SPACING.XXL,
  };

  const controlsStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
    gap: SPACING.MD,
    marginBottom: SPACING.XXL,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: SPACING.LG,
    borderRadius: '0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  };

  const searchInputStyle = {
    padding: `${SPACING.MD} ${SPACING.LG}`,
    border: `2px solid ${COLORS.LIGHT_GRAY}`,
    borderRadius: '0',
    ...TYPOGRAPHY.BODY,
    transition: 'all 0.3s ease',
    width: '100%',
    ':focus': {
      borderColor: COLORS.CASTLETON_GREEN,
      outline: 'none',
      boxShadow: `0 0 0 2px ${COLORS.CASTLETON_GREEN}20`,
    },
  };

  const buttonStyle = {
    ...TYPOGRAPHY.BUTTON,
    backgroundColor: COLORS.SAFFRON,
    color: COLORS.DARK_SERPENT,
    padding: `${SPACING.MD} ${SPACING.XL}`,
    border: 'none',
    borderRadius: '0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.SM,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(255, 179, 71, 0.3)',
    },
    ':disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    backgroundColor: COLORS.WHITE,
    borderRadius: '0',
    overflow: 'hidden',
    boxShadow: '0 6px 24px rgba(0,0,0,0.06)',
    border: `2px solid ${COLORS.LIGHT_GRAY}`,
    marginBottom: SPACING.XXL,
  };

  const thStyle = {
    ...TYPOGRAPHY.SUBHEADLINE,
    backgroundColor: COLORS.CASTLETON_GREEN,
    color: COLORS.WHITE,
    padding: `${SPACING.MD} ${SPACING.LG}`,
    textAlign: 'left',
    fontWeight: '600',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    ...TYPOGRAPHY.BODY,
    padding: `calc(${SPACING.MD} + 2px) ${SPACING.LG}`,
    borderBottom: `1px solid ${COLORS.LIGHT_GRAY}`,
    borderRight: `1px solid ${COLORS.LIGHT_GRAY}`,
    color: COLORS.DARK_SERPENT,
    verticalAlign: 'middle',
    transition: 'background-color 0.2s ease',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    lineHeight: 1.4,
    ':hover': {
      backgroundColor: 'rgba(4, 98, 65, 0.03)',
    },
  };

  const actionButtonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '0',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
    ':hover': {
      transform: 'translateY(-1px)',
    },
    ':disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  };

  // Uniform size for action buttons to ensure consistent width/height across Approve, Decline, View, Download
  const uniformActionSize = {
    width: '120px',
    height: '40px',
    borderRadius: '0',
    fontSize: '0.85rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const approveButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: 'rgba(4, 98, 65, 0.12)',
    color: COLORS.CASTLETON_GREEN,
    border: `2px solid ${COLORS.CASTLETON_GREEN}`,
    ':hover': {
      backgroundColor: 'rgba(4, 98, 65, 0.18)',
      boxShadow: '0 2px 8px rgba(4, 98, 65, 0.2)',
    },
  };

  const rejectButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: 'rgba(220, 53, 69, 0.12)',
    color: COLORS.ERROR,
    border: '2px solid rgba(220, 53, 69, 1)',
    ':hover': {
      backgroundColor: 'rgba(220, 53, 69, 0.18)',
      boxShadow: '0 2px 8px rgba(220, 53, 69, 0.2)',
    },
  };

  const statusBadgeStyle = (status) => ({
    ...TYPOGRAPHY.CAPTION,
    padding: '0.35rem 0.75rem',
    borderRadius: '0',
    fontWeight: '600',
    textTransform: 'capitalize',
    display: 'inline-block',
    minWidth: '88px',
    textAlign: 'center',
    backgroundColor: 
      status === 'approved' ? 'rgba(40, 167, 69, 0.1)' :
      status === 'rejected' ? 'rgba(220, 53, 69, 0.1)' :
      'rgba(108, 117, 125, 0.1)',
    color: 
      status === 'approved' ? '#28a745' :
      status === 'rejected' ? '#dc3545' :
      '#6c757d',
  });

  

  const inputStyle = {
    padding: `${SPACING.MD} ${SPACING.LG}`,
    border: `2px solid ${COLORS.LIGHT_GRAY}`,
    borderRadius: '0',
    ...TYPOGRAPHY.BODY,
    width: '100%',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: COLORS.CASTLETON_GREEN,
      outline: 'none',
      boxShadow: `0 0 0 2px ${COLORS.CASTLETON_GREEN}20`,
    },
    '::placeholder': {
      color: COLORS.GRAY,
    },
  };

  // Group applicants by status for the stats cards
  const stats = {
    total: applicants.length,
    pending: applicants.filter(a => !a.status || a.status === 'pending').length,
    approved: applicants.filter(a => a.status === 'approved').length,
    rejected: applicants.filter(a => a.status === 'rejected').length,
  };
  
  // Filter applicants based on search term, project, and status
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      `${applicant.firstName} ${applicant.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (applicant.projectAppliedFor && applicant.projectAppliedFor.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesProject = !filterProject || applicant.projectAppliedFor === filterProject;
    const matchesStatus = filterStatus === 'all' || applicant.status === filterStatus;
    
    return matchesSearch && matchesProject && matchesStatus;
  });

  // Handle applicant status update
  const updateApplicantStatus = async (id, status) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (status === 'approved') {
        await applicantAPI.approve(id);
      } else if (status === 'rejected') {
        await applicantAPI.decline(id);
      } else {
        await applicantAPI.updateStatus(id, status);
      }
      
      // Update local state
      setApplicants(applicants.map(applicant => 
        applicant.id === id ? { ...applicant, status } : applicant
      ));
      
      toast.success(`Application ${status} successfully!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Check if any filters are active (reserved for future UI toggles)

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: COLORS.WHITE,
    padding: '2rem',
    borderRadius: '0',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  const resumeModalContentStyle = {
    ...modalContentStyle,
    maxWidth: '900px',
    width: '95%'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      degree: '',
      relevantExperience: '',
      email: '',
      projectAppliedFor: ''
    });
  };


  

  const handleSave = async () => {
    try {
      if (editingApplicant) {
        await applicantAPI.update(editingApplicant._id, formData);
        toast.success('Applicant updated successfully', { position: 'top-right', autoClose: 3000 });
      } else {
        await applicantAPI.create(formData);
        toast.success('Applicant added successfully', { position: 'top-right', autoClose: 3000 });
      }
      
      fetchApplicants();
      setEditingApplicant(null);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error('Error saving applicant:', error);
      toast.error('Error saving applicant', { position: 'top-right', autoClose: 3000 });
    }
  };

  

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: COLORS.DARK_SERPENT,
      }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{backgroundColor: COLORS.PAPER, minHeight: '100vh', paddingTop: '2rem'}}>
      <Container style={{ padding: `${SPACING.XL} 0` }}>
        {/* Header with actions */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          gap: SPACING.MD,
          marginBottom: SPACING.XL,
        }}>
          <h1 style={headerStyle}>Admin Dashboard</h1>
          <div style={{
            display: 'flex',
            gap: SPACING.SM,
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'stretch' : 'flex-end'
          }}>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: COLORS.CASTLETON_GREEN,
                color: COLORS.WHITE,
                padding: `${SPACING.MD} ${SPACING.XL}`,
              }}
              onClick={() => {
                setShowAddForm(true);
                setEditingApplicant(null);
              }}
            >
              + Add Application
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: COLORS.WHITE,
                color: COLORS.CASTLETON_GREEN,
                border: `2px solid ${COLORS.CASTLETON_GREEN}`,
              }}
              onClick={exportCSV}
            >
              Export Data
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: COLORS.ERROR,
                color: COLORS.WHITE,
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div style={statsContainerStyle}>
        <div style={{ ...statCardStyle, borderLeft: `4px solid ${COLORS.CASTLETON_GREEN}` }}>
          <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.GRAY, marginBottom: SPACING.XS }}>Total Applications</div>
          <div style={{ ...TYPOGRAPHY.DISPLAY, color: COLORS.DARK_SERPENT, marginBottom: SPACING.XS }}>{stats.total}</div>
          <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.GREEN }}>
            {stats.pending} pending review
          </div>
        </div>
        <div style={{ ...statCardStyle, borderLeft: `4px solid ${COLORS.SAFFRON}` }}>
          <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.GRAY, marginBottom: SPACING.XS }}>In Review</div>
          <div style={{ ...TYPOGRAPHY.DISPLAY, color: COLORS.DARK_SERPENT, marginBottom: SPACING.XS }}>{stats.pending}</div>
          <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.SAFFRON }}>
            {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}% of total
          </div>
        </div>
        <div style={{ ...statCardStyle, borderLeft: `4px solid #28a745` }}>
          <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.GRAY, marginBottom: SPACING.XS }}>Approved</div>
          <div style={{ ...TYPOGRAPHY.DISPLAY, color: COLORS.DARK_SERPENT, marginBottom: SPACING.XS }}>{stats.approved}</div>
          <div style={{ ...TYPOGRAPHY.CAPTION, color: '#28a745' }}>
            {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}% acceptance rate
          </div>
        </div>
        <div style={{ ...statCardStyle, borderLeft: `4px solid ${COLORS.ERROR}` }}>
          <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.GRAY, marginBottom: SPACING.XS }}>Rejected</div>
          <div style={{ ...TYPOGRAPHY.DISPLAY, color: COLORS.DARK_SERPENT, marginBottom: SPACING.XS }}>{stats.rejected}</div>
          <div style={{ ...TYPOGRAPHY.CAPTION, color: COLORS.ERROR }}>
            {stats.total > 0 ? Math.round((stats.rejected / stats.total) * 100) : 0}% rejection rate
          </div>
        </div>
        </div>
        
        {/* Filters */}
        <div style={controlsStyle}>
          <div>
          <label htmlFor="search" style={{ display: 'block', marginBottom: SPACING.XS, fontWeight: '600' }}>Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, email, or project..."
            style={searchInputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="projectFilter" style={{ display: 'block', marginBottom: SPACING.XS, fontWeight: '600' }}>Project</label>
          <select
            id="projectFilter"
            style={inputStyle}
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="">All Projects</option>
            {projects.map((project, index) => (
              <option key={index} value={project}>{project}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="statusFilter" style={{ display: 'block', marginBottom: SPACING.XS, fontWeight: '600' }}>Status</label>
          <select
            id="statusFilter"
            style={inputStyle}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        </div>
        
        <div style={{ overflowX: 'auto', borderRadius: '0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <table style={tableStyle}>
          <colgroup><col style={{ width: '14%' }}/><col style={{ width: '18%' }}/><col style={{ width: '15%' }}/><col style={{ width: '12%' }}/><col style={{ width: '14%' }}/><col style={{ width: '9%' }}/><col style={{ width: '6%' }}/><col style={{ width: '7%' }}/><col style={{ width: '5%' }}/></colgroup>
          <thead>
            <tr>
              <th style={thStyle}>Full Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Degree</th>
              <th style={thStyle}>Project</th>
              <th style={thStyle}>Experience</th>
              <th style={thStyle}>Applied Date</th>
              <th style={thStyle}>Status</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
              <th style={thStyle}>Resume</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={{ ...tdStyle, textAlign: 'center', padding: '2rem' }}>
                  Loading applicants...
                </td>
              </tr>
            ) : filteredApplicants.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ ...tdStyle, textAlign: 'center', padding: '2rem' }}>
                  No applicants found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredApplicants.map((applicant, index) => (
                <tr key={applicant.id} style={{ backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0.015)' : 'transparent' }}>
                  {/* Full Name */}
                  <td style={tdStyle}>
                    <div
                      title={`${applicant.firstName} ${applicant.lastName}`}
                      style={{ fontWeight: '600', color: COLORS.DARK_SERPENT }}
                    >
                      {applicant.firstName} {applicant.lastName}
                    </div>
                  </td>
                  
                  {/* Email */}
                  <td style={tdStyle}>
                    <div
                      title={applicant.email}
                      style={{
                        color: COLORS.DARK_SERPENT,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {applicant.email}
                    </div>
                  </td>
                  
                  {/* Degree */}
                  <td style={tdStyle}>
                    <div title={applicant.degree || ''} style={{ color: COLORS.DARK_SERPENT }}>
                      {applicant.degree || 'N/A'}
                    </div>
                  </td>
                  
                  {/* Project */}
                  <td style={tdStyle}>
                    <div
                      title={applicant.projectAppliedFor || ''}
                      style={{
                        fontWeight: '500',
                        color: COLORS.DARK_SERPENT,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {applicant.projectAppliedFor || 'N/A'}
                    </div>
                  </td>
                  
                  {/* Relevant Experience */}
                  <td style={tdStyle}>
                    <div
                      title={applicant.relevantExperience || ''}
                      style={{ 
                        color: COLORS.DARK_SERPENT,
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      {applicant.relevantExperience || 'N/A'}
                    </div>
                  </td>
                  
                  {/* Applied Date */}
                  <td style={tdStyle}>
                    <div style={{ color: COLORS.DARK_SERPENT, fontSize: '0.875rem' }}>
                      {applicant.createdAt ? (
                        new Date(applicant.createdAt).toLocaleString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })
                      ) : (
                        '—'
                      )}
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td style={tdStyle}>
                    <span style={statusBadgeStyle(applicant.status || 'pending')}>
                      {applicant.status || 'pending'}
                    </span>
                  </td>
                  
                  {/* Actions */}
                  <td style={{ ...tdStyle, textAlign: 'center', minWidth: '160px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <button
                        style={{
                          ...approveButtonStyle,
                          ...uniformActionSize,
                          opacity: applicant.status === 'approved' ? 0.5 : 1,
                        }}
                        onClick={() => updateApplicantStatus(applicant.id, 'approved')}
                        disabled={applicant.status === 'approved' || isProcessing}
                      >
                        ✓ Approve
                      </button>
                      <button
                        style={{
                          ...rejectButtonStyle,
                          ...uniformActionSize,
                          opacity: applicant.status === 'rejected' ? 0.5 : 1,
                        }}
                        onClick={() => updateApplicantStatus(applicant.id, 'rejected')}
                        disabled={applicant.status === 'rejected' || isProcessing}
                      >
                        ✕ Decline
                      </button>
                    </div>
                  </td>

                  {/* Resume File */}
                  <td style={{ ...tdStyle, textAlign: 'center', minWidth: '160px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => openResume(applicant)}
                        style={{
                          ...actionButtonStyle,
                          ...uniformActionSize,
                          backgroundColor: 'rgba(4, 98, 65, 0.12)',
                          color: COLORS.CASTLETON_GREEN,
                          border: `2px solid ${COLORS.CASTLETON_GREEN}`,
                        }}
                        title="View Resume"
                      >
                        👁️ View
                      </button>
                      <a
                        href={`${API_BASE_URL}/applicants/${applicant.id}/resume?download=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          ...actionButtonStyle,
                          ...uniformActionSize,
                          backgroundColor: 'rgba(255, 179, 71, 0.2)',
                          color: COLORS.DARK_SERPENT,
                          border: `2px solid ${COLORS.SAFFRON}`,
                          textDecoration: 'none',
                        }}
                        title="Download Resume"
                      >
                        📥 Download
                      </a>
                    </div>
                  </td>
                
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>

        {/* Resume Preview Modal */}
        {showResumeModal && (
          <div style={modalStyle} onClick={closeResume}>
            <div style={resumeModalContentStyle} onClick={(e) => e.stopPropagation()}>
              <h2 style={{
                ...TYPOGRAPHY.HEADLINE,
                color: COLORS.DARK_SERPENT,
                marginBottom: '1rem',
              }}>
                📄 Resume Preview
              </h2>
              <div style={{ 
                height: '70vh', 
                border: `2px solid ${COLORS.LIGHT_GRAY}`, 
                borderRadius: '0', 
                overflow: 'hidden', 
                marginBottom: '1rem',
                backgroundColor: COLORS.WHITE
              }}>
                <iframe
                  src={resumeUrl}
                  title="Resume Preview"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  onError={() => {
                    toast.error('Unable to preview resume. Please try downloading it.', {
                      position: 'top-right',
                      autoClose: 3000
                    });
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...actionButtonStyle,
                    backgroundColor: COLORS.CASTLETON_GREEN,
                    color: COLORS.WHITE,
                    textDecoration: 'none'
                  }}
                >
                  📥 Download
                </a>
                <button
                  onClick={closeResume}
                  style={{
                    ...actionButtonStyle,
                    backgroundColor: COLORS.DARK_GRAY,
                    color: COLORS.WHITE,
                  }}
                >
                  ✕ Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {(showAddForm || editingApplicant) && (
          <div style={modalStyle}>
            <div style={modalContentStyle}>
              <h2 style={{
                ...TYPOGRAPHY.HEADLINE,
                color: COLORS.DARK_SERPENT,
                marginBottom: '1.5rem',
              }}>
                {editingApplicant ? 'Edit Applicant' : 'Add New Applicant'}
              </h2>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
                
                <div>
                  <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </div>
              </div>
              
              
              
              <div style={{marginTop: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              
              <div style={{marginTop: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                />
              </div>
              
              <div style={{marginTop: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>
                  Project
                </label>
                <select
                  name="projectAppliedFor"
                  value={formData.projectAppliedFor}
                  onChange={handleInputChange}
                  style={inputStyle}
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>
              
              <div style={{marginTop: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600'}}>
                  Relevant Experience
                </label>
                <textarea
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleInputChange}
                  style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
                />
              </div>
              
              <div style={{marginTop: '2rem', display: 'flex', gap: '1rem'}}>
                <button onClick={handleSave} style={buttonStyle}>
                  {editingApplicant ? 'Update' : 'Add'} Applicant
                </button>
                <button
                  onClick={() => {
                    setEditingApplicant(null);
                    setShowAddForm(false);
                    resetForm();
                  }}
                  style={{
                    ...buttonStyle,
                    backgroundColor: COLORS.DARK_GRAY,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        <ToastContainer />
      </Container>
    </div>
  );
};

export default AdminDashboard;
