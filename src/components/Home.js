
import React from 'react'
import { useState } from 'react'
import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";

export const Home = ({ userEmail, studentData, onSignOut, onSelectAccommodation, liveTime }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('15000');
  const [propertyType, setPropertyType] = useState({
    single: false,
    sharing: false,
    both: false,
  });
  const [amenities, setAmenities] = useState({
    loadShedding: false,
    wifi: false,
    waterSupply: false,
    security: false,
    parking: false,
    laundry: false,
    kitchen: false,
    airCondition: false,
  });

  const accommodations = [
    { id: 1, name: 'Nthutang Students Residence', location: 'Mahikeng', address: '12 Goitseone, Mahikeng', price: 4800, type: 'single', amenities: ['wifi', 'waterSupply', 'security'], image: '/maple-grove.jpg', lat: -25.8553, lng: 25.6432 },
    { id: 2, name: 'Legae La Rona', location: 'Mahikeng', address: '8 Mahikeng Drive, Mahikeng', price: 7300, type: 'sharing', amenities: ['wifi', 'parking', 'laundry'], image: '/legae-larona.jpg', lat: -25.8601, lng: 25.6478 },
    { id: 3, name: 'Gatholo', location: 'Mahikeng', address: '23 Biggy Avenue, Mahikeng', price: 6200, type: 'single', amenities: ['wifi', 'waterSupply', 'kitchen'], image: '/gatholo.jpg', lat: -25.8572, lng: 25.6389 },
    { id: 4, name: 'DI Prime', location: 'Mahikeng', address: '5 Campus Road, Mahikeng', price: 5400, type: 'sharing', amenities: ['parking', 'security', 'airCondition'], image: '/diprime.jpg', lat: -25.8490, lng: 25.6501 },
    { id: 5, name: 'Primrose', location: 'Mahikeng', address: '34 Green Lane, Mahikeng', price: 8800, type: 'both', amenities: ['wifi', 'laundry', 'kitchen'], image: '/primrose.jpg', lat: -25.8620, lng: 25.6355 },
    { id: 6, name: 'Tswellopele', location: 'Mahikeng', address: '44 Table Up Street, Mahikeng', price: 9500, type: 'single', amenities: ['wifi', 'security', 'airCondition'], image: '/tswellopele.jpg', lat: -25.8533, lng: 25.6520 },
    { id: 7, name: 'Mavetera', location: 'Mahikeng', address: '18 Campus Road, Mahikeng', price: 6700, type: 'sharing', amenities: ['waterSupply', 'kitchen', 'parking'], image: '/mavetera.jpg', lat: -25.8645, lng: 25.6412 },
    { id: 8, name: 'Maruping', location: 'Mahikeng', address: '9 Based Hill Drive, Mahikeng', price: 5100, type: 'sharing', amenities: ['wifi', 'security', 'laundry'], image: '/maruping.jpg', lat: -25.8580, lng: 25.6340 },
    { id: 9, name: 'Mosala', location: 'Mahikeng', address: '76 Golfviewt Drive, Mahikeng', price: 8400, type: 'single', amenities: ['wifi', 'parking', 'waterSupply'], image: '/mosala.jpg', lat: -25.8510, lng: 25.6460 },
    { id: 10, name: 'Nhlapho', location: 'Mahikeng', address: '31 Garden Lane, Mahikeng', price: 5600, type: 'sharing', amenities: ['laundry', 'kitchen', 'security'], image: '/nhlapho.jpg', lat: -25.8630, lng: 25.6490 },
    { id: 11, name: 'Nojila', location: 'Mahikeng', address: '20 Table Road, Mahikeng', price: 9000, type: 'single', amenities: ['airCondition', 'wifi', 'parking'], image: '/nojila.jpg', lat: -25.8560, lng: 25.6375 },
    { id: 12, name: 'Moipelo', location: 'Mahikeng', address: '2 MMabatho Court, Mahikeng', price: 6500, type: 'sharing', amenities: ['wifi', 'waterSupply', 'laundry'], image: '/moipelo.jpg', lat: -25.8595, lng: 25.6445 },
    { id: 13, name: 'Campus View Residence', location: 'Mmabatho', address: '14 Albert Luthuli Drive, Mmabatho', price: 4500, type: 'single', amenities: ['wifi', 'security', 'waterSupply'], image: '/campus-view-residence.jpg', lat: -25.8301, lng: 25.6101 },
    { id: 14, name: 'University Pines', location: 'Mmabatho', address: '3 University Drive, Mmabatho', price: 5200, type: 'sharing', amenities: ['wifi', 'laundry', 'parking'], image: '/university-pines.jpg', lat: -25.8285, lng: 25.6083 },
    { id: 15, name: 'Mmabatho Student Lodge', location: 'Mmabatho', address: '27 Lombard Street, Mmabatho', price: 4900, type: 'both', amenities: ['wifi', 'kitchen', 'security'], image: '/mmabatho-student-lodge.jpg', lat: -25.8320, lng: 25.6120 },
    { id: 16, name: 'NWU Corner Flats', location: 'Mmabatho', address: '8 Luthuli Close, Mmabatho', price: 6100, type: 'single', amenities: ['wifi', 'airCondition', 'parking', 'security'], image: '/nwu-corner-flats.jpg', lat: -25.8268, lng: 25.6065 },
    { id: 17, name: 'Scholars Haven', location: 'Mmabatho', address: '19 Mmabatho Extension 2, Mmabatho', price: 5800, type: 'sharing', amenities: ['wifi', 'waterSupply', 'laundry', 'kitchen'], image: '/scholars-haven.jpg', lat: -25.8340, lng: 25.6140 },
  ];

  const handlePropertyTypeChange = (type) => {
    setPropertyType({ ...propertyType, [type]: !propertyType[type] });
  };

  const handleAmenitiesChange = (amenity) => {
    setAmenities({ ...amenities, [amenity]: !amenities[amenity] });
  };

  const handleSearch = () => {};

  const handleResetFilters = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('15000');
    setPropertyType({ single: false, sharing: false, both: false });
    setAmenities({
      loadShedding: false, wifi: false, waterSupply: false, security: false,
      parking: false, laundry: false, kitchen: false, airCondition: false,
    });
  };

  const selectedTypes = Object.entries(propertyType).filter(([_, v]) => v).map(([k]) => k);
  const selectedAmenities = Object.entries(amenities).filter(([_, v]) => v).map(([k]) => k);
  const minPriceValue = minPrice ? Number(minPrice) : 0;
  const maxPriceValue = maxPrice ? Number(maxPrice) : Infinity;
  const sliderMaxPrice = maxPrice ? Number(maxPrice) : 15000;

  const filteredAccommodations = accommodations.filter((item) => {
    const matchesSearch = [item.name, item.location, item.address]
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase().trim()));
    const matchesPrice = item.price >= minPriceValue && item.price <= maxPriceValue;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
    const matchesAmenities = selectedAmenities.every((amenity) => item.amenities.includes(amenity));
    return matchesSearch && matchesPrice && matchesType && matchesAmenities;
  });

  const LogoSVG = () => (
    <svg width="100%" viewBox="0 0 300 110" role="img" style={{ display: 'block' }}>
      <title>Biggy Housing logo</title>
      <defs>
        <linearGradient id="purpleGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#667eea' }} />
          <stop offset="100%" style={{ stopColor: '#764ba2' }} />
        </linearGradient>
        <linearGradient id="badgeGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#764ba2' }} />
          <stop offset="100%" style={{ stopColor: '#667eea' }} />
        </linearGradient>
      </defs>
      {/* "B" monogram badge */}
      <rect x="4" y="12" width="72" height="86" rx="14" fill="url(#badgeGradLogo)" />
      <rect x="8" y="16" width="64" height="78" rx="11" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
      <text x="40" y="70" fontFamily="Georgia, serif" fontSize="62" fontWeight="900" fill="white" textAnchor="middle" letterSpacing="-2">B</text>
      <circle cx="66" cy="86" r="5" fill="white" opacity="0.5" />
      {/* Wordmark */}
      <text x="90" y="52" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="800" fill="url(#purpleGradLogo)" letterSpacing="1">BIGGY</text>
      <text x="92" y="78" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="500" fill="#764ba2" letterSpacing="5">HOUSING</text>
      <rect x="90" y="84" width="194" height="2" rx="1" fill="url(#purpleGradLogo)" opacity="0.4" />
      <text x="90" y="100" fontFamily="Arial, sans-serif" fontSize="9" fill="#9ca3af" letterSpacing="1">Student Accommodation · Mahikeng</text>
    </svg>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ display: 'flex', flex: 1, padding: '1.5rem', gap: '1.5rem' }}>

        {/* Sidebar */}
        <div style={{
          width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem',
          position: 'sticky', top: '1.5rem', height: 'fit-content',
          maxHeight: 'calc(100vh - 3rem)', overflowY: 'auto',
        }}>
          {/* Logo Card */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.2rem 1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <LogoSVG />
          </div>

          {/* Filter Card */}
          <div className="sidebar-panel" style={{ width: '100%', boxSizing: 'border-box', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: 'none' }}>
            <div className="sidebar-header"><h2>Search & Filter</h2></div>
            <div className="sidebar-content">
              <div className="filter-section">
                <label className="section-label">Price Range</label>
                <div className="slider-wrapper">
                  <div className="slider-label">Budget Slider: R{sliderMaxPrice.toLocaleString()}</div>
                  <input type="range" min="0" max="15000" step="100" className="range-slider"
                    value={sliderMaxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
                <div className="price-input-group">
                  <div className="price-input">
                    <label className="small-label">Min Price</label>
                    <input type="number" className="price-input-field" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                  </div>
                  <div className="price-separator">to</div>
                  <div className="price-input">
                    <label className="small-label">Max Price</label>
                    <input type="number" className="price-input-field" placeholder="15000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                  </div>
                </div>
              </div>

              {(minPrice || maxPrice) && (
                <div className="price-summary">
                  <p className="summary-title">Selected Price Range:</p>
                  <p className="summary-value">R{minPrice || '0'} - R{maxPrice || '∞'}</p>
                </div>
              )}

              <div className="filter-section">
                <label className="section-label">Property Type</label>
                <div className="checkbox-group">
                  <label className="checkbox-label"><input type="checkbox" checked={propertyType.single} onChange={() => handlePropertyTypeChange('single')} /> Single Room</label>
                  <label className="checkbox-label"><input type="checkbox" checked={propertyType.sharing} onChange={() => handlePropertyTypeChange('sharing')} /> Sharing Room</label>
                  <label className="checkbox-label"><input type="checkbox" checked={propertyType.both} onChange={() => handlePropertyTypeChange('both')} /> Both Options</label>
                </div>
              </div>

              <div className="filter-section">
                <label className="section-label">Conveniences & Amenities</label>
                <div className="checkbox-group">
                  {[
                    ['loadShedding', 'Load Shedding Backup'], ['wifi', 'WiFi Internet'],
                    ['waterSupply', 'Water Supply'], ['security', '24/7 Security'],
                    ['parking', 'Parking Space'], ['laundry', 'Laundry Facilities'],
                    ['kitchen', 'Shared Kitchen'], ['airCondition', 'Air Conditioning'],
                  ].map(([key, label]) => (
                    <label key={key} className="checkbox-label">
                      <input type="checkbox" checked={amenities[key]} onChange={() => handleAmenitiesChange(key)} /> {label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-actions">
                <button className="apply-filter-btn" onClick={handleSearch}>Apply Filters</button>
                <button className="reset-filter-btn" type="button" onClick={handleResetFilters}>Reset Filters</button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Welcome Card */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem 2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                {/* ✅ Full name displayed prominently */}
                <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.8rem', color: '#1f2937', fontWeight: 700 }}>
                  Welcome back, <span style={{ color: '#667eea' }}>{studentData?.fullName || 'Student'}</span>
                </h1>
                <p style={{ margin: '0 0 0.4rem', color: '#6b7280', fontSize: '0.95rem' }}>
                  Find your perfect student accommodation in Mahikeng & Mmabatho
                </p>
                {/* ✅ Live real-time clock */}
                {liveTime && (
                  <p style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: '#9ca3af',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.02em',
                  }}>
                    🕐 {liveTime}
                  </p>
                )}
              </div>
              <button className="signout-btn" onClick={onSignOut}>Sign out</button>
            </div>

            {/* ✅ Student Info Strip — faculty & course removed, yearOfPlacement added */}
            {studentData && (
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem',
                background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                borderRadius: '12px', marginBottom: '1.5rem',
                borderLeft: '4px solid #667eea', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: '130px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1f2937' }}>{studentData.fullName || 'N/A'}</span>
                </div>
                <div style={{ width: '1px', background: '#e5e7eb', alignSelf: 'stretch' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: '130px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Student Number</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1f2937' }}>{studentData.studentNumber || 'N/A'}</span>
                </div>
                <div style={{ width: '1px', background: '#e5e7eb', alignSelf: 'stretch' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: '120px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Year of Placement</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1f2937' }}>{studentData.yearOfPlacement || 'N/A'}</span>
                </div>
                <div style={{ width: '1px', background: '#e5e7eb', alignSelf: 'stretch' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Funding Status</span>
                  <span style={{
                    fontSize: '0.82rem', fontWeight: 700,
                    color: studentData.Bursary === 'NSFAS' ? '#065f46' : '#92400e',
                    background: studentData.Bursary === 'NSFAS' ? '#d1fae5' : '#fef3c7',
                    padding: '0.2rem 0.75rem', borderRadius: '20px', display: 'inline-block',
                  }}>
                    {studentData.Bursary || 'N/A'}
                  </span>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Total Listings', value: accommodations.length, bg: '#667eea15', border: '#667eea30' },
                { label: 'Matching Filters', value: filteredAccommodations.length, bg: '#10b98115', border: '#10b98130' },
                { label: 'Price Range', value: `R${Math.min(...accommodations.map(a => a.price)).toLocaleString()} – R${Math.max(...accommodations.map(a => a.price)).toLocaleString()}`, bg: '#f59e0b15', border: '#f59e0b30', small: true },
              ].map((stat) => (
                <div key={stat.label} style={{ background: stat.bg, borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', border: `1px solid ${stat.border}` }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</span>
                  <span style={{ fontSize: stat.small ? '0.88rem' : '1.6rem', fontWeight: 700, color: '#000' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div style={{
            display: 'flex', gap: '0.75rem', background: 'white', borderRadius: '14px',
            padding: '0.85rem 1.2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', alignItems: 'center',
          }}>
            <span style={{ fontSize: '1.2rem' }}>🔍</span>
            <input type="text" placeholder="Search by accommodation name, location or address..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '0.95rem', color: '#333', background: 'transparent' }} />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: '1rem' }}>✕</button>
            )}
          </div>

          {/* Map Card */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.3rem', color: '#1f2937', fontWeight: 600 }}>Accommodations Map</h2>
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '320px' }}>
              <APIProvider apiKey="AIzaSyAN-LB45Qx5w4DwFSK4r2tVmrN7RPFrvK4">
                <Map mapId="96c55b40bb242bfc" style={{ width: '100%', height: '100%' }}
                  defaultCenter={{ lat: -25.8440, lng: 25.6280 }} defaultZoom={13}
                  gestureHandling="greedy" disableDefaultUI={false}>
                  {filteredAccommodations.map((item) => (
                    <AdvancedMarker key={item.id} position={{ lat: item.lat, lng: item.lng }}>
                      <Pin background="#667eea" glyphColor="#fff" borderColor="#764ba2" />
                    </AdvancedMarker>
                  ))}
                </Map>
              </APIProvider>
            </div>
          </div>

          {/* Listings Card */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.3rem', color: '#1f2937', fontWeight: 600 }}>
              Available Accommodations ({filteredAccommodations.length})
            </h2>
            <div className="accommodation-list">
              {filteredAccommodations.map((item) => (
                <div key={item.id} className="accommodation-card" onClick={() => onSelectAccommodation?.(item)}>
                  <div className="accommodation-image">
                    {item.image ? (
                      <img src={item.image} alt={`${item.name} photo`} className="accommodation-photo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#9ca3af;fontSize:0.85rem;">No Photo</div>';
                        }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', color: '#9ca3af', fontSize: '0.85rem' }}>
                        No Photo
                      </div>
                    )}
                  </div>
                  <div className="accommodation-info">
                    <h3>{item.name}</h3>
                    <p className="accommodation-price">R{item.price.toLocaleString()}</p>
                    <p className="accommodation-location">{item.location}</p>
                    <p className="accommodation-address">{item.address}</p>
                    <button className="view-room-btn" type="button">View room</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'rgba(0,0,0,0.25)', color: 'white', padding: '3rem 2rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.4rem', fontWeight: 700 }}>Biggy Housing</h3>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6 }}>
              Helping NWU students find safe, affordable accommodation in Mahikeng.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1rem', fontWeight: 700, fontSize: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Home', 'Browse Accommodations', 'How It Works', 'FAQs'].map((link) => (
                <a key={link} href="#" style={{ color: 'white', opacity: 0.85, fontSize: '0.9rem', textDecoration: 'none' }}
                  onMouseOver={(e) => e.target.style.opacity = 1} onMouseOut={(e) => e.target.style.opacity = 0.85}>{link}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1rem', fontWeight: 700, fontSize: '1rem' }}>About Us</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6 }}>
              Biggy Housing is a student-led platform built to simplify the off accommodation search for NWU students in Mahikeng Campus.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1rem', fontWeight: 700, fontSize: '1rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', opacity: 0.85 }}>
              <span>📧 goitseonebrian1@gmail.com.za</span>
              <span>📞 +27 73 765 5821</span>
              <span>📍 Mmabatho, North West, SA</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', opacity: 0.75 }}>
          © {new Date().getFullYear()} Biggy Housing. All rights reserved. Built for NWU Students.
        </div>
      </footer>
    </div>
  );
};