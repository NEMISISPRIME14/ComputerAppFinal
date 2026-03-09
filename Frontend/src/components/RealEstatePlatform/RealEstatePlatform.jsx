import React, { useMemo, useState } from 'react';
import {
  Home,
  TrendingUp,
  Users,
  FileText,
  Upload,
  BarChart3,
  Settings,
  Search,
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  Filter,
  Menu,
  X,
  Bell,
  LogOut,
  Shield,
} from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import './RealEstatePlatform.css';

const properties = [
  { id: 1, title: 'Modern Downtown Loft', price: 850000, location: 'Manhattan, NY', beds: 2, baths: 2, sqft: 1200, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop', status: 'For Sale', type: 'Apartment' },
  { id: 2, title: 'Luxury Beachfront Villa', price: 2500000, location: 'Malibu, CA', beds: 5, baths: 4, sqft: 4500, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', status: 'For Sale', type: 'Villa' },
  { id: 3, title: 'Contemporary Family Home', price: 650000, location: 'Austin, TX', beds: 4, baths: 3, sqft: 2800, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop', status: 'For Sale', type: 'House' },
  { id: 4, title: 'Urban Penthouse Suite', price: 1200000, location: 'Chicago, IL', beds: 3, baths: 2.5, sqft: 1800, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', status: 'For Sale', type: 'Penthouse' },
  { id: 5, title: 'Mountain View Retreat', price: 950000, location: 'Denver, CO', beds: 4, baths: 3, sqft: 3200, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', status: 'For Sale', type: 'House' },
  { id: 6, title: 'Historic Brownstone', price: 1800000, location: 'Brooklyn, NY', beds: 5, baths: 4, sqft: 3800, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop', status: 'For Sale', type: 'Townhouse' },
];

const experts = [
  { id: 1, name: 'Sarah Mitchell', specialty: 'Luxury Properties', rating: 4.9, reviews: 127, phone: '+1 (555) 123-4567', email: 'sarah@realestate.com', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' },
  { id: 2, name: 'James Rodriguez', specialty: 'Commercial Real Estate', rating: 4.8, reviews: 98, phone: '+1 (555) 234-5678', email: 'james@realestate.com', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
  { id: 3, name: 'Emily Chen', specialty: 'First-Time Buyers', rating: 5, reviews: 156, phone: '+1 (555) 345-6789', email: 'emily@realestate.com', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop' },
  { id: 4, name: 'Michael Thompson', specialty: 'Investment Properties', rating: 4.7, reviews: 89, phone: '+1 (555) 456-7890', email: 'michael@realestate.com', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop' },
];

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', registered: '2024-01-15', properties: 3, type: 'Buyer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', registered: '2024-02-20', properties: 1, type: 'Seller' },
  { id: 3, name: 'Robert Brown', email: 'robert@example.com', status: 'Pending', registered: '2024-03-10', properties: 0, type: 'Buyer' },
  { id: 4, name: 'Lisa Anderson', email: 'lisa@example.com', status: 'Active', registered: '2023-11-05', properties: 5, type: 'Investor' },
  { id: 5, name: 'David Wilson', email: 'david@example.com', status: 'Inactive', registered: '2024-01-30', properties: 2, type: 'Buyer' },
];

const salesData = [
  { month: 'Jan', sales: 45, revenue: 12500000 },
  { month: 'Feb', sales: 52, revenue: 14200000 },
  { month: 'Mar', sales: 48, revenue: 13100000 },
  { month: 'Apr', sales: 61, revenue: 16800000 },
  { month: 'May', sales: 55, revenue: 15200000 },
  { month: 'Jun', sales: 68, revenue: 18900000 },
];

const complianceReports = [
  { id: 1, status: 'Approved', title: 'License Renewal - Elite Realty Group', detail: 'Application reviewed and approved', date: 'Today' },
  { id: 2, status: 'Pending', title: 'Transaction Audit - Property ID #89234', detail: 'Awaiting additional documentation', date: 'Yesterday' },
  { id: 3, status: 'Approved', title: 'New Agent Registration - James Mitchell', detail: 'Background check completed', date: '2 days ago' },
];

const licensees = [
  { id: 1, name: 'Elite Realty Group', license: 'NY-RE-21989', status: 'Active', renewed: '2026-02-10' },
  { id: 2, name: 'Sunset Homes', license: 'CA-RE-88311', status: 'Active', renewed: '2026-01-27' },
  { id: 3, name: 'Lakeside Ventures', license: 'IL-RE-11208', status: 'Pending', renewed: '2026-03-01' },
  { id: 4, name: 'Urban Nest Agency', license: 'TX-RE-54077', status: 'Inactive', renewed: '2025-11-15' },
];

const navItemsByRole = {
  admin: [
    { icon: BarChart3, label: 'Analytics', view: 'admin' },
    { icon: Users, label: 'User Management', view: 'admin-users' },
    { icon: Home, label: 'Properties', view: 'admin-properties' },
    { icon: Settings, label: 'Settings', view: 'admin-settings' },
  ],
  expert: [
    { icon: BarChart3, label: 'Analytics', view: 'expert' },
    { icon: FileText, label: 'Reports', view: 'expert-reports' },
    { icon: Upload, label: 'Upload Files', view: 'expert-upload' },
    { icon: Users, label: 'Clients', view: 'expert-clients' },
  ],
  government: [
    { icon: Shield, label: 'Overview', view: 'government' },
    { icon: FileText, label: 'Compliance', view: 'government-compliance' },
    { icon: BarChart3, label: 'Market Data', view: 'government-data' },
    { icon: Users, label: 'Licensees', view: 'government-licensees' },
  ],
  user: [
    { icon: Home, label: 'Browse Homes', view: 'user' },
    { icon: Users, label: 'Find Experts', view: 'user-experts' },
    { icon: Heart, label: 'Favorites', view: 'user-favorites' },
    { icon: Bell, label: 'Alerts', view: 'user-alerts' },
  ],
};

const RealEstatePlatform = () => {
  const [activeView, setActiveView] = useState('user');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([2, 4]);
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Price drop alert', detail: 'Downtown Loft dropped by $40,000', read: false },
    { id: 2, title: 'Open house reminder', detail: 'Malibu Villa on Sunday at 12:00 PM', read: false },
    { id: 3, title: 'New listing match', detail: '2-bedroom properties found in Manhattan', read: true },
  ]);
  const [settingsState, setSettingsState] = useState({
    emailAlerts: true,
    smsAlerts: false,
    autoAssignLeads: true,
    strictComplianceChecks: true,
  });

  const filteredProperties = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return properties;
    return properties.filter((property) => {
      const text = `${property.title} ${property.location} ${property.type} ${property.price}`;
      return text.toLowerCase().includes(query);
    });
  }, [searchTerm]);

  const favoriteProperties = useMemo(
    () => properties.filter((property) => favoriteIds.includes(property.id)),
    [favoriteIds]
  );

  const expertClients = useMemo(
    () => users.map((user, index) => ({
      ...user,
      advisor: experts[index % experts.length].name,
      lastContact: ['Today', 'Yesterday', '2 days ago', '1 week ago'][index % 4],
    })),
    []
  );

  const getCurrentRole = () => {
    if (activeView.startsWith('admin')) return 'admin';
    if (activeView.startsWith('expert')) return 'expert';
    if (activeView.startsWith('government')) return 'government';
    return 'user';
  };

  const toggleFavorite = (propertyId, event) => {
    event.stopPropagation();
    setFavoriteIds((previous) => (
      previous.includes(propertyId)
        ? previous.filter((id) => id !== propertyId)
        : [...previous, propertyId]
    ));
  };

  const markAlertAsRead = (alertId) => {
    setAlerts((previous) => previous.map((alert) => (
      alert.id === alertId ? { ...alert, read: true } : alert
    )));
  };

  const toggleSetting = (key) => {
    setSettingsState((previous) => ({ ...previous, [key]: !previous[key] }));
  };

  const PropertyCards = ({ items }) => (
    <>
      {items.length === 0 ? (
        <p className="empty-state">No matching properties found.</p>
      ) : (
        <div className="properties-grid">
          {items.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image" style={{ backgroundImage: `url(${property.image})` }}>
                <button
                  className={`favorite-btn ${favoriteIds.includes(property.id) ? 'active' : ''}`}
                  type="button"
                  onClick={(event) => toggleFavorite(property.id, event)}
                >
                  <Heart size={20} />
                </button>
                <span className="property-badge">{property.status}</span>
              </div>
              <div className="property-info">
                <h3>{property.title}</h3>
                <div className="property-location">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>
                <div className="property-features">
                  <span><Bed size={16} /> {property.beds} Beds</span>
                  <span><Bath size={16} /> {property.baths} Baths</span>
                  <span><Square size={16} /> {property.sqft} sqft</span>
                </div>
                <div className="property-price">${property.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const Navigation = () => (
   <div></div>
  );

  const viewHeader = (title, subtitle, action = null) => (
    <div className="view-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );

  const renderView = () => {
    switch (activeView) {
      case 'user':
        return (
          <div className="view-container">
            {viewHeader(
              'Discover Your Dream Home',
              `Explore ${properties.length} exceptional properties tailored to your lifestyle`,
              <button className="filter-btn" type="button">
                <Filter size={20} />
                Filter
              </button>
            )}
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by location, property type, or price range..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <PropertyCards items={filteredProperties} />
          </div>
        );
      case 'user-experts':
        return (
          <div className="view-container">
            {viewHeader(
              'Connect with Real Estate Experts',
              'Find the perfect agent to guide your journey'
            )}
            <div className="experts-grid">
              {experts.map((expert) => (
                <div key={expert.id} className="expert-card">
                  <div className="expert-image" style={{ backgroundImage: `url(${expert.image})` }} />
                  <div className="expert-info">
                    <h3>{expert.name}</h3>
                    <p className="expert-specialty">{expert.specialty}</p>
                    <div className="expert-rating">
                      <span className="rating">* {expert.rating}</span>
                      <span className="reviews">({expert.reviews} reviews)</span>
                    </div>
                    <div className="expert-contact">
                      <button className="contact-btn" type="button">
                        <Phone size={16} />
                        Call
                      </button>
                      <button className="contact-btn" type="button">
                        <Mail size={16} />
                        Email
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'user-favorites':
        return (
          <div className="view-container">
            {viewHeader('Saved Favorites', 'Your shortlisted properties')}
            <PropertyCards items={favoriteProperties} />
          </div>
        );
      case 'user-alerts':
        return (
          <div className="view-container">
            {viewHeader('Alert Center', 'Stay updated on listings and open houses')}
            <div className="recent-activity">
              <h3>Notifications</h3>
              <div className="activity-list">
                {alerts.map((alert) => (
                  <div key={alert.id} className="activity-item">
                    <Bell size={20} />
                    <div>
                      <strong>{alert.title}</strong>
                      <p>{alert.detail}</p>
                      <span className="activity-time">{alert.read ? 'Read' : 'Unread'}</span>
                    </div>
                    {!alert.read && (
                      <button className="action-btn" type="button" onClick={() => markAlertAsRead(alert.id)}>
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="view-container">
            {viewHeader(
              'Platform Analytics',
              'Comprehensive overview of platform performance',
              <select className="period-select">
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>All Time</option>
              </select>
            )}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon revenue">
                  <DollarSign size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Total Revenue</span>
                  <span className="stat-value">$90.8M</span>
                  <span className="stat-change positive">+12.5%</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon sales">
                  <Home size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Properties Sold</span>
                  <span className="stat-value">329</span>
                  <span className="stat-change positive">+8.3%</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon users">
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Active Users</span>
                  <span className="stat-value">1,247</span>
                  <span className="stat-change positive">+15.2%</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon growth">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Avg. Property Value</span>
                  <span className="stat-value">$1.2M</span>
                  <span className="stat-change negative">-3.1%</span>
                </div>
              </div>
            </div>
            <div className="charts-section">
              <div className="chart-card">
                <h3>Monthly Sales Performance</h3>
                <div className="bar-chart">
                  {salesData.map((data) => (
                    <div key={data.month} className="bar-group">
                      <div className="bar" style={{ height: `${(data.sales / 70) * 100}%` }}>
                        <span className="bar-label">{data.sales}</span>
                      </div>
                      <span className="bar-month">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chart-card">
                <h3>Property Type Distribution</h3>
                <div className="pie-chart-legend">
                  <div className="legend-item"><span className="legend-color" style={{ background: '#6366f1' }} />Apartments (35%)</div>
                  <div className="legend-item"><span className="legend-color" style={{ background: '#8b5cf6' }} />Houses (28%)</div>
                  <div className="legend-item"><span className="legend-color" style={{ background: '#ec4899' }} />Villas (18%)</div>
                  <div className="legend-item"><span className="legend-color" style={{ background: '#f59e0b' }} />Commercial (19%)</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'admin-users':
        return (
          <div className="view-container">
            {viewHeader(
              'User Management',
              'Monitor and manage platform users',
              <button className="add-btn" type="button">Add User</button>
            )}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Properties</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">{user.name.charAt(0)}</div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td><span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span></td>
                      <td>{user.type}</td>
                      <td>{user.properties}</td>
                      <td>{user.registered}</td>
                      <td><button className="action-btn" type="button">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'admin-properties':
        return (
          <div className="view-container">
            {viewHeader(
              'Property Inventory',
              'Monitor all active listings',
              <button className="add-btn" type="button">Add Property</button>
            )}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property.id}>
                      <td>{property.title}</td>
                      <td>{property.type}</td>
                      <td>{property.location}</td>
                      <td><span className="status-badge active">{property.status}</span></td>
                      <td>${property.price.toLocaleString()}</td>
                      <td><button className="action-btn" type="button">Inspect</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'admin-settings':
        return (
          <div className="view-container">
            {viewHeader('Platform Settings', 'Adjust delivery, notifications, and compliance')}
            <div className="reports-grid">
              {[
                { key: 'emailAlerts', label: 'Email notifications' },
                { key: 'smsAlerts', label: 'SMS notifications' },
                { key: 'autoAssignLeads', label: 'Auto-assign leads' },
                { key: 'strictComplianceChecks', label: 'Strict compliance checks' },
              ].map((item) => (
                <div key={item.key} className="report-card">
                  <Settings size={32} />
                  <h3>{item.label}</h3>
                  <p>{settingsState[item.key] ? 'Enabled' : 'Disabled'}</p>
                  <button className="download-btn" type="button" onClick={() => toggleSetting(item.key)}>
                    {settingsState[item.key] ? 'Turn Off' : 'Turn On'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'expert':
        return (
          <div className="view-container">
            {viewHeader('Expert Dashboard', 'Track your performance and client interactions')}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon revenue">
                  <DollarSign size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Total Commissions</span>
                  <span className="stat-value">$156K</span>
                  <span className="stat-change positive">+18.2%</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon sales">
                  <Home size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Closed Deals</span>
                  <span className="stat-value">23</span>
                  <span className="stat-change positive">+5</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon users">
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Active Clients</span>
                  <span className="stat-value">47</span>
                  <span className="stat-change positive">+12</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon growth">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Avg. Deal Value</span>
                  <span className="stat-value">$892K</span>
                  <span className="stat-change positive">+7.3%</span>
                </div>
              </div>
            </div>
            <div className="recent-activity">
              <h3>Recent Client Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <Calendar size={20} />
                  <div>
                    <strong>Property viewing scheduled</strong>
                    <p>John Smith - 123 Oak Street</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <FileText size={20} />
                  <div>
                    <strong>Offer submitted</strong>
                    <p>Sarah Johnson - Downtown Loft</p>
                    <span className="activity-time">5 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'expert-reports':
        return (
          <div className="view-container">
            {viewHeader(
              'Reports and Documentation',
              'Generate and manage your professional reports',
              <button className="add-btn" type="button">Generate Report</button>
            )}
            <div className="reports-grid">
              {[
                { id: 1, title: 'Q1 Performance Report', date: 'Jan 15, 2024', desc: 'Overview of first quarter activities' },
                { id: 2, title: 'Client Portfolio Summary', date: 'Feb 20, 2024', desc: 'Current client listings and status' },
                { id: 3, title: 'Market Analysis Report', date: 'Mar 10, 2024', desc: 'Local market trends and pricing insights' },
              ].map((report) => (
                <div key={report.id} className="report-card">
                  <FileText size={40} />
                  <h3>{report.title}</h3>
                  <p>{report.desc}</p>
                  <div className="report-meta">
                    <span>Generated: {report.date}</span>
                    <button className="download-btn" type="button">Download PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'expert-upload':
        return (
          <div className="view-container">
            {viewHeader('File Upload Center', 'Upload documents, images, and property materials')}
            <div className="upload-area">
              <Upload size={48} />
              <h3>Drag and drop files here</h3>
              <p>or click to browse</p>
              <button className="browse-btn" type="button">Browse Files</button>
              <span className="upload-hint">Supports PDF, JPG, PNG, DOCX up to 10MB</span>
            </div>
            <div className="uploaded-files">
              <h3>Recent Uploads</h3>
              <div className="file-list">
                <div className="file-item">
                  <FileText size={24} />
                  <div className="file-info">
                    <strong>Property_Contract_123.pdf</strong>
                    <span>Uploaded 2 hours ago - 2.4 MB</span>
                  </div>
                  <button className="delete-btn" type="button">Delete</button>
                </div>
                <div className="file-item">
                  <FileText size={24} />
                  <div className="file-info">
                    <strong>Inspection_Report_456.pdf</strong>
                    <span>Uploaded 1 day ago - 1.8 MB</span>
                  </div>
                  <button className="delete-btn" type="button">Delete</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'expert-clients':
        return (
          <div className="view-container">
            {viewHeader('Client Pipeline', 'Track assigned clients and response timelines')}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Advisor</th>
                    <th>Type</th>
                    <th>Properties</th>
                    <th>Last Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {expertClients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.advisor}</td>
                      <td>{client.type}</td>
                      <td>{client.properties}</td>
                      <td>{client.lastContact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'government':
        return (
          <div className="view-container">
            {viewHeader('Government Regulatory Dashboard', 'Monitor compliance and market oversight')}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <Shield size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Licensed Agents</span>
                  <span className="stat-value">1,847</span>
                  <span className="stat-change positive">+23 this month</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon sales">
                  <FileText size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Active Transactions</span>
                  <span className="stat-value">412</span>
                  <span className="stat-change">Under review: 18</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon growth">
                  <TrendingUp size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Compliance Rate</span>
                  <span className="stat-value">98.2%</span>
                  <span className="stat-change positive">+0.5%</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon revenue">
                  <BarChart3 size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-label">Market Volume</span>
                  <span className="stat-value">$2.1B</span>
                  <span className="stat-change">This quarter</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'government-compliance':
        return (
          <div className="view-container">
            {viewHeader('Compliance Queue', 'Review recent licensing and transaction audits')}
            <div className="compliance-section">
              <h3>Recent Compliance Reports</h3>
              <div className="compliance-list">
                {complianceReports.map((report) => (
                  <div key={report.id} className="compliance-item">
                    <span className={`status-badge ${report.status.toLowerCase()}`}>{report.status}</span>
                    <div>
                      <strong>{report.title}</strong>
                      <p>{report.detail}</p>
                    </div>
                    <span className="compliance-date">{report.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'government-data':
        return (
          <div className="view-container">
            {viewHeader('Market Data Feed', 'Monthly sales and revenue trend snapshots')}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Closed Sales</th>
                    <th>Revenue</th>
                    <th>Average Ticket</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((month) => (
                    <tr key={month.month}>
                      <td>{month.month}</td>
                      <td>{month.sales}</td>
                      <td>${month.revenue.toLocaleString()}</td>
                      <td>${Math.round(month.revenue / month.sales).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'government-licensees':
        return (
          <div className="view-container">
            {viewHeader('Licensed Entities', 'Status of registered agencies and brokerages')}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Entity</th>
                    <th>License ID</th>
                    <th>Status</th>
                    <th>Last Renewal</th>
                  </tr>
                </thead>
                <tbody>
                  {licensees.map((licensee) => (
                    <tr key={licensee.id}>
                      <td>{licensee.name}</td>
                      <td>{licensee.license}</td>
                      <td><span className={`status-badge ${licensee.status.toLowerCase()}`}>{licensee.status}</span></td>
                      <td>{licensee.renewed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className="view-container">
            {viewHeader('Dashboard', 'Select a section from the sidebar to continue')}
          </div>
        );
    }
  };

  return (
    <div className="real-estate-shell">
      <Navbar />
      <div className="platform">
        <Navigation />
        <div className="main-content">
          {renderView()}
        </div>

      </div>
    </div>
  );
};

export default RealEstatePlatform;
