import { useState } from 'react'
import '../pages/Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'demo123') {
        alert('Login successful!')
        // In a real app, you would redirect to dashboard
      } else {
        setError('Invalid email or password')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <div className="logo">
              <span className="logo-icon">₿</span>
              <span className="logo-text">Crypto</span>Trade Pro
            </div>
            <h1 className="login-title">Welcome to CryptoTrade Pro</h1>
            <p className="login-subtitle">Sign in to your account to continue</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="form-input"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading"></span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="signup-text">
              Don't have an account? <a href="#" className="signup-link">Sign up here</a>
            </p>
            
            <div className="demo-credentials">
              <p className="demo-label">Demo Credentials:</p>
              <div className="demo-info">
                <span className="demo-item">Email: demo@example.com</span>
                <span className="demo-item">Password: demo123</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-visual">
          <div className="visual-content">
            <h2 className="visual-title">Secure Trading Platform</h2>
            <p className="visual-subtitle">
              Join thousands of traders who trust our platform for their cryptocurrency needs.
              Advanced security, real-time data, and professional tools.
            </p>
            
            <div className="security-features">
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span className="feature-text">256-bit Encryption</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📱</span>
                <span className="feature-text">Two-Factor Authentication</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <span className="feature-text">Cold Storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login