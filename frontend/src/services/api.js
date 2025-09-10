import axios from 'axios';

// Prefer environment variable set at build time (Vercel/Netlify)
// Example: REACT_APP_API_BASE_URL=https://your-backend.onrender.com/api
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token only for admin endpoints
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  const url = (config.url || '').toString();
  const normalized = url.startsWith('/') ? url.slice(1) : url;
  const isAdminEndpoint = normalized.startsWith('admin') || normalized.includes('admin/');
  if (token && isAdminEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // If sending FormData, let browser set proper multipart boundary
  if (config.data instanceof FormData) {
    if (config.headers && config.headers['Content-Type']) {
      delete config.headers['Content-Type'];
    }
  } else {
    // default JSON for non-FormData if not already set
    config.headers = {
      'Content-Type': 'application/json',
      ...(config.headers || {}),
      Authorization: config.headers?.Authorization,
    };
  }
  return config;
});

// Applicant API
export const applicantAPI = {
  getAll: () => api.get('applicants'),
  getById: (id) => api.get(`applicants/${id}`),
  create: (data) => api.post('applicants', data),
  update: (id, data) => api.put(`applicants/${id}`, data),
  updateStatus: (id, status) => api.put(`applicants/${id}/status`, { status }),
  approve: (id) => api.put(`applicants/${id}/approve`),
  decline: (id) => api.put(`applicants/${id}/decline`),
  delete: (id) => api.delete(`applicants/${id}`),
  getByProject: (project) => api.get(`applicants/project/${project}`),
  searchByName: (name) => api.get(`applicants/search?name=${name}`),
  uploadResume: (id, file) => {
    const fd = new FormData();
    fd.append('resume', file);
    return api.put(`applicants/${id}/resume`, fd);
  },
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('admin/login', credentials),
  validate: () => api.get('admin/validate'),
};

// Projects API
export const projectsAPI = {
  getAll: () => api.get('projects'),
};

export default api;

// Helper: fetch resume as Blob for inline preview in AdminDashboard
export const fetchResumeBlob = (id) =>
  api.get(`applicants/${id}/resume`, { responseType: 'blob' });
