import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="logo-icon">₿</span>
              <span className="logo-text">Crypto</span>Trade Pro
            </h3>
            <p className="footer-description">
              Your trusted platform for cryptocurrency trading. Advanced tools, 
              secure transactions, and real-time market data for professional traders.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Twitter" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Discord" className="social-link">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" aria-label="Telegram" className="social-link">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" aria-label="Reddit" className="social-link">
                <i className="fab fa-reddit"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Trading</h4>
            <ul className="footer-links">
              <li><Link to="/trade">Spot Trading</Link></li>
              <li><Link to="/markets">Markets</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/wallet">Wallet</Link></li>
              <li>Margin Trading</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li>API Documentation</li>
              <li>Fee Schedule</li>
              <li>Security</li>
              <li>Status Page</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>News</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>support@cryptotrade.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-headset"></i>
                <span>24/7 Live Chat</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-shield-alt"></i>
                <span>Security: security@cryptotrade.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>© 2024 CryptoTrade Pro. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/aml">AML/KYC</Link>
            </div>
          </div>
          <div className="risk-warning">
            <p>⚠️ Cryptocurrency trading involves substantial risk and can result in the loss of your invested capital.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer