import { useState, useEffect } from 'react'
import '../pages/Portfolio.css'

const Portfolio = () => {
  const [portfolioData] = useState({
    totalValue: 25478.50,
    totalChange: 1245.75,
    totalChangePercent: 5.2,
    holdings: [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 0.5,
        avgPrice: 40000.00,
        currentPrice: 42567.89,
        value: 21283.95,
        change: 1283.95,
        changePercent: 6.4,
        allocation: 83.5
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 1.2,
        avgPrice: 2200.00,
        currentPrice: 2456.32,
        value: 2947.58,
        change: 307.58,
        changePercent: 11.7,
        allocation: 11.6
      },
      {
        symbol: 'BNB',
        name: 'Binance Coin',
        amount: 5.0,
        avgPrice: 300.00,
        currentPrice: 324.56,
        value: 1622.80,
        change: 122.80,
        changePercent: 8.2,
        allocation: 6.4
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        amount: 15.5,
        avgPrice: 75.00,
        currentPrice: 89.23,
        value: 1383.07,
        change: 220.57,
        changePercent: 19.3,
        allocation: 5.4
      }
    ]
  })

  const [sortBy, setSortBy] = useState('value')
  const [sortOrder, setSortOrder] = useState('desc')

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

  const sortedHoldings = [...portfolioData.holdings].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]
    
    if (sortOrder === 'desc') {
      return bValue - aValue
    } else {
      return aValue - bValue
    }
  })

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="portfolio">
      <div className="container">
        {/* Portfolio Overview */}
        <div className="portfolio-overview">
          <div className="overview-grid">
            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-label">Total Portfolio Value</span>
                <span className={`overview-change ${getChangeClass(portfolioData.totalChangePercent)}`}>
                  {portfolioData.totalChangePercent > 0 ? '+' : ''}{portfolioData.totalChangePercent.toFixed(2)}%
                </span>
              </div>
              <div className="overview-value">{formatCurrency(portfolioData.totalValue)}</div>
              <div className="overview-sub">
                {portfolioData.totalChange > 0 ? '+' : ''}{formatCurrency(Math.abs(portfolioData.totalChange))} today
              </div>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-label">Total Holdings</span>
              </div>
              <div className="overview-value">{portfolioData.holdings.length}</div>
              <div className="overview-sub">Different Assets</div>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-label">24h Volume</span>
              </div>
              <div className="overview-value">$2.6B</div>
              <div className="overview-sub">Trading Volume</div>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-label">Win Rate</span>
              </div>
              <div className="overview-value">75%</div>
              <div className="overview-sub">Profitable Trades</div>
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="holdings-section">
          <div className="section-header">
            <h2 className="section-title">Portfolio Holdings</h2>
            <div className="section-actions">
              <button className="btn btn-secondary">Export CSV</button>
              <button className="btn btn-secondary">Performance</button>
            </div>
          </div>

          <div className="holdings-table">
            <table>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th onClick={() => handleSort('amount')} className="sortable">
                    Amount
                    {sortBy === 'amount' && (
                      <span className="sort-indicator">
                        {sortOrder === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('avgPrice')} className="sortable">
                    Avg Price
                    {sortBy === 'avgPrice' && (
                      <span className="sort-indicator">
                        {sortOrder === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('currentPrice')} className="sortable">
                    Current Price
                    {sortBy === 'currentPrice' && (
                      <span className="sort-indicator">
                        {sortOrder === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('value')} className="sortable">
                    Value
                    {sortBy === 'value' && (
                      <span className="sort-indicator">
                        {sortOrder === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </th>
                  <th onClick={() => handleSort('changePercent')} className="sortable">
                    24h Change
                    {sortBy === 'changePercent' && (
                      <span className="sort-indicator">
                        {sortOrder === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </th>
                  <th>Allocation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedHoldings.map((holding, index) => (
                  <tr key={index}>
                    <td>
                      <div className="asset-info">
                        <div className="asset-symbol">{holding.symbol}</div>
                        <div className="asset-name">{holding.name}</div>
                      </div>
                    </td>
                    <td>{holding.amount}</td>
                    <td>{formatCurrency(holding.avgPrice)}</td>
                    <td>{formatCurrency(holding.currentPrice)}</td>
                    <td>
                      <div className="value-cell">
                        <span className="value-amount">{formatCurrency(holding.value)}</span>
                        <span className={`value-change ${getChangeClass(holding.change)}`}>
                          {holding.change > 0 ? '+' : ''}{formatCurrency(holding.change)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={getChangeClass(holding.changePercent)}>
                        {holding.changePercent > 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                      </span>
                    </td>
                    <td>
                      <div className="allocation-cell">
                        <div className="allocation-bar">
                          <div 
                            className="allocation-fill" 
                            style={{ width: `${holding.allocation}%` }}
                          ></div>
                        </div>
                        <span className="allocation-text">{holding.allocation.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-primary btn-sm">Trade</button>
                        <button className="btn btn-secondary btn-sm">Details</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="performance-section">
          <div className="section-header">
            <h2 className="section-title">Portfolio Performance</h2>
            <div className="time-filters">
              <button className="filter-btn active">1D</button>
              <button className="filter-btn">7D</button>
              <button className="filter-btn">30D</button>
              <button className="filter-btn">90D</button>
              <button className="filter-btn">1Y</button>
            </div>
          </div>

          <div className="performance-chart">
            <div className="chart-placeholder">
              <div className="chart-simulation">
                <svg width="100%" height="300">
                  <defs>
                    <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#00d2ff', stopOpacity: 0.8}} />
                      <stop offset="100%" style={{stopColor: '#7f53ff', stopOpacity: 0.2}} />
                    </linearGradient>
                  </defs>
                  <path d="M0,250 L50,240 L100,220 L150,230 L200,210 L250,190 L300,200 L350,180 L400,160 L450,170 L500,150" 
                        stroke="url(#performanceGradient)" 
                        strokeWidth="3" 
                        fill="none" />
                  <rect x="0" y="150" width="500" height="100" fill="url(#performanceGradient)" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Allocation Analysis */}
        <div className="allocation-section">
          <div className="section-header">
            <h2 className="section-title">Asset Allocation</h2>
          </div>

          <div className="allocation-grid">
            <div className="allocation-chart">
              <div className="chart-placeholder">
                <div className="pie-chart-simulation">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#333" strokeWidth="160" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#00d2ff" strokeWidth="160" strokeDasharray="260 500" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#7f53ff" strokeWidth="160" strokeDasharray="70 500" strokeDashoffset="-260" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#ffd166" strokeWidth="160" strokeDasharray="40 500" strokeDashoffset="-330" />
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#ff6b81" strokeWidth="160" strokeDasharray="30 500" strokeDashoffset="-370" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="allocation-details">
              <div className="allocation-list">
                {portfolioData.holdings.map((holding, index) => (
                  <div key={index} className="allocation-item">
                    <div className="allocation-info">
                      <div className="allocation-color" style={{ backgroundColor: getColorByIndex(index) }}></div>
                      <div className="allocation-text">
                        <span className="allocation-symbol">{holding.symbol}</span>
                        <span className="allocation-name">{holding.name}</span>
                      </div>
                    </div>
                    <div className="allocation-value">
                      <span className="allocation-percent">{holding.allocation.toFixed(1)}%</span>
                      <span className="allocation-amount">{formatCurrency(holding.value)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <div className="section-header">
            <h2 className="section-title">Recent Activity</h2>
            <button className="btn btn-secondary">View All</button>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-type buy">Buy</div>
              <div className="activity-details">
                <div className="activity-main">
                  <span className="activity-asset">BTC</span>
                  <span className="activity-amount">0.1 BTC</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-price">$42,567.89</span>
                  <span className="activity-time">2 min ago</span>
                </div>
              </div>
              <div className="activity-value price-up">-$4,256.79</div>
            </div>

            <div className="activity-item">
              <div className="activity-type sell">Sell</div>
              <div className="activity-details">
                <div className="activity-main">
                  <span className="activity-asset">ETH</span>
                  <span className="activity-amount">0.5 ETH</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-price">$2,456.32</span>
                  <span className="activity-time">15 min ago</span>
                </div>
              </div>
              <div className="activity-value price-down">+$1,228.16</div>
            </div>

            <div className="activity-item">
              <div className="activity-type deposit">Deposit</div>
              <div className="activity-details">
                <div className="activity-main">
                  <span className="activity-asset">USDT</span>
                  <span className="activity-amount">5,000 USDT</span>
                </div>
                <div className="activity-meta">
                  <span className="activity-price">-</span>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>
              <div className="activity-value price-neutral">+$5,000.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getColorByIndex(index) {
  const colors = ['#00d2ff', '#7f53ff', '#ffd166', '#ff6b81']
  return colors[index % colors.length]
}

export default Portfolio