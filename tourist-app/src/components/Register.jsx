import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    emergencyContact: ''
  });
  const [loading, setLoading] = useState(false);

  const { register, error, setError } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear errors when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        emergencyContact: formData.emergencyContact
      });
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1>🚨 Tourist Safety Registration</h1>
          <p>Create your emergency account</p>
        </div>

        {error && <div style={errorStyle}>{error}</div>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter your full name"
              disabled={loading}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter your email"
              disabled={loading}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Create a password (min 6 characters)"
              disabled={loading}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Confirm your password"
              disabled={loading}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="+91 1234567890"
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Emergency Contact</label>
            <input
              type="tel"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Emergency contact number"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            style={{
              ...primaryButtonStyle,
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? '🔄 Creating Account...' : '✅ Register'}
          </button>
        </form>

        <div style={footerStyle}>
          <p>
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              style={linkButtonStyle}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '20px'
};

const cardStyle = {
  background: 'white',
  borderRadius: '15px',
  padding: '40px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
  width: '100%',
  maxWidth: '500px'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px'
};

const errorStyle = {
  backgroundColor: '#fee',
  color: '#c33',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '20px',
  border: '1px solid #fcc'
};

const formStyle = {
  marginBottom: '20px'
};

const inputGroupStyle = {
  marginBottom: '20px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#333'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '2px solid #ddd',
  borderRadius: '8px',
  fontSize: '16px',
  boxSizing: 'border-box'
};

const primaryButtonStyle = {
  width: '100%',
  padding: '15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginBottom: '10px'
};

const footerStyle = {
  textAlign: 'center'
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Register;