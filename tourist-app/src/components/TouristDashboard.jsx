import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from '../contexts/AuthContext';

export default function TouristDashboard() {
  const { user, logout } = useAuth();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(null);

  // Check location permission on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state);
        console.log('Location permission:', result.state);
      }).catch(() => {
        console.log('Permission query not supported');
      });
    }
  }, []);

  const sendPanicAlert = async () => {
    if (isLoading || !user) return;
    setIsLoading(true);
    
    console.log('🚨 EMERGENCY: Panic button activated!');
    setStatus('🚨 EMERGENCY ACTIVATED! Getting your location...');
    
    try {
      // Get current location with enhanced accuracy
      const position = await getHighAccuracyLocation();
      
      console.log('📍 Location obtained for emergency:', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: new Date(position.timestamp).toISOString()
      });
      
      setStatus(`📡 Sending emergency alert...\n📍 Location: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
      
      // Send panic alert with user's Firebase data
      const response = await axios.post("http://localhost:5000/panic", {
        digitalId: user.digitalId || user.uid,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        userId: user.uid,
        userName: user.name || user.displayName,
        userEmail: user.email,
        emergencyContact: user.emergencyContact
      });
      
      console.log('✅ Emergency alert sent successfully:', response.data);
      
      setStatus(`🚨 EMERGENCY ALERT SENT!\n\n✅ Emergency services notified\n📍 Your location has been shared\n📞 Emergency contact will be notified\n\n⏰ ${new Date().toLocaleString()}`);
      
    } catch (err) {
      console.error('❌ Emergency alert failed:', err);
      
      // Enhanced error handling for different scenarios
      if (err.message.includes('permission denied') || err.message.includes('Permission denied')) {
        setStatus('❌ LOCATION PERMISSION REQUIRED!\n\n🆘 Click "Allow" when prompted\n⚠️ Your safety depends on location sharing\n\n🔄 Please try again and allow location access');
      } else if (err.message.includes('unavailable') || err.message.includes('timeout')) {
        // Try network-based location as fallback
        setStatus('⏳ GPS timeout, trying network location...');
        try {
          const fallbackPosition = await getNetworkLocation();
          
          await axios.post("http://localhost:5000/panic", {
            digitalId: user.digitalId || user.uid,
            lat: fallbackPosition.coords.latitude,
            lng: fallbackPosition.coords.longitude,
            userId: user.uid,
            userName: user.name || user.displayName,
            userEmail: user.email,
            emergencyContact: user.emergencyContact
          });
          
          setStatus(`🚨 EMERGENCY ALERT SENT!\n\n⚠️ Used network location (less precise)\n📍 Approximate location shared\n📞 Emergency services notified`);
        } catch (fallbackErr) {
          console.error('❌ Network location also failed:', fallbackErr);
          setStatus('❌ Cannot determine location\n\n🚑 Sending alert without location\n📞 Please call emergency services directly');
          // Send alert without location as last resort
          try {
            await axios.post("http://localhost:5000/panic", {
              digitalId: user.digitalId || user.uid,
              lat: null,
              lng: null,
              userId: user.uid,
              userName: user.name || user.displayName,
              userEmail: user.email,
              emergencyContact: user.emergencyContact,
              note: 'Location unavailable'
            });
            setStatus('🚨 EMERGENCY ALERT SENT!\n\n⚠️ Location not available\n📞 Contact information shared\n🆘 Call emergency services: 911');
          } catch (finalErr) {
            setStatus('❌ ALERT FAILED!\n\n🆘 CALL EMERGENCY SERVICES NOW\n📞 Dial: 911 or local emergency number');
          }
        }
      } else {
        setStatus('❌ Emergency system error\n\n🆘 CALL EMERGENCY SERVICES NOW\n📞 Dial: 911 or local emergency number');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // High accuracy location for emergency situations
  const getHighAccuracyLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      
      console.log('🎯 Getting high-accuracy location for emergency...');
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('✅ Emergency location obtained:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString()
          });
          resolve(position);
        },
        (error) => {
          console.error('❌ High accuracy location failed:', error);
          const errorMessages = {
            1: 'Location permission denied',
            2: 'Location unavailable',
            3: 'Location request timeout'
          };
          reject(new Error(errorMessages[error.code] || 'Unknown location error'));
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,    // 20 seconds for emergency
          maximumAge: 0      // Always fresh location
        }
      );
    });
  };
  
  // Network-based location fallback
  const getNetworkLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      
      console.log('📶 Trying network-based location...');
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('✅ Network location obtained:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          resolve(position);
        },
        (error) => {
          console.error('❌ Network location failed:', error);
          const errorMessages = {
            1: 'Location permission denied',
            2: 'Location unavailable',
            3: 'Location request timeout'
          };
          reject(new Error(errorMessages[error.code] || 'Unknown location error'));
        },
        {
          enableHighAccuracy: false,  // Use WiFi/cell tower location
          timeout: 30000,             // Longer timeout
          maximumAge: 60000          // Accept 1-minute old cached location
        }
      );
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1>🚨 Emergency Dashboard</h1>
        <div style={userInfoStyle}>
          <div>
            <strong>Welcome, {user.name || user.displayName || 'Tourist'}</strong><br/>
            <small>Digital ID: {user.digitalId || user.uid.slice(0, 8)}</small>
          </div>
          <button onClick={handleLogout} style={logoutBtnStyle}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Location Permission Warning */}
      {locationPermission === 'denied' && (
        <div style={warningStyle}>
          ⚠️ <strong>Location Access Blocked</strong><br/>
          Please enable location permissions for emergency alerts to work properly.
        </div>
      )}

      {/* Main Emergency Button */}
      <div style={emergencyAreaStyle}>
        <div style={emergencyTextStyle}>
          <h2>In case of emergency</h2>
          <p>Press the button below to send an immediate alert with your location to emergency services and your emergency contact.</p>
        </div>
        
        <button 
          onClick={sendPanicAlert}
          disabled={isLoading}
          style={{
            ...panicButtonStyle,
            opacity: isLoading ? 0.7 : 1,
            transform: isLoading ? 'scale(0.98)' : 'scale(1)',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? (
            <div>
              <div style={spinnerStyle}>⏳</div>
              <div>SENDING ALERT...</div>
            </div>
          ) : (
            <div>
              <div style={{fontSize: '48px', marginBottom: '10px'}}>🚨</div>
              <div style={{fontSize: '24px', fontWeight: 'bold'}}>EMERGENCY</div>
              <div style={{fontSize: '16px', marginTop: '5px'}}>Tap for Help</div>
            </div>
          )}
        </button>
      </div>

      {/* Status Display */}
      {status && (
        <div style={statusBoxStyle}>
          <pre style={{margin: 0, whiteSpace: 'pre-wrap', textAlign: 'left'}}>{status}</pre>
        </div>
      )}

      {/* Emergency Contacts */}
      <div style={contactsStyle}>
        <h3>Emergency Contacts</h3>
        <div style={contactItemStyle}>
          <strong>📞 Personal Emergency:</strong> {user.emergencyContact || 'Not set'}
        </div>
        <div style={contactItemStyle}>
          <strong>🆘 Local Emergency:</strong> 911 (US) / 100 (India)
        </div>
      </div>
    </div>
  );
}

// Styles for Emergency Dashboard
const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  color: 'white',
  padding: '20px'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  background: 'rgba(255,255,255,0.1)',
  padding: '20px',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)'
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px'
};

const logoutBtnStyle = {
  background: 'rgba(255,255,255,0.2)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.3)',
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px'
};

const warningStyle = {
  background: '#fff3cd',
  color: '#856404',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '20px',
  border: '1px solid #ffeaa7',
  textAlign: 'center'
};

const emergencyAreaStyle = {
  textAlign: 'center',
  background: 'rgba(255,255,255,0.1)',
  padding: '40px',
  borderRadius: '20px',
  marginBottom: '30px',
  backdropFilter: 'blur(10px)'
};

const emergencyTextStyle = {
  marginBottom: '30px'
};

const panicButtonStyle = {
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #ff4757, #ff3742)',
  border: '5px solid white',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(255, 71, 87, 0.4)',
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const spinnerStyle = {
  fontSize: '32px',
  animation: 'spin 1s linear infinite'
};

const statusBoxStyle = {
  background: 'rgba(0,0,0,0.3)',
  padding: '20px',
  borderRadius: '15px',
  marginBottom: '20px',
  fontSize: '16px',
  lineHeight: '1.5',
  backdropFilter: 'blur(5px)'
};

const contactsStyle = {
  background: 'rgba(255,255,255,0.1)',
  padding: '20px',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)'
};

const contactItemStyle = {
  padding: '10px 0',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  fontSize: '16px'
};
