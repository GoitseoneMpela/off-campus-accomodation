

import React, { useState, useEffect } from 'react';

export const RoomPage = ({ accommodation, onBack, studentData, onApply, onSignOut }) => {
  const [rating, setRating] = useState(0);
  const [reportText, setReportText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    if (!accommodation) return;
    try {
      const saved = localStorage.getItem(`reviews_${accommodation.id}`);
      if (saved) {
        setReviews(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Error loading reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  }, [accommodation]);

  const handleSubmit = () => {
    if (!rating || !reportText.trim()) return;
    const newReview = {
      id: Date.now().toString(),
      accommodationId: accommodation.id,
      accommodationName: accommodation.name,
      author: studentData?.fullName || 'Anonymous',
      rating,
      content: reportText.trim(),
      createdAt: new Date().toISOString(),
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${accommodation.id}`, JSON.stringify(updatedReviews));
    setSubmitted(true);
    setRating(0);
    setReportText('');
  };

  const amenityIcons = {
    wifi: '📶',
    waterSupply: '💧',
    security: '🔒',
    parking: '🚗',
    laundry: '🧺',
    kitchen: '🍳',
    airCondition: '❄️',
    loadShedding: '🔋',
  };

  const StarDisplay = ({ count }) => (
    <div style={{ display: 'flex', gap: '0.2rem' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= count ? '#f59e0b' : '#d1d5db', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  );

  // ✅ Compact "B" monogram badge for the navbar (icon only, no wordmark)
  const NavLogoSVG = () => (
    <svg width="34" height="34" viewBox="0 0 88 100" role="img" style={{ display: 'block' }}>
      <title>Biggy Housing</title>
      <defs>
        <linearGradient id="navBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#764ba2' }} />
          <stop offset="100%" style={{ stopColor: '#667eea' }} />
        </linearGradient>
      </defs>
      <rect x="4" y="2" width="80" height="96" rx="16" fill="url(#navBadgeGrad)" />
      <rect x="9" y="7" width="70" height="86" rx="12" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
      <text x="44" y="68" fontFamily="Georgia, serif" fontSize="62" fontWeight="900" fill="white" textAnchor="middle" letterSpacing="-2">B</text>
      <circle cx="72" cy="86" r="5" fill="white" opacity="0.5" />
    </svg>
  );

  const getSecondaryImage = (imagePath) => {
    if (!imagePath) return null;
    const lastDot = imagePath.lastIndexOf('.');
    if (lastDot === -1) return null;
    return imagePath.substring(0, lastDot) + '1' + imagePath.substring(lastDot);
  };

  const secondaryImage = getSecondaryImage(accommodation?.image);

  if (!accommodation) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <p style={{ color: 'white', fontSize: '1.2rem' }}>No room selected.</p>
        <button onClick={onBack} style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '10px',
          border: 'none',
          background: 'white',
          color: '#667eea',
          fontWeight: 700,
          cursor: 'pointer',
        }}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Navbar */}
      <nav style={{
        background: 'white',
        padding: '0.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 99,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '14px',
            padding: '0.4rem 0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <NavLogoSVG />
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '1px' }}>BIGGY</span>
          </div>
          <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#1f2937', fontWeight: 700 }}>Room Details</h2>
        </div>

        {/* ✅ Back + Sign out buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={onBack} style={{
            padding: '0.5rem 1.2rem',
            borderRadius: '20px',
            border: 'none',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}>← Back</button>
          

          {onSignOut && (
            <button onClick={onSignOut} style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '20px',
              border: '1.5px solid #ef4444',
              background: 'white',
              color: '#ef4444',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#ef4444'; }}
            >Sign out</button>
            
          )}
        </div>
        

      </nav>

      {/* Main Content */}
      <div style={{
        padding: '2rem',
        display: 'flex',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        flex: 1,
      }}>

        {/* Left Column */}
        <div style={{
          flex: '1.4',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}>

          {/* Room Details Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}>

            {/* Main Photo */}
            {accommodation.image ? (
              <img
                src={accommodation.image}
                alt={accommodation.name}
                style={{
                  width: '100%',
                  height: '280px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  marginBottom: '1.25rem',
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '280px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                fontSize: '3rem',
              }}>🏠</div>
            )}

            {/* Name + Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: '0.5rem' }}>
              <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#1f2937', fontWeight: 700 }}>
                {accommodation.name}
              </h1>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#667eea' }}>
                  R{accommodation.price.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#6b7280' }}> / month</span>
              </div>
            </div>

            {/* Location */}
            <p style={{ margin: '0.5rem 0 0 0.5rem', color: '#6b7280', fontSize: '0.9rem', fontWeight: 600 }}>
              📍 {accommodation.address}
            </p>

            {/* Distance */}
            {accommodation.distance && (
              <p style={{
                margin: '0.25rem 0 0 0.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: Number(accommodation.distance) <= 2 ? '#10b981' : Number(accommodation.distance) <= 5 ? '#f59e0b' : '#ef4444',
              }}>
                🎓 {accommodation.distance} km from NWU Campus
              </p>
            )}

            {/* Amenities */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0.5rem' }}>
              {accommodation.amenities.map((amenity) => (
                <span key={amenity} style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  background: '#667eea15',
                  border: '1px solid #667eea30',
                  color: '#667eea',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}>
                  {amenityIcons[amenity] || '✓'} {amenity}
                </span>
              ))}
            </div>

            {/* Room Type */}
            <div style={{ margin: '0 0.5rem 1rem' }}>
              <span style={{
                padding: '0.35rem 1rem',
                borderRadius: '20px',
                background: '#764ba220',
                border: '1px solid #764ba240',
                color: '#764ba2',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'capitalize',
              }}>
                🛏️ {accommodation.type} Room
              </span>
            </div>

            {/* Description */}
            <div style={{ paddingLeft: '0.5rem' }}>
              <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: '#1f2937', fontWeight: 700 }}>
                About this accommodation
              </h2>
              <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.7, fontSize: '0.95rem' }}>
                {accommodation.description ||
                  `${accommodation.name} is a student accommodation located in ${accommodation.location}, offering comfortable living spaces for NWU students. The property provides essential amenities including ${accommodation.amenities.join(', ')}, making it an ideal choice for students seeking a convenient and affordable place to stay near the NWU Mmabatho campus.`}
              </p>
            </div>

            {/* Apply Now Button */}
            <button
              onClick={() => onApply(accommodation)}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '0.9rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              📋 Apply Now
            </button>
          </div>

          {/* Reviews List Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#1f2937', fontWeight: 700 }}>Reviews</h2>
              <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>
                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>

            {loadingReviews ? (
              <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <div style={{
                padding: '2rem',
                textAlign: 'center',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px dashed #e5e7eb',
              }}>
                <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>
                  No reviews yet. Be the first to write one!
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.map((review) => (
                  <div key={review.id} style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    background: '#f9fafb',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.95rem' }}>
                          {review.author}
                        </span>
                        <div style={{ marginTop: '0.25rem' }}>
                          <StarDisplay count={review.rating} />
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                        {new Date(review.createdAt).toLocaleDateString('en-ZA', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '0.88rem', lineHeight: 1.6 }}>
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Photos — stacked vertically, large size */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}>
            <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: '#1f2937', fontWeight: 700 }}>Photos</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {accommodation.image && (
                <img
                  src={accommodation.image}
                  alt={`${accommodation.name} photo 1`}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid #667eea20',
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}

              {secondaryImage && (
                <img
                  src={secondaryImage}
                  alt={`${accommodation.name} photo 2`}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '1px solid #667eea20',
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}

            </div>
          </div>

          {/* Write Review Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
            flex: 1,
          }}>
            <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#1f2937', fontWeight: 700 }}>
              Write a Review
            </h2>
            <p style={{ margin: '0 0 1rem', color: '#6b7280', fontSize: '0.88rem' }}>
              Stayed here before? Rate and share your experience.
            </p>

            {/* Star Rating Input */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredStar(value)}
                  onMouseLeave={() => setHoveredStar(0)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    color: (hoveredStar || rating) >= value ? '#f59e0b' : '#d1d5db',
                    transition: 'transform 0.1s ease',
                    transform: (hoveredStar || rating) >= value ? 'scale(1.15)' : 'scale(1)',
                    padding: 0,
                  }}
                >★</button>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              placeholder="Describe the condition, landlord, safety, value for money..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              rows={5}
              style={{
                width: '100%',
                borderRadius: '12px',
                border: '1.5px solid #e5e7eb',
                padding: '0.85rem',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'Arial, sans-serif',
                boxSizing: 'border-box',
                lineHeight: 1.6,
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!rating || !reportText.trim()}
              style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.85rem',
                borderRadius: '12px',
                border: 'none',
                background: rating && reportText.trim()
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#e5e7eb',
                color: rating && reportText.trim() ? 'white' : '#9ca3af',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: rating && reportText.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              Submit Review
            </button>

            {/* Success Message */}
            {submitted && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '12px',
                background: '#d1fae5',
                color: '#065f46',
                fontWeight: 600,
                fontSize: '0.9rem',
                textAlign: 'center',
              }}>
                ✅ Thank you! Your review has been posted.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0,0,0,0.25)',
        color: 'white',
        padding: '3rem 2rem 1.5rem',
        marginTop: 'auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <NavLogoSVG /> Biggy Housing
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6 }}>
              Helping NWU students find safe, affordable accommodation in Mahikeng and Mmabatho.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1rem', fontWeight: 700, fontSize: '1rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Home', 'Browse Accommodations', 'How It Works', 'FAQs'].map((link) => (
                <a key={link} href="#" style={{ color: 'white', opacity: 0.85, fontSize: '0.9rem', textDecoration: 'none' }}
                  onMouseOver={(e) => e.target.style.opacity = 1}
                  onMouseOut={(e) => e.target.style.opacity = 0.85}
                >{link}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1rem', fontWeight: 700, fontSize: '1rem' }}>About Us</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6 }}>
              Biggy Housing is a student-led platform built to simplify the accommodation search for NWU students.
            </p>
          </div>
          <div>
            <h4 style={{ margin: '0 0 1rem', fontWeight: 700, fontSize: '1rem' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', opacity: 0.85 }}>
              <span>📧 Goitseonebrian1@gmail.com.za</span>
              <span>📞 +27 73 765 5821</span>
              <span>📍 Mmabatho, North West, SA</span>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.2)',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          opacity: 0.75,
        }}>
          © {new Date().getFullYear()} Biggy Housing. All rights reserved. Built for NWU Students.
        </div>
      </footer>
    </div>
  );
};