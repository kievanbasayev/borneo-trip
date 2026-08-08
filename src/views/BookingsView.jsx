import { useState, useEffect } from 'react';
import { useBookings, useAuth } from '../hooks';

function BookingsView() {
  const { bookings } = useBookings();
  const { currentUser } = useAuth();
  const [showTicket, setShowTicket] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail === 'bookings') {
        setShowTicket(null);
      }
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  const dateFormatted = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const showProfile = currentUser?.role === 'customer';
  const profile = currentUser?.profile || { name: 'Nama Pengguna', phone: '', nik: '' };

  return (
    <section className="section container">
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <h2 className="headline-lg">Riwayat Pemesanan & Profil</h2>
        <p className="body-md">Kelola detail profil penumpang dan tiket aktif perjalanan Anda.</p>
      </div>

      <div className="profile-grid-container">
        {showProfile && (
          <div className="profile-card-left" id="profile-edit-card">
            <div style={{
              width: '90px', height: '90px', borderRadius: 'var(--radius-full)',
              border: '3px solid var(--color-primary-fixed)', backgroundColor: 'var(--color-primary-fixed)',
              color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '36px', margin: '0 auto 16px'
            }}>
              {profile.name?.charAt(0).toUpperCase()}
            </div>
            <h4 className="headline-md" style={{ fontSize: '18px', marginBottom: '4px' }} id="profile-card-name">
              {profile.name || 'Nama Pengguna'}
            </h4>
            <p className="body-sm" id="profile-card-email" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
              {currentUser?.email || 'email@domain.com'}
            </p>
            <form style={{ textAlign: 'left' }} onSubmit={(e) => {
              e.preventDefault();
              alert('Fitur update profile akan segera hadir.');
            }}>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="label-md">Nama Lengkap</label>
                <input type="text" className="form-control" defaultValue={profile.name || ''} required />
              </div>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="label-md">Nomor WhatsApp</label>
                <input type="tel" className="form-control" defaultValue={profile.phone || ''} required />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="label-md">Nomor NIK (KTP)</label>
                <input type="text" className="form-control" defaultValue={profile.nik || ''} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', minHeight: '40px', fontSize: '13px' }}>
                Simpan Perubahan
              </button>
            </form>
          </div>
        )}

        <div className={showProfile ? '' : ''} style={{ gridColumn: showProfile ? 'auto' : '1 / -1' }}>
          {bookings.length === 0 ? (
            <div className="empty-bookings-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-outline-variant)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block' }}>
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <h3 className="headline-md" style={{ marginBottom: '8px' }}>Belum Ada Riwayat Perjalanan</h3>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
                Silakan lakukan pencarian rute dan pesan tiket shuttle pertama Anda.
              </p>
              <button className="btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }))}>
                Cari Tiket Sekarang
              </button>
            </div>
          ) : (
            bookings.map((booking, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-level1)', border: '1px solid var(--color-outline-variant)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column', marginBottom: '16px'
              }}>
                <div style={{
                  backgroundColor: 'var(--color-surface-container-low)', padding: '16px 24px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: '1px solid var(--color-surface-container-high)'
                }}>
                  <div>
                    <span className="label-md" style={{ color: 'var(--color-on-surface-variant)' }}>Kode Booking</span>
                    <strong style={{ marginLeft: '8px', fontSize: '15px', color: 'var(--color-primary)' }}>{booking.code}</strong>
                  </div>
                  <span className="label-bold" style={{
                    backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)',
                    padding: '4px 12px', borderRadius: 'var(--radius-full)'
                  }}>{booking.status}</span>
                </div>
                <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', alignItems: 'center', gap: '24px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                      <strong style={{ fontSize: '18px', color: 'var(--color-primary)' }}>{booking.schedule.origin}</strong>
                      <span style={{ color: 'var(--color-outline)' }}>&rarr;</span>
                      <strong style={{ fontSize: '18px', color: 'var(--color-primary)' }}>{booking.schedule.destination}</strong>
                    </div>
                    <div className="body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                      <div>Tanggal: <strong>{dateFormatted(booking.date)}</strong> | Jam: <strong>{booking.schedule.depTime} WITA</strong></div>
                      <div>Penumpang: <strong>{booking.passenger.name} ({booking.passengersCount} Orang)</strong></div>
                    </div>
                  </div>
                  <div>
                    <span className="label-md" style={{ display: 'block', color: 'var(--color-on-surface-variant)', marginBottom: '4px' }}>Armada / Shuttle</span>
                    <strong style={{ fontSize: '14px', color: 'var(--color-on-surface)' }}>{booking.schedule.class}</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>HiAce ({booking.schedule.plate})</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button className="btn btn-outline btn-icon" style={{ height: '40px', minHeight: '40px', fontSize: '13px' }}
                      onClick={() => setShowTicket(booking)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 9V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2" />
                        <path d="M2 13v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2" />
                        <path d="M2 11h20" />
                      </svg>
                      Lihat E-Tiket
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showTicket && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) setShowTicket(null); }}>
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3 className="headline-md">E-Tiket {showTicket.code}</h3>
              <button className="modal-close" onClick={() => setShowTicket(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="e-ticket" style={{ margin: '0' }}>
                <div className="ticket-header">
                  <h4>E-Tiket Resmi</h4>
                  <span className="label-bold" style={{ backgroundColor: 'var(--color-secondary)', color: '#ffffff', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '10px' }}>
                    {showTicket.status}
                  </span>
                </div>
                <div className="ticket-body">
                  <div className="ticket-info-grid">
                    <div className="ticket-info-item">
                      <label>KODE BOOKING</label>
                      <span style={{ color: 'var(--color-primary)', fontSize: '16px', fontWeight: 800 }}>{showTicket.code}</span>
                    </div>
                    <div className="ticket-info-item">
                      <label>NAMA PENUMPANG</label>
                      <span>{showTicket.passenger.name}</span>
                    </div>
                    <div className="ticket-info-item">
                      <label>RUTE PERJALANAN</label>
                      <span>{showTicket.schedule.origin} &rarr; {showTicket.schedule.destination}</span>
                    </div>
                    <div className="ticket-info-item">
                      <label>TANGGAL & WAKTU</label>
                      <span>{dateFormatted(showTicket.date)}<br />Jam {showTicket.schedule.depTime} WITA</span>
                    </div>
                    <div className="ticket-info-item">
                      <label>KELAS & ARMADA</label>
                      <span>{showTicket.schedule.class} ({showTicket.schedule.plate})</span>
                    </div>
                    <div className="ticket-info-item">
                      <label>JUMLAH PENUMPANG</label>
                      <span>{showTicket.passengersCount} Orang</span>
                    </div>
                  </div>
                  <div className="ticket-divider"></div>
                  <div className="ticket-qr-section">
                    <div className="ticket-qr-code">
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${showTicket.code}`} className="ticket-qr-code-img" alt="QR E-ticket" />
                    </div>
                    <div className="ticket-qr-text">
                      <strong style={{ color: 'var(--color-primary)', display: 'block', marginBottom: '4px' }}>Pindai Saat Boarding</strong>
                      <span className="body-sm" style={{ fontSize: '11px' }}>
                        Tunjukkan QR Code ini kepada driver shuttle saat penjemputan alamat.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BookingsView;
