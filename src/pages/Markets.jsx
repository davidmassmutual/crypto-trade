import { useState, useEffect } from 'react'
import '../pages/Markets.css'

const Markets = () => {
  const [marketsData] = useState([
    {
      symbol: 'BTC/USD',
      name: 'Bitcoin',
      price: 42567.89,
      change: 2.5,
      volume: '1.2B',
      marketCap: '832.5B',
      supply: '19.56M',
      high24h: 43200.00,
      low24h: 41800.00
    },
    {
      symbol: 'ETH/USD',
      name: 'Ethereum',
      price: 2456.32,
      change: -1.2,
      volume: '850M',
      marketCap: '295.1B',
      supply: '120.3M',
      high24h: 2520.00,
      low24h: 2380.00
    },
    {
      symbol: 'BNB/USD',
      name: 'Binance Coin',
      price: 324.56,
      change: 0.8,
      volume: '240M',
      marketCap: '50.2B',
      supply: '154.6M',
      high24h: 330.00,
      low24h: 318.00
    },
    {
      symbol: 'SOL/USD',
      name: 'Solana',
      price: 89.23,
      change: 3.4,
      volume: '180M',
      marketCap: '42.1B',
      supply: '472.1M',
      high24h: 92.50,
      low24h: 85.20
    },
    {
      symbol: 'ADA/USD',
      name: 'Cardano',
      price: 0.456,
      change: -0.5,
      volume: '95M',
      marketCap: '16.2B',
      supply: '35.5B',
      high24h: 0.465,
      low24h: 0.448
    },
    {
      symbol: 'XRP/USD',
      name: 'Ripple',
      price: 0.823,
      change: 1.1,
      volume: '150M',
      marketCap: '41.8B',
      supply: '50.8B',
      high24h: 0.845,
      low24h: 0.805
    },
    {
      symbol: 'DOT/USD',
      name: 'Polkadot',
      price: 7.23,
      change: 2.8,
      volume: '65M',
      marketCap: '9.1B',
      supply: '1.26B',
      high24h: 7.45,
      low24h: 7.02
    },
    {
      symbol: 'AVAX/USD',
      name: 'Avalanche',
      price: 28.45,
      change: -0.3,
      volume: '85M',
      marketCap: '11.2B',
      supply: '393.6M',
      high24h: 29.20,
      low24h: 27.80
    },
    {
      symbol: 'LINK/USD',
      name: 'Chainlink',
      price: 15.67,
      change: 1.9,
      volume: '75M',
      marketCap: '8.9B',
      supply: '568.2M',
      high24h: 16.10,
      low24h: 15.20
    },
    {
      symbol: 'MATIC/USD',
      name: 'Polygon',
      price: 1.23,
      change: 4.2,
      volume: '120M',
      marketCap: '12.8B',
      supply: '10.4B',
      high24h: 1.28,
      low24h: 1.18
    }
  ])

  const [sortBy, setSortBy] = useState('marketCap')
  const [sortOrder, setSortOrder] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getChangeClass = (change) => {
    if (change > 0) return 'price-up'
    if (change < 0) return 'price-down'
    return 'price-neutral'
  }

  const filteredMarkets = marketsData
    .filter(market => 
      market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (typeof aValue === 'string') {
        aValue = parseFloat(aValue.replace(/[^0-9.-]/g, ''))
        bValue = parseFloat(bValue.replace(/[^0-9.-]/g, ''))
      }
      
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
    <div className="markets">
      <div className="container">
        {/* Markets Header */}
        <div className="markets-header">
          <div className="header-content">
            <h1 className="markets-title">Markets</h1>
            <p className="markets-subtitle">Real-time cryptocurrency prices and market data</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-label">Total Markets</span>
              <span className="stat-value">{marketsData.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">$3.8B</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Dominance</span>
              <span className="stat-value">BTC: 42.3%</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="markets-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          <div className="category-filters">
            <button 
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${selectedCategory === 'large-cap' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('large-cap')}
            >
              Large Cap
            </button>
            <button 
              className={`filter-btn ${selectedCategory === 'mid-cap' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('mid-cap')}
            >
              Mid Cap
            </button>
            <button 
              className={`filter-btn ${selectedCategory === 'small-cap' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('small-cap')}
            >
              Small Cap
            </button>
          </div>
        </div>

        {/* Markets Table */}
        <div className="markets-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th onClick={() => handleSort('symbol')} className="sortable">
                  Asset
                  {sortBy === 'symbol' && (
                    <span className="sort-indicator">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('price')} className="sortable">
                  Price
                  {sortBy === 'price' && (
                    <span className="sort-indicator">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('change')} className="sortable">
                  24h Change
                  {sortBy === 'change' && (
                    <span className="sort-indicator">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('volume')} className="sortable">
                  24h Volume
                  {sortBy === 'volume' && (
                    <span className="sort-indicator">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort('marketCap')} className="sortable">
                  Market Cap
                  {sortBy === 'marketCap' && (
                    <span className="sort-indicator">
                      {sortOrder === 'desc' ? '↓' : '↑'}
                    </span>
                  )}
                </th>
                <th>24h Range</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMarkets.map((market, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="asset-info">
                      <div className="asset-symbol">{market.symbol}</div>
                      <div className="asset-name">{market.name}</div>
                    </div>
                  </td>
                  <td>{formatCurrency(market.price)}</td>
                  <td>
                    <span className={getChangeClass(market.change)}>
                      {market.change > 0 ? '+' : ''}{market.change.toFixed(2)}%
                    </span>
                  </td>
                  <td>{market.volume}</td>
                  <td>{market.marketCap}</td>
                  <td>
                    <div className="range-cell">
                      <span className="range-high">{formatCurrency(market.high24h)}</span>
                      <span className="range-separator">/</span>
                      <span className="range-low">{formatCurrency(market.low24h)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-primary btn-sm">Trade</button>
                      <button className="btn btn-secondary btn-sm">Chart</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Market Categories */}
        <div className="market-categories">
          <div className="category-card">
            <div className="category-header">
              <h3>Large Cap</h3>
              <span className="category-count">3 assets</span>
            </div>
            <div className="category-list">
              {marketsData.slice(0, 3).map((market, index) => (
                <div key={index} className="category-item">
                  <div className="category-asset">
                    <span className="category-symbol">{market.symbol}</span>
                    <span className="category-price">{formatCurrency(market.price)}</span>
                  </div>
                  <span className={getChangeClass(market.change)}>
                    {market.change > 0 ? '+' : ''}{market.change.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="category-card">
            <div className="category-header">
              <h3>Mid Cap</h3>
              <span className="category-count">4 assets</span>
            </div>
            <div className="category-list">
              {marketsData.slice(3, 7).map((market, index) => (
                <div key={index} className="category-item">
                  <div className="category-asset">
                    <span className="category-symbol">{market.symbol}</span>
                    <span className="category-price">{formatCurrency(market.price)}</span>
                  </div>
                  <span className={getChangeClass(market.change)}>
                    {market.change > 0 ? '+' : ''}{market.change.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="category-card">
            <div className="category-header">
              <h3>Small Cap</h3>
              <span className="category-count">3 assets</span>
            </div>
            <div className="category-list">
              {marketsData.slice(7, 10).map((market, index) => (
                <div key={index} className="category-item">
                  <div className="category-asset">
                    <span className="category-symbol">{market.symbol}</span>
                    <span className="category-price">{formatCurrency(market.price)}</span>
                  </div>
                  <span className={getChangeClass(market.change)}>
                    {market.change > 0 ? '+' : ''}{market.change.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Summary */}
        <div className="market-summary">
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-header">
                <span className="summary-label">Market Cap</span>
                <span className="summary-change price-up">+2.1%</span>
              </div>
              <div className="summary-value">$1.4T</div>
              <div className="summary-sub">Total market capitalization</div>
            </div>

            <div className="summary-card">
              <div className="summary-header">
                <span className="summary-label">24h Volume</span>
                <span className="summary-change price-down">-1.2%</span>
              </div>
              <div className="summary-value">$3.8B</div>
              <div className="summary-sub">Total trading volume</div>
            </div>

            <div className="summary-card">
              <div className="summary-header">
                <span className="summary-label">Dominance</span>
              </div>
              <div className="dominance-list">
                <div className="dominance-item">
                  <span className="dominance-name">BTC</span>
                  <span className="dominance-value">42.3%</span>
                </div>
                <div className="dominance-item">
                  <span className="dominance-name">ETH</span>
                  <span className="dominance-value">18.7%</span>
                </div>
                <div className="dominance-item">
                  <span className="dominance-name">Others</span>
                  <span className="dominance-value">39.0%</span>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-header">
                <span className="summary-label">Fear & Greed</span>
                <span className="summary-change price-up">+15</span>
              </div>
              <div className="fear-greed-meter">
                <div className="meter-fill" style={{ width: '65%' }}></div>
                <span className="meter-value">65 (Greed)</span>
              </div>
              <div className="summary-sub">Market sentiment indicator</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Markets