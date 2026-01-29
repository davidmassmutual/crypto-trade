import { useState, useEffect } from 'react'
import '../pages/Trade.css'

const Trade = () => {
  const [selectedPair, setSelectedPair] = useState('BTC/USD')
  const [currentPrice, setCurrentPrice] = useState(42567.89)
  const [orderType, setOrderType] = useState('market')
  const [tradeType, setTradeType] = useState('buy')
  const [amount, setAmount] = useState('')
  const [total, setTotal] = useState('')
  const [stopPrice, setStopPrice] = useState('')
  const [limitPrice, setLimitPrice] = useState('')

  const [orderBook] = useState({
    bids: [
      { price: 42567.89, amount: 1.250, total: 53209.86 },
      { price: 42560.50, amount: 0.850, total: 36176.43 },
      { price: 42550.00, amount: 2.100, total: 89355.00 },
      { price: 42540.25, amount: 0.500, total: 21270.13 },
      { price: 42530.00, amount: 3.200, total: 136096.00 }
    ],
    asks: [
      { price: 42575.00, amount: 1.800, total: 76635.00 },
      { price: 42585.25, amount: 0.750, total: 31938.94 },
      { price: 42595.00, amount: 2.500, total: 106487.50 },
      { price: 42600.50, amount: 1.200, total: 51120.60 },
      { price: 42610.00, amount: 0.900, total: 38349.00 }
    ]
  })

  const [tradeHistory] = useState([
    { time: '14:32:15', price: 42567.89, amount: 0.1, type: 'buy' },
    { time: '14:32:10', price: 42565.50, amount: 0.05, type: 'sell' },
    { time: '14:32:05', price: 42568.00, amount: 0.2, type: 'buy' },
    { time: '14:32:00', price: 42562.25, amount: 0.15, type: 'sell' },
    { time: '14:31:55', price: 42569.50, amount: 0.08, type: 'buy' }
  ])

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 100
      setCurrentPrice(prev => Math.max(0, prev + change))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const calculateTotal = () => {
    if (!amount || isNaN(amount)) return ''
    const totalValue = parseFloat(amount) * currentPrice
    setTotal(totalValue.toFixed(2))
  }

  useEffect(() => {
    calculateTotal()
  }, [amount, currentPrice])

  const handleTrade = () => {
    const tradeAmount = parseFloat(amount)
    if (!tradeAmount || tradeAmount <= 0) {
      alert('Please enter a valid amount')
      return
    }

    const tradeDetails = {
      type: tradeType,
      pair: selectedPair,
      amount: tradeAmount,
      price: currentPrice,
      total: tradeAmount * currentPrice,
      timestamp: new Date().toLocaleTimeString()
    }

    console.log('Trade executed:', tradeDetails)
    alert(`${tradeType.toUpperCase()} order executed for ${tradeAmount} ${selectedPair.split('/')[0]}`)
    
    // Reset form
    setAmount('')
    setTotal('')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getChangeClass = (type) => {
    return type === 'buy' ? 'price-up' : 'price-down'
  }

  return (
    <div className="trade">
      <div className="container">
        <div className="trade-header">
          <div className="pair-selector">
            <h1 className="trade-title">{selectedPair}</h1>
            <div className="price-info">
              <span className="current-price">{formatCurrency(currentPrice)}</span>
              <span className="price-change price-up">+2.5%</span>
            </div>
          </div>
          <div className="trade-actions">
            <button className="btn btn-secondary">Chart Settings</button>
            <button className="btn btn-secondary">Indicators</button>
            <button className="btn btn-secondary">Timeframe</button>
          </div>
        </div>

        <div className="trade-layout">
          {/* Chart Area */}
          <div className="chart-section">
            <div className="chart-container">
              <div className="chart-placeholder">
                <div className="chart-header">
                  <h3>Price Chart</h3>
                  <div className="chart-tools">
                    <button className="chart-btn active">Candle</button>
                    <button className="chart-btn">Line</button>
                    <button className="chart-btn">Area</button>
                  </div>
                </div>
                <div className="chart-content">
                  <div className="chart-simulation">
                    <div className="candlestick-chart">
                      {/* Simulated chart visualization */}
                      <div className="chart-line">
                        <svg width="100%" height="100%">
                          <defs>
                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" style={{stopColor: '#00d2ff', stopOpacity: 0.8}} />
                              <stop offset="100%" style={{stopColor: '#7f53ff', stopOpacity: 0.2}} />
                            </linearGradient>
                          </defs>
                          <path d="M0,200 L50,180 L100,160 L150,190 L200,170 L250,150 L300,180 L350,160 L400,140 L450,160 L500,130" 
                                stroke="url(#chartGradient)" 
                                strokeWidth="2" 
                                fill="none" />
                          <rect x="0" y="130" width="500" height="70" fill="url(#chartGradient)" opacity="0.3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="trading-panel">
            <div className="trading-card">
              <div className="card-header">
                <h3 className="card-title">New Order</h3>
                <div className="order-type-selector">
                  <button 
                    className={`type-btn ${orderType === 'market' ? 'active' : ''}`}
                    onClick={() => setOrderType('market')}
                  >
                    Market
                  </button>
                  <button 
                    className={`type-btn ${orderType === 'limit' ? 'active' : ''}`}
                    onClick={() => setOrderType('limit')}
                  >
                    Limit
                  </button>
                  <button 
                    className={`type-btn ${orderType === 'stop' ? 'active' : ''}`}
                    onClick={() => setOrderType('stop')}
                  >
                    Stop
                  </button>
                </div>
              </div>

              <div className="trade-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Trade Type</label>
                    <div className="trade-type-selector">
                      <button 
                        className={`trade-btn buy ${tradeType === 'buy' ? 'active' : ''}`}
                        onClick={() => setTradeType('buy')}
                      >
                        Buy
                      </button>
                      <button 
                        className={`trade-btn sell ${tradeType === 'sell' ? 'active' : ''}`}
                        onClick={() => setTradeType('sell')}
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Amount ({selectedPair.split('/')[0]})</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.0001"
                    />
                    <div className="amount-quick">
                      <button onClick={() => setAmount('0.01')}>0.01</button>
                      <button onClick={() => setAmount('0.1')}>0.1</button>
                      <button onClick={() => setAmount('0.5')}>0.5</button>
                      <button onClick={() => setAmount('1.0')}>1.0</button>
                    </div>
                  </div>
                </div>

                {orderType === 'limit' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Limit Price (USD)</label>
                      <input
                        type="number"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(e.target.value)}
                        placeholder={currentPrice.toString()}
                      />
                    </div>
                  </div>
                )}

                {orderType === 'stop' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label>Stop Price (USD)</label>
                      <input
                        type="number"
                        value={stopPrice}
                        onChange={(e) => setStopPrice(e.target.value)}
                        placeholder={(currentPrice * 1.01).toString()}
                      />
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label>Total (USD)</label>
                    <input
                      type="text"
                      value={total}
                      readOnly
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="trade-summary">
                  <div className="summary-item">
                    <span>Current Price</span>
                    <span>{formatCurrency(currentPrice)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Fee (0.1%)</span>
                    <span>{total ? formatCurrency(parseFloat(total) * 0.001) : '$0.00'}</span>
                  </div>
                  <div className="summary-item total-row">
                    <span>Total Cost</span>
                    <span>{total ? formatCurrency(parseFloat(total) * 1.001) : '$0.00'}</span>
                  </div>
                </div>

                <div className="trade-actions">
                  <button 
                    className={`btn ${tradeType === 'buy' ? 'btn-success' : 'btn-danger'}`}
                    onClick={handleTrade}
                    disabled={!amount || parseFloat(amount) <= 0}
                  >
                    {tradeType.toUpperCase()} {selectedPair.split('/')[0]}
                  </button>
                </div>
              </div>
            </div>

            {/* Order Book */}
            <div className="order-book-card">
              <div className="card-header">
                <h3 className="card-title">Order Book</h3>
                <span className="order-book-depth">Depth: {selectedPair}</span>
              </div>
              <div className="order-book">
                <div className="book-header">
                  <span>Price</span>
                  <span>Amount</span>
                  <span>Total</span>
                </div>
                
                <div className="book-section">
                  <h4>Bids</h4>
                  {orderBook.bids.map((bid, index) => (
                    <div key={index} className="book-row bid-row">
                      <span className="price price-up">{formatCurrency(bid.price)}</span>
                      <span className="amount">{bid.amount}</span>
                      <span className="total">{formatCurrency(bid.total)}</span>
                    </div>
                  ))}
                </div>

                <div className="book-section">
                  <h4>Asks</h4>
                  {orderBook.asks.map((ask, index) => (
                    <div key={index} className="book-row ask-row">
                      <span className="price price-down">{formatCurrency(ask.price)}</span>
                      <span className="amount">{ask.amount}</span>
                      <span className="total">{formatCurrency(ask.total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trade History */}
          <div className="trade-history">
            <div className="card-header">
              <h3 className="card-title">Recent Trades</h3>
              <span className="trade-count">Last 24h</span>
            </div>
            <div className="history-list">
              {tradeHistory.map((trade, index) => (
                <div key={index} className="history-item">
                  <span className="trade-time">{trade.time}</span>
                  <span className={`trade-type ${trade.type}`}>{trade.type.toUpperCase()}</span>
                  <span className="trade-amount">{trade.amount}</span>
                  <span className="trade-price">{formatCurrency(trade.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Trade