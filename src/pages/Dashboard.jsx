import { useState, useEffect } from 'react'
import '../pages/Dashboard.css'

const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(25478.50)
  const [dailyChange, setDailyChange] = useState(1245.75)
  const [portfolioChangePercent, setPortfolioChangePercent] = useState(5.2)

  const [marketData] = useState([
    { symbol: 'BTC/USD', price: 42567.89, change: 2.5, volume: '1.2B' },
    { symbol: 'ETH/USD', price: 2456.32, change: -1.2, volume: '850M' },
    { symbol: 'BNB/USD', price: 324.56, change: 0.8, volume: '240M' },
    { symbol: 'SOL/USD', price: 89.23, change: 3.4, volume: '180M' },
    { symbol: 'ADA/USD', price: 0.456, change: -0.5, volume: '95M' },
    { symbol: 'XRP/USD', price: 0.823, change: 1.1, volume: '150M' }
  ])

  const [portfolioHoldings] = useState([
    { symbol: 'BTC', amount: 0.5, value: 21283.95, change: 2.5 },
    { symbol: 'ETH', amount: 1.2, value: 2947.58, change: -1.2 },
    { symbol: 'BNB', amount: 5.0, value: 1622.80, change: 0.8 },
    { symbol: 'SOL', amount: 15.5, value: 1383.07, change: 3.4 }
  ])

  const [recentActivity] = useState([
    { type: 'Buy', symbol: 'BTC', amount: '0.1 BTC', price: '$42,567.89', time: '2 min ago' },
    { type: 'Sell', symbol: 'ETH', amount: '0.5 ETH', price: '$2,456.32', time: '15 min ago' },
    { type: 'Deposit', symbol: 'USDT', amount: '5,000 USDT', price: '-', time: '1 hour ago' },
    { type: 'Withdrawal', symbol: 'BTC', amount: '0.05 BTC', price: '-', time: '3 hours ago' }
  ])

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setDailyChange(prev => prev + (Math.random() - 0.5) * 100)
      setPortfolioValue(prev => prev + (Math.random() - 0.5) * 100)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getChangeClass = (change) => {
    if (change > 0) return 'price-up'
    if (change < 0) return 'price-down'
    return 'price-neutral'
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1 className="welcome-title">Welcome to CryptoTrade Pro</h1>
            <p className="welcome-subtitle">Let's check your portfolio performance</p>
          </div>
          <div className="welcome-actions">
            <button className="btn btn-primary">Quick Trade</button>
            <button className="btn btn-secondary">Deposit Funds</button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="portfolio-overview">
          <div className="stat-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Portfolio Value</span>
                <span className="stat-change">
                  <span className={getChangeClass(portfolioChangePercent)}>
                    {portfolioChangePercent > 0 ? '+' : ''}{portfolioChangePercent.toFixed(2)}%
                  </span>
                </span>
              </div>
              <div className="stat-value">${portfolioValue.toLocaleString()}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">24h Change</span>
                <span className={getChangeClass(dailyChange)}>
                  {dailyChange > 0 ? '+' : ''}${Math.abs(dailyChange).toLocaleString()}
                </span>
              </div>
              <div className="stat-value">
                {dailyChange > 0 ? '+' : ''}${Math.abs(dailyChange).toLocaleString()}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Holdings</span>
              </div>
              <div className="stat-value">{portfolioHoldings.length} Assets</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">24h Volume</span>
              </div>
              <div className="stat-value">$2.6B</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Market Overview */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Market Overview</h3>
              <span className="market-status">Live</span>
            </div>
            <div className="market-table">
              <table>
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>Volume</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((asset, index) => (
                    <tr key={index}>
                      <td>
                        <div className="symbol-cell">
                          <span className="symbol">{asset.symbol}</span>
                        </div>
                      </td>
                      <td>{formatCurrency(asset.price)}</td>
                      <td>
                        <span className={getChangeClass(asset.change)}>
                          {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                        </span>
                      </td>
                      <td>{asset.volume}</td>
                      <td>
                        <button className="btn btn-secondary btn-sm">Trade</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Portfolio Holdings */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Portfolio Holdings</h3>
              <span className="portfolio-total">{formatCurrency(portfolioValue)}</span>
            </div>
            <div className="portfolio-list">
              {portfolioHoldings.map((holding, index) => (
                <div key={index} className="portfolio-item">
                  <div className="portfolio-info">
                    <span className="portfolio-symbol">{holding.symbol}</span>
                    <span className="portfolio-amount">{holding.amount} {holding.symbol}</span>
                  </div>
                  <div className="portfolio-values">
                    <div className="portfolio-value">{formatCurrency(holding.value)}</div>
                    <div className={getChangeClass(holding.change)}>
                      {holding.change > 0 ? '+' : ''}{holding.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Recent Activity</h3>
              <span className="activity-count">{recentActivity.length} items</span>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-type">
                    <span className={`type-badge ${activity.type.toLowerCase()}`}>
                      {activity.type}
                    </span>
                  </div>
                  <div className="activity-details">
                    <div className="activity-main">
                      <span className="activity-symbol">{activity.symbol}</span>
                      <span className="activity-amount">{activity.amount}</span>
                    </div>
                    <div className="activity-meta">
                      <span className="activity-price">{activity.price}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="activity-footer">
              <button className="btn btn-secondary">View All Activity</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="quick-actions">
              <div className="action-card">
                <div className="action-icon">💰</div>
                <div className="action-content">
                  <h4>Deposit</h4>
                  <p>Add funds to your account</p>
                </div>
                <button className="btn btn-primary">Deposit</button>
              </div>
              
              <div className="action-card">
                <div className="action-icon">💸</div>
                <div className="action-content">
                  <h4>Withdraw</h4>
                  <p>Withdraw your funds</p>
                </div>
                <button className="btn btn-secondary">Withdraw</button>
              </div>

              <div className="action-card">
                <div className="action-icon">📊</div>
                <div className="action-content">
                  <h4>Analytics</h4>
                  <p>View detailed analytics</p>
                </div>
                <button className="btn btn-secondary">Analytics</button>
              </div>

              <div className="action-card">
                <div className="action-icon">🔒</div>
                <div className="action-content">
                  <h4>Security</h4>
                  <p>Manage your security</p>
                </div>
                <button className="btn btn-secondary">Security</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard