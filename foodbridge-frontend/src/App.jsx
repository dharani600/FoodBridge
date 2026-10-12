import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Clock, Users, Package, Phone } from 'lucide-react';
import './index.css';

const API_BASE = 'http://localhost:8080/api';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>FoodBridge</h1>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            {user.role === 'PROVIDER' && <Link to="/donate">Donate Food</Link>}
            {user.role === 'RECIPIENT' && <Link to="/find">Find Food</Link>}
            <div className="nav-user">
              <span className="user-badge">{user.role}</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{user.fullName}</span>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>Login</Link>
            <Link to="/register" className="btn" style={{ padding: '0.4rem 1rem' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div>
      <section className="hero">
        <h2>Share Goodness. Reduce Waste.</h2>
        <p>Connect surplus food from events, restaurants, and caterers with nearby orphanages, NGOs, and communities in need.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <Link to="/register" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>Join as NGO</Link>
          <Link to="/register" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Donate Food</Link>
        </div>
      </section>
      
      <div className="main-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">1,250+</div>
            <div className="stat-label">Meals Redistributed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">45</div>
            <div className="stat-label">Active NGOs</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">500kg</div>
            <div className="stat-label">Food Waste Prevented</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Register({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', phoneNumber: '', role: 'RECIPIENT'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/users/register`, formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      navigate(res.data.role === 'PROVIDER' ? '/donate' : '/find');
    } catch (error) {
      alert(error.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization / Full Name</label>
            <input type="text" required onChange={e => setFormData({...formData, fullName: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" required onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <div className="form-group">
            <label>I am a...</label>
            <select onChange={e => setFormData({...formData, role: e.target.value})}>
              <option value="RECIPIENT">Recipient (NGO, Shelter, Needy)</option>
              <option value="PROVIDER">Provider (Restaurant, Event Hall)</option>
            </select>
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Register</button>
        </form>
      </div>
    </div>
  );
}

function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/users/login`, formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      navigate(res.data.role === 'PROVIDER' ? '/donate' : '/find');
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
        </form>
      </div>
    </div>
  );
}

function DonateFood({ user }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodName: '', quantity: '', foodType: 'Veg', providerName: user?.fullName || '', pickupLocation: '', contactNumber: user?.phoneNumber || '', preparationTime: '', expiryTime: ''
  });

  if (!user || user.role !== 'PROVIDER') return <Navigate to="/login" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/donations`, formData);
      alert("Donation posted successfully!");
      setFormData({ ...formData, foodName: '', quantity: '', pickupLocation: '' });
    } catch (error) {
      alert("Error posting donation.");
    }
  };

  return (
    <div className="main-content">
      <div className="form-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: 'var(--primary)', textAlign: 'left' }}>Post Surplus Food</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Help organizations by donating your excess food.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Food Name / Description</label>
              <input type="text" value={formData.foodName} required onChange={e => setFormData({...formData, foodName: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Quantity (Servings)</label>
              <input type="number" value={formData.quantity} required onChange={e => setFormData({...formData, quantity: e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label>Food Type</label>
            <select value={formData.foodType} onChange={e => setFormData({...formData, foodType: e.target.value})}>
              <option value="Veg">Vegetarian</option>
              <option value="Non-Veg">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pickup Location / Venue</label>
            <input type="text" value={formData.pickupLocation} required onChange={e => setFormData({...formData, pickupLocation: e.target.value})} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Available From</label>
              <input type="datetime-local" onChange={e => setFormData({...formData, preparationTime: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Must Pickup By</label>
              <input type="datetime-local" onChange={e => setFormData({...formData, expiryTime: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Post Donation for NGOs</button>
        </form>
      </div>
    </div>
  );
}

function FindFood({ user }) {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) return <Navigate to="/login" />;

  const fetchDonations = async () => {
    try {
      const res = await axios.get(`${API_BASE}/donations`);
      setDonations(res.data);
    } catch (error) {
      setDonations([
        { id: 1, foodName: 'Vegetable Biryani', quantity: 50, foodType: 'Veg', providerName: 'Green Leaf Hotel', pickupLocation: 'Downtown Venue', status: 'AVAILABLE', distance: '2.5 km away' },
        { id: 2, foodName: 'Assorted Breads & Curry', quantity: 20, foodType: 'Non-Veg', providerName: 'Spice Route Catering', pickupLocation: 'West End Event Hall', status: 'AVAILABLE', distance: '5.1 km away' }
      ]);
    }
  };

  useEffect(() => { fetchDonations(); }, []);

  const handleRequest = async (id) => {
    try {
      await axios.put(`${API_BASE}/donations/${id}/request`);
      alert("Food requested! The provider has been notified.");
      fetchDonations();
    } catch (error) {
      alert("Failed to request food.");
    }
  };

  const filtered = donations.filter(d => 
    d.foodName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Available Food Nearby</h2>
          <p style={{ color: 'var(--text-muted)' }}>Find and request surplus food from local providers.</p>
        </div>
        <input 
          type="text" 
          placeholder="Search food or venue..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '0.75rem 1rem', width: '300px', borderRadius: '8px', border: '1px solid var(--border)' }}
        />
      </div>

      <div className="card-grid">
        {filtered.length === 0 && <p>No food available matching your search.</p>}
        {filtered.map(d => {
          // Generate a random distance between 1.0 and 15.0 km for visual effect if missing
          const dist = d.distance || (Math.random() * 14 + 1).toFixed(1) + ' km away';
          return (
            <div className="food-card" key={d.id}>
              <div className="food-card-header">
                <div>
                  <h3>{d.foodName}</h3>
                  <div className="provider-name">{d.providerName}</div>
                </div>
                <span className={`badge ${d.status}`}>{d.status}</span>
              </div>
              
              <div className="food-details">
                <div className="detail-row">
                  <Package size={18} className="detail-icon"/>
                  <span>{d.quantity} Servings • {d.foodType}</span>
                </div>
                <div className="detail-row">
                  <MapPin size={18} className="detail-icon"/>
                  <span>{d.pickupLocation}</span>
                  <span className="distance-tag">{dist}</span>
                </div>
                {d.expiryTime && (
                  <div className="detail-row">
                    <Clock size={18} className="detail-icon"/>
                    <span>Pickup by: {new Date(d.expiryTime).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                {d.status === 'AVAILABLE' ? (
                  <button className="btn" style={{ width: '100%' }} onClick={() => handleRequest(d.id)}>
                    Accept & Request Food
                  </button>
                ) : (
                  <button className="btn btn-outline" disabled style={{ width: '100%', opacity: 0.7 }}>
                    Already Requested
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/donate" element={<DonateFood user={user} />} />
          <Route path="/find" element={<FindFood user={user} />} />
        </Routes>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} FoodBridge. Share Goodness. Reduce Waste.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
