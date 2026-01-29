import { useState, useEffect } from 'react'
import '../pages/Wallet.css'

const Wallet = () => {
  const [wallets] = useState([
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: 0.5,
      usdValue: 21283.95,
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      network: 'Bitcoin Network'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      balance: 1.2,
      usdValue: 2947.58,
      address: '0x71c7656ec7183d603a6a18b84e16847e520b6d0b',
      network: 'Ethereum Mainnet'
    },
    {
      id: 'usdt',
      name: 'Tether USD',
      symbol: 'USDT',
      balance: 5000.00,
      usdValue: 5000.00,
      address: '0x71c7656ec7183d603a6a18b84e16847e520b6d0b',
      network: 'Ethereum ERC-20'
    },
    {
      id: 'bnb',
      name: 'Binance Coin',
      symbol: 'BNB',
      balance: 5.0,
      usdValue: 1622.80,
      address: 'bnb1x2w9c2p3c7n447h0t3d2t5s7v9k6m4l8p2q5r7',
      network: 'Binance Smart Chain'
    }
  ])

  const [transactions] = useState([
    {
      id: 1,
      type: 'deposit',
      symbol: 'USDT',
      amount: 5000.00,
      status: 'completed',
      date: '2024-01-15 14:30:00',
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    },
    {
      id: 2,
      type: 'withdrawal',
      symbol: 'BTC',
      amount: 0.05,
      status: 'completed',
      date: '2024-01-14 16:45:00',
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
    },
    {
      id: 3,
      type: 'trade',
      symbol: 'ETH',
      amount: 0.5,
      status: 'completed',
      date: '2024-01-14 10:20:00',
      hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
    },
    {
      id: 4,
      type: 'deposit',
      symbol: 'BNB',
      amount: 10.0,
      status: 'pending',
      date: '2024-01-13 09:15:00',
      hash: '0x1111111111111111111111111111111111111111111111111111111111111111'
    }
  ])

  const [activeTab, setActiveTab] = useState('overview')
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getTotalValue = () => {
    return wallets.reduce((total, wallet) => total + wallet.usdValue, 0)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'status-completed'
      case 'pending': return 'status-pending'
      case 'failed': return 'status-failed'
      default: return 'status-pending'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deposit': return '📥'
      case 'withdrawal': return '📤'
      case 'trade': return '🔄'
      default: return '📄'
    }
  }

  return (
    <div className="wallet">
      <div className="container">
        {/* Wallet Header */}
        <div className="wallet-header">
          <div className="header-content">
            <h1 className="wallet-title">Wallet</h1>
            <p className="wallet-subtitle">Manage your cryptocurrency assets</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => setShowDepositModal(true)}>
              Deposit
            </button>
            <button className="btn btn-secondary" onClick={() => setShowWithdrawModal(true)}>
              Withdraw
            </button>
          </div>
        </div>

        {/* Wallet Overview */}
        <div className="wallet-overview">
          <div className="overview-grid">
            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-label">Total Balance</span>
              </div>
              <div className="overview-value">{formatCurrency(getTotalValue())}</div>
              <div className="overview-sub">All assets combined</div>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-label">Total Assets</span>
              </div>
              <div className="overview-value">{wallets.length}</div>
              <div className="overview-sub">Different cryptocurrencies</div>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-label">24h Change</span>
                <span className="overview-change price-up">+5.2%</span>
              </div>
              <div className="overview-value price-up">+$1,245.75</div>
              <div className="overview-sub">Portfolio performance</div>
            </div>

            <div className="overview-card">
              <div className="overview-header">
                <span className="overview-label">Security Level</span>
              </div>
              <div className="security-level">
                <div className="security-bar">
                  <div className="security-fill" style={{ width: '95%' }}></div>
                </div>
                <span className="security-text">High</span>
              </div>
              <div className="overview-sub">Account protection</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="wallet-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'deposit' ? 'active' : ''}`}
            onClick={() => setActiveTab('deposit')}
          >
            Deposit
          </button>
          <button 
            className={`tab-btn ${activeTab === 'withdraw' ? 'active' : ''}`}
            onClick={() => setActiveTab('withdraw')}
          >
            Withdraw
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="wallets-grid">
                {wallets.map((wallet) => (
                  <div key={wallet.id} className="wallet-card">
                    <div className="wallet-header">
                      <div className="wallet-info">
                        <div className="wallet-symbol">{wallet.symbol}</div>
                        <div className="wallet-details">
                          <span className="wallet-name">{wallet.name}</span>
                          <span className="wallet-network">{wallet.network}</span>
                        </div>
                      </div>
                      <div className="wallet-actions">
                        <button className="action-btn" onClick={() => setSelectedWallet(wallet)}>
                          <i className="fas fa-qrcode"></i>
                        </button>
                        <button className="action-btn">
                          <i className="fas fa-copy"></i>
                        </button>
                      </div>
                    </div>
                    
                    <div className="wallet-balance">
                      <div className="balance-main">
                        <span className="balance-amount">{wallet.balance}</span>
                        <span className="balance-symbol">{wallet.symbol}</span>
                      </div>
                      <div className="balance-usd">
                        {formatCurrency(wallet.usdValue)}
                      </div>
                    </div>

                    <div className="wallet-address">
                      <span className="address-label">Address:</span>
                      <span className="address-value">{wallet.address}</span>
                    </div>

                    <div className="wallet-footer">
                      <button className="btn btn-secondary btn-sm">Deposit</button>
                      <button className="btn btn-primary btn-sm">Withdraw</button>
                      <button className="btn btn-secondary btn-sm">Trade</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deposit Tab */}
          {activeTab === 'deposit' && (
            <div className="deposit-tab">
              <div className="deposit-content">
                <div className="deposit-instruction">
                  <h3>Deposit Instructions</h3>
                  <p>Send your cryptocurrency to the address below. Make sure to use the correct network.</p>
                </div>
                
                <div className="deposit-methods">
                  {wallets.map((wallet) => (
                    <div key={wallet.id} className="deposit-method">
                      <div className="method-header">
                        <span className="method-symbol">{wallet.symbol}</span>
                        <span className="method-name">{wallet.name}</span>
                      </div>
                      <div className="method-address">
                        <div className="address-display">
                          <span className="address-text">{wallet.address}</span>
                          <button className="copy-btn">
                            <i className="fas fa-copy"></i>
                          </button>
                        </div>
                        <div className="network-info">
                          <span className="network-label">Network:</span>
                          <span className="network-value">{wallet.network}</span>
                        </div>
                      </div>
                      <div className="qr-code">
                        <div className="qr-placeholder">
                          <div className="qr-pattern"></div>
                        </div>
                        <span className="qr-label">Scan QR Code</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Withdraw Tab */}
          {activeTab === 'withdraw' && (
            <div className="withdraw-tab">
              <div className="withdraw-content">
                <div className="withdraw-form">
                  <div className="form-group">
                    <label>Select Asset</label>
                    <select className="form-select">
                      <option>Select a cryptocurrency</option>
                      {wallets.map((wallet) => (
                        <option key={wallet.id} value={wallet.symbol}>
                          {wallet.name} ({wallet.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Withdrawal Address</label>
                    <input type="text" placeholder="Enter your wallet address" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label>Amount</label>
                    <div className="amount-input">
                      <input type="number" placeholder="0.00" className="form-input" />
                      <span className="max-btn">MAX</span>
                    </div>
                    <div className="available-balance">
                      Available: 0.5 BTC
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Network Fee</label>
                    <div className="fee-info">
                      <span className="fee-amount">0.0005 BTC</span>
                      <span className="fee-description">Estimated network fee</span>
                    </div>
                  </div>

                  <div className="withdraw-actions">
                    <button className="btn btn-secondary">Cancel</button>
                    <button className="btn btn-primary">Withdraw</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="history-tab">
              <div className="history-content">
                <div className="history-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Asset</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Hash</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td>
                            <span className="tx-type">
                              <span className="tx-icon">{getTypeIcon(tx.type)}</span>
                              {tx.type.toUpperCase()}
                            </span>
                          </td>
                          <td>{tx.symbol}</td>
                          <td>
                            <span className={`tx-amount ${tx.type === 'withdrawal' ? 'price-down' : 'price-up'}`}>
                              {tx.type === 'withdrawal' ? '-' : '+'}{tx.amount} {tx.symbol}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge ${getStatusColor(tx.status)}`}>
                              {tx.status.toUpperCase()}
                            </span>
                          </td>
                          <td>{tx.date}</td>
                          <td>
                            <span className="tx-hash">
                              {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showDepositModal && (
        <div className="modal-overlay" onClick={() => setShowDepositModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Deposit {selectedWallet?.symbol}</h3>
              <button className="modal-close" onClick={() => setShowDepositModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-qr">
                <div className="qr-placeholder">
                  <div className="qr-pattern"></div>
                </div>
              </div>
              <div className="modal-address">
                <span className="modal-label">Address:</span>
                <span className="modal-value">{selectedWallet?.address}</span>
                <button className="copy-modal-btn">
                  <i className="fas fa-copy"></i>
                </button>
              </div>
              <div className="modal-network">
                <span className="modal-label">Network:</span>
                <span className="modal-value">{selectedWallet?.network}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Withdraw {selectedWallet?.symbol}</h3>
              <button className="modal-close" onClick={() => setShowWithdrawModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-form">
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" placeholder="Enter withdrawal address" className="form-input" />
                </div>
                <div className="form-group">
                  <label>Amount</label>
                  <div className="amount-input">
                    <input type="number" placeholder="0.00" className="form-input" />
                    <span className="max-btn">MAX</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Network Fee</label>
                  <div className="fee-info">
                    <span className="fee-amount">0.0005 BTC</span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="btn btn-secondary" onClick={() => setShowWithdrawModal(false)}>Cancel</button>
                  <button className="btn btn-primary">Withdraw</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Wallet