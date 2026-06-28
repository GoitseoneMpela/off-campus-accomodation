import React, { useState } from 'react';

export const ApplicationPage = ({ accommodation, studentData, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    tel: '',
    yearOfApplication: '',
    nsfasFunded: false,
    bursaryFunded: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setSubmittedData({
        ...formData,
        submittedAt: new Date(),
        applicationRef: 'BH-' + Date.now().toString().slice(-6),
      });
    }, 1500);
  };

  const handlePrintProof = () => {
    const submittedAt = submittedData?.submittedAt
      ? new Date(submittedData.submittedAt)
      : new Date();

    const doc = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Proof of Application — Biggy Housing</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #1f2937;
            background: white;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px solid #667eea;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: 800;
            color: #667eea;
            letter-spacing: 1px;
          }
          .logo span {
            color: #764ba2;
          }
          .badge {
            background: #d1fae5;
            color: #065f46;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
          }
          .ref {
            font-size: 13px;
            color: #6b7280;
            margin-top: 4px;
          }
          .section {
            margin-bottom: 28px;
          }
          .section-title {
            font-size: 12px;
            font-weight: 700;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            padding-bottom: 6px;
            border-bottom: 1px solid #e5e7eb;
          }
          .row {
            display: flex;
            gap: 40px;
            margin-bottom: 10px;
          }
          .field {
            flex: 1;
          }
          .field label {
            font-size: 11px;
            color: #9ca3af;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
            margin-bottom: 3px;
          }
          .field p {
            font-size: 14px;
            font-weight: 600;
            color: #1f2937;
          }
          .price-box {
            background: #667eea15;
            border: 1px solid #667eea30;
            border-radius: 10px;
            padding: 14px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          .price-box span {
            font-size: 13px;
            color: #6b7280;
            font-weight: 600;
          }
          .price-box strong {
            font-size: 22px;
            font-weight: 800;
            color: #667eea;
          }
          .funding-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            padding: 12px 16px;
            font-size: 13px;
            font-weight: 600;
            color: #374151;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .footer p {
            font-size: 11px;
            color: #9ca3af;
            line-height: 1.6;
          }
          .stamp {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 700;
            text-align: center;
          }
          @media print {
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>

        <div class="header">
          <div>
            <div class="logo">🏠 BIGGY <span>HOUSING</span></div>
            <p class="ref">Reference: ${submittedData?.applicationRef || 'N/A'}</p>
          </div>
          <div style="text-align:right">
            <div class="badge">✅ Provisionally Placed</div>
            <p class="ref" style="margin-top:6px">
              ${submittedAt.toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              &nbsp;|&nbsp;
              ${submittedAt.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        <!-- Student Details -->
        <div class="section">
          <div class="section-title">Student Information</div>
          <div class="row">
            <div class="field">
              <label>Full Name</label>
              <p>${studentData?.fullName || 'N/A'}</p>
            </div>
            <div class="field">
              <label>Student Number</label>
              <p>${studentData?.studentNumber || 'N/A'}</p>
            </div>
          </div>
          <div class="row">
            <div class="field">
              <label>Faculty</label>
              <p>${studentData?.faculty || 'N/A'}</p>
            </div>
            <div class="field">
              <label>Course</label>
              <p>${studentData?.course || 'N/A'}</p>
            </div>
          </div>
          <div class="row">
            <div class="field">
              <label>Year of Study</label>
              <p>${studentData?.yearOfStudy || 'N/A'}</p>
            </div>
            <div class="field">
              <label>Funding Status</label>
              <p>${studentData?.Bursary || 'N/A'}</p>
            </div>
          </div>
        </div>

        <!-- Contact Details -->
        <div class="section">
          <div class="section-title">Contact Details Provided</div>
          <div class="row">
            <div class="field">
              <label>Email Address</label>
              <p>${formData.email || 'N/A'}</p>
            </div>
            <div class="field">
              <label>Cellphone Number</label>
              <p>${formData.tel || 'N/A'}</p>
            </div>
          </div>
          <div class="row">
            <div class="field">
              <label>Year of Application</label>
              <p>${formData.yearOfApplication || 'N/A'}</p>
            </div>
          </div>
        </div>

        <!-- Accommodation Details -->
        <div class="section">
          <div class="section-title">Accommodation Applied For</div>
          <div class="row">
            <div class="field">
              <label>Residence Name</label>
              <p>${accommodation.name}</p>
            </div>
            <div class="field">
              <label>Location</label>
              <p>${accommodation.location}</p>
            </div>
          </div>
          <div class="row">
            <div class="field">
              <label>Address</label>
              <p>${accommodation.address}</p>
            </div>
            <div class="field">
              <label>Room Type</label>
              <p style="text-transform:capitalize">${accommodation.type} Room</p>
            </div>
          </div>

          <div class="price-box">
            <span>Monthly Rent</span>
            <strong>R${accommodation.price.toLocaleString()}</strong>
          </div>

          <div class="funding-box">
            💰 Funding:
            ${formData.nsfasFunded ? '✅ NSFAS Funded' : ''}
            ${formData.bursaryFunded ? '✅ Other Bursary' : ''}
            ${!formData.nsfasFunded && !formData.bursaryFunded ? 'Self-Funded' : ''}
          </div>
        </div>

        <div class="footer">
          <p>
            This document serves as proof that your application was submitted to Biggy Housing.<br/>
            You will be contacted via the details you provided.<br/>
            📧 goitseonebrian1@gmail.com.za &nbsp;|&nbsp; 📞 +27 73 765 5821
          </p>
          <div class="stamp">
            🏠 Biggy Housing<br/>
            Official Proof of Application
          </div>
        </div>

      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(doc);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

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
        <p style={{ color: 'white', fontSize: '1.2rem' }}>No accommodation selected.</p>
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
            borderRadius: '0 20px 20px 0',
            padding: '0.5rem 1.2rem',
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '1px' }}>🏠 BIGGY Housing</span>
          </div>
          <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#1f2937', fontWeight: 700 }}>Application</h2>
        </div>
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
      </nav>

      {/* Header Section */}
      <div style={{
        background: 'white',
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            flexShrink: 0,
          }}>🏠</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#1f2937' }}>
              {accommodation.name}
            </h1>
            <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.85rem', fontWeight: 600 }}>
              📍 {accommodation.location}
            </p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '2px dashed rgba(255,255,255,0.3)' }} />

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
        flexWrap: 'wrap',
      }}>

        {/* Left — Application Form */}
        <div style={{ flex: '1.4', minWidth: '300px' }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}>

            {submitted ? (
              /* ✅ Success Screen */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem 1rem',
                gap: '1rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '5rem' }}>✉️</div>
                <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#1f2937' }}>
                  Successfully Applied!
                </h2>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>
                  Well done, your application for <strong>{accommodation.name}</strong> has been submitted!
                </p>

                {/* Reference Number */}
                <div style={{
                  background: '#667eea15',
                  border: '1px solid #667eea30',
                  borderRadius: '12px',
                  padding: '0.75rem 1.5rem',
                  marginTop: '0.5rem',
                }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 }}>Application Reference</p>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '1.2rem', fontWeight: 800, color: '#667eea' }}>
                    {submittedData?.applicationRef}
                  </p>
                </div>

                {/* ✅ Proof of Application Button */}
                <button
                  onClick={handlePrintProof}
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem 2rem',
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
                  🖨️ Download Proof of Application
                </button>
              </div>
            ) : (
              /* Application Form */
              <>
                <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', fontWeight: 700, color: '#1f2937' }}>
                  Your Contact Details
                </h2>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: '#1f2937',
                  borderRadius: '8px',
                  padding: '0.6rem 1rem',
                  marginBottom: '1.5rem',
                }}>
                  <span style={{ fontSize: '1rem' }}>ℹ️</span>
                  <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.82rem' }}>
                    Please ensure that you can receive communication from the details you provide.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        background: '#fbfbfb',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                      Cellphone Number
                    </label>
                    <input
                      type="tel"
                      name="tel"
                      placeholder="Your Cellphone Number"
                      required
                      value={formData.tel}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        background: '#fbfbfb',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>

                  {/* Year of Application */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                      Year of Application
                    </label>
                    <select
                      name="yearOfApplication"
                      required
                      value={formData.yearOfApplication}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        background: '#fbfbfb',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: formData.yearOfApplication ? '#1f2937' : '#9ca3af',
                      }}
                    >
                      <option value="" disabled>Select Year</option>
                      <option value="2024">2026</option>
                      <option value="2025">2027</option>
                      <option value="2026">2028</option>
                      <option value="2027">2029</option>
                    </select>
                  </div>

                  {/* Bursary Note */}
                  <p style={{ margin: '0 0 0.75rem', color: '#9ca3af', fontSize: '0.8rem' }}>
                    If you have a bursary indicate below, otherwise leave unchecked.
                  </p>

                  {/* Checkboxes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}>
                      <input
                        type="checkbox"
                        name="nsfasFunded"
                        checked={formData.nsfasFunded}
                        onChange={handleChange}
                        style={{ width: '16px', height: '16px', accentColor: '#667eea', cursor: 'pointer' }}
                      />
                      I am NSFAS funded.
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}>
                      <input
                        type="checkbox"
                        name="bursaryFunded"
                        checked={formData.bursaryFunded}
                        onChange={handleChange}
                        style={{ width: '16px', height: '16px', accentColor: '#667eea', cursor: 'pointer' }}
                      />
                      Funded by a different bursary.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#1f2937',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.85'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    {loading ? (
                      <span style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid white',
                        borderTopColor: 'transparent',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'spin 0.7s linear infinite',
                      }} />
                    ) : (
                      <span>📋</span>
                    )}
                    Submit Application
                  </button>

                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Right — Residence Details */}
        <div style={{ flex: '1', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Accommodation Info Card */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '1.5rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, color: '#1f2937' }}>
              Accommodation Details
            </h3>

            {accommodation.image ? (
              <img
                src={accommodation.image}
                alt={accommodation.name}
                style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '160px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                marginBottom: '1rem',
              }}>🏠</div>
            )}

            <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', fontWeight: 700, color: '#1f2937' }}>
              {accommodation.name}
            </h4>
            <p style={{ margin: '0 0 0.5rem', color: '#6b7280', fontSize: '0.85rem' }}>
              📍 {accommodation.address}
            </p>
            {accommodation.distance && (
              <p style={{
                margin: '0 0 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: Number(accommodation.distance) <= 2 ? '#10b981' : Number(accommodation.distance) <= 5 ? '#f59e0b' : '#ef4444',
              }}>
                🎓 {accommodation.distance} km from NWU Campus
              </p>
            )}

            {/* Price */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              background: '#667eea15',
              borderRadius: '10px',
              marginBottom: '1rem',
              border: '1px solid #667eea30',
            }}>
              <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>Monthly Rent</span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#667eea' }}>
                R{accommodation.price.toLocaleString()}
              </span>
            </div>

            {/* Room Type */}
            <div style={{ marginBottom: '1rem' }}>
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

            {/* Amenities */}
            <div>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Amenities
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {accommodation.amenities.map((amenity) => (
                  <span key={amenity} style={{
                    padding: '0.25rem 0.7rem',
                    borderRadius: '20px',
                    background: '#667eea15',
                    border: '1px solid #667eea30',
                    color: '#667eea',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}>
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Student Info Card */}
          {studentData && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              borderLeft: '4px solid #667eea',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  ['Full Name', studentData.fullName],
                  ['Student Number', studentData.studentNumber],
                  ['Course', studentData.course],
                  ['Year of Study', studentData.yearOfStudy],
                  ['Bursary', studentData.Bursary],
                ].map(([label, value]) => value ? (
                  <div key={label}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {label}
                    </span>
                    <p style={{ margin: '0.1rem 0 0', fontSize: '0.9rem', fontWeight: 600, color: '#1f2937' }}>
                      {value}
                    </p>
                  </div>
                ) : null)}
              </div>
            </div>
          )}
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
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.4rem', fontWeight: 700 }}>🏠 Biggy Housing</h3>
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