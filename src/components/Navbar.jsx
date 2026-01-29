import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <span className="logo-icon">₿</span>
            <span className="logo-text">Crypto</span>Trade Pro
          </Link>
          
          <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
              Dashboard
            </Link>
            <Link to="/trade" className={`nav-link ${location.pathname === '/trade' ? 'active' : ''}`} onClick={closeMenu}>
              Trade
            </Link>
            <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`} onClick={closeMenu}>
              Portfolio
            </Link>
            <Link to="/markets" className={`nav-link ${location.pathname === '/markets' ? 'active' : ''}`} onClick={closeMenu}>
              Markets
            </Link>
            <Link to="/wallet" className={`nav-link ${location.pathname === '/wallet' ? 'active' : ''}`} onClick={closeMenu}>
              Wallet
            </Link>
            <Link to="/login" className="btn btn-primary nav-cta" onClick={closeMenu}>
              Sign In
            </Link>
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            <span className={`bar ${isOpen ? 'active' : ''}`}></span>
            <span className={`bar ${isOpen ? 'active' : ''}`}></span>
            <span className={`bar ${isOpen ? 'active' : ''}`}></span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar