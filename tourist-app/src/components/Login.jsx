import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = ({ onSwitchToRegister }) => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    otp: ''
  });
  const [showOTP, setShowOTP] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login, signInWithGoogle, sendOTP, verifyOTP, setupRecaptcha, error, setError } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear errors when user types
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    if (!formData.phoneNumber) {
      setError('Please enter phone number');
      return;
    }

    setLoading(true);
    try {
      setupRecaptcha('recaptcha-container');
      const confirmation = await sendOTP(formData.phoneNumber);
      setConfirmationResult(confirmation);
      setShowOTP(true);
      setError('OTP sent to your phone');
    } catch (error) {
      console.error('Phone login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setError('Please enter OTP');
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(confirmationResult, formData.otp);
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1>🚨 Tourist Safety Login</h1>
          <p>Sign in to access your emergency dashboard</p>
        </div>

        {error && <div style={errorStyle}>{error}</div>}

        <div style={tabsStyle}>
          <button
            style={{
              ...tabButtonStyle,
              ...(loginMethod === 'email' ? activeTabStyle : {})
            }}
            onClick={() => {
              setLoginMethod('email');
              setShowOTP(false);
              setError('');
            }}
          >
            📧 Email
          </button>
          <button
            style={{
              ...tabButtonStyle,
              ...(loginMethod === 'phone' ? activeTabStyle : {})
            }}
            onClick={() => {
              setLoginMethod('phone');
              setShowOTP(false);
              setError('');
            }}
          >
            📱 Phone
          </button>
        </div>

        {loginMethod === 'email' && (
          <form onSubmit={handleEmailLogin} style={formStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter your password"
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
              {loading ? '🔄 Signing In...' : '🔑 Sign In'}
            </button>
          </form>
        )}

        {loginMethod === 'phone' && !showOTP && (
          <form onSubmit={handlePhoneLogin} style={formStyle}>
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

            <button
              type="submit"
              style={{
                ...primaryButtonStyle,
                opacity: loading ? 0.7 : 1
              }}
              disabled={loading}
            >
              {loading ? '📱 Sending OTP...' : '📱 Send OTP'}
            </button>
          </form>
        )}

        {loginMethod === 'phone' && showOTP && (
          <form onSubmit={handleOTPVerify} style={formStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="123456"
                maxLength="6"
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
              {loading ? '🔄 Verifying...' : '✅ Verify OTP'}
            </button>

            <button
              type="button"
              onClick={() => setShowOTP(false)}
              style={secondaryButtonStyle}
            >
              ← Back to Phone Number
            </button>
          </form>
        )}

        <div style={dividerStyle}>
          <span>OR</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          style={{
            ...googleButtonStyle,
            opacity: loading ? 0.7 : 1
          }}
          disabled={loading}
        >
          {loading ? '🔄 Signing In...' : '🔵 Sign in with Google'}
        </button>

        <div style={footerStyle}>
          <p>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              style={linkButtonStyle}
            >
              Register here
            </button>
          </p>
        </div>

        <div id="recaptcha-container"></div>
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
  maxWidth: '450px'
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

const tabsStyle = {
  display: 'flex',
  marginBottom: '25px'
};

const tabButtonStyle = {
  flex: 1,
  padding: '12px',
  border: '1px solid #ddd',
  background: '#f8f9fa',
  cursor: 'pointer',
  fontSize: '16px'
};

const activeTabStyle = {
  background: '#007bff',
  color: 'white',
  borderColor: '#007bff'
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

const secondaryButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '14px',
  cursor: 'pointer'
};

const googleButtonStyle = {
  width: '100%',
  padding: '15px',
  backgroundColor: '#4285f4',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginBottom: '20px'
};

const dividerStyle = {
  textAlign: 'center',
  margin: '20px 0',
  color: '#666'
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

export default Login;