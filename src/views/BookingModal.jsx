import { useState } from 'react';
import { useBookings, useRoutePrices, usePricingEvents, getPaymentMethodName, generateBookingCode, getTomorrowDate } from '../hooks';

function BookingModal({ schedule, searchParams, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [passenger, setPassenger] = useState({ name: '', phone: '', nik: '', pickup: '', dropoff: '' });
  const [paymentMethod, setPaymentMethod] = useState('gopay');
  const [processing, setProcessing] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const { addBooking } = useBookings();
  const { getPrice } = useRoutePrices();
  const { getAdjustedPrice } = usePricingEvents();

  const passengers = searchParams?.passengers || 1;
  const basePrice = getPrice(schedule.origin, schedule.destination, schedule.class);
  const date = searchParams?.date || getTomorrowDate();
  const { finalPrice, activeEvent } = getAdjustedPrice(basePrice, date);
  const totalPrice = finalPrice * passengers;

  const goTo = (s) => {
    if (s === 'success') {
      setBookingCode(generateBookingCode());
    }
    setStep(s);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!passenger.name || !passenger.phone || !passenger.nik || !passenger.pickup || !passenger.dropoff) {
        alert('Mohon lengkapi semua data penumpang.');
        return;
      }
      goTo(2);
    } else if (step === 2) {
      setProcessing(true);
      setTimeout(() => {
        const newBooking = {
          code: bookingCode || generateBookingCode(),
          schedule: { ...schedule, price: finalPrice },
          passenger,
          passengersCount: passengers,
          date,
          paymentMethod: getPaymentMethodName(paymentMethod),
          status: 'Aktif',
        };
        addBooking(newBooking);
        setProcessing(false);
        goTo('success');
        onSuccess?.();
      }, 2000);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleBackHome = () => {
    onClose();
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
  };

  const paymentDetails = {
    'gopay': 'Simulasi E-Wallet GoPay/OVO: Setelah menekan "Bayar Sekarang", sistem akan menampilkan simulasi hitungan mundur verifikasi e-Wallet. Silakan klik bayar untuk menyelesaikan pemesanan.',
    'dana': 'Simulasi QRIS DANA/ShopeePay: Tiket akan diverifikasi secara otomatis menggunakan kode QRIS statis setelah Anda klik bayar.',
    'va-bca': 'BCA Virtual Account: Transfer ke nomor VA 80777 + nomor HP Anda. Pembayaran akan terverifikasi secara otomatis.',
    'va-mandiri': 'Mandiri Virtual Account: Transfer ke nomor VA 88908 + nomor HP Anda. Pembayaran akan terverifikasi secara otomatis.',
    'va-bni': 'BNI Virtual Account: Transfer ke nomor VA 8277 + nomor HP Anda. Pembayaran akan terverifikasi secara otomatis.',
  };

  const dateFormatted = new Date(date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const isActive = (m) => paymentMethod === m;

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="headline-md" id="modal-booking-title">Form Pemesanan Tiket</h3>
          <button className="modal-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="step-indicator">
            <div className={`step-item ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}>
              <div className="step-number">1</div>
              <span className="step-label">Detail Penumpang</span>
            </div>
            <div className={`step-item ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}>
              <div className="step-number">2</div>
              <span className="step-label">Pembayaran</span>
            </div>
          </div>

          {step === 1 && (
            <div className="booking-step active" id="booking-step-1">
              <h4 className="headline-md" style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--color-primary)' }}>
                Detail Penumpang & Layanan Antar-Jemput
              </h4>
              <form onSubmit={(e) => { e.preventDefault(); }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="label-md">Nama Lengkap Penumpang</label>
                    <input type="text" className="form-control" placeholder="Sesuai KTP/SIM" required
                      value={passenger.name} onChange={(e) => setPassenger({ ...passenger, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="label-md">Nomor WhatsApp/HP</label>
                    <input type="tel" className="form-control" placeholder="Contoh: 0812XXXXXXXX" required
                      value={passenger.phone} onChange={(e) => setPassenger({ ...passenger, phone: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label className="label-md">Nomor Identitas (NIK/KTP)</label>
                    <input type="text" className="form-control" placeholder="16 digit NIK" required
                      value={passenger.nik} onChange={(e) => setPassenger({ ...passenger, nik: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="label-md">Saluran Notifikasi</label>
                    <div className="form-control" style={{ backgroundColor: 'var(--color-surface-container-low)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-on-surface-variant)', fontWeight: 600, minHeight: '40px', border: '1px solid var(--color-outline-variant)', borderRadius: 'var(--radius-sm)' }}>
                      WhatsApp Saja
                    </div>
                  </div>
                </div>
                <div className="address-grid">
                  <div className="form-group">
                    <label className="label-md">Alamat Penjemputan (Asal)</label>
                    <textarea className="form-control" rows="3" placeholder="Tulis jalan, nomor rumah, RT/RW, dan patokan penjemputan" required
                      value={passenger.pickup} onChange={(e) => setPassenger({ ...passenger, pickup: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="label-md">Alamat Pengantaran (Tujuan)</label>
                    <textarea className="form-control" rows="3" placeholder="Tulis alamat lengkap destinasi tujuan Anda" required
                      value={passenger.dropoff} onChange={(e) => setPassenger({ ...passenger, dropoff: e.target.value })} />
                  </div>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="booking-step active" id="booking-step-2">
              <h4 className="headline-md" style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--color-primary)' }}>
                Selesaikan Pembayaran Digital
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
                <div>
                  <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '12px' }}>
                    Pilih salah satu metode pembayaran di bawah untuk melakukan simulasi transaksi:
                  </p>
                  <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '8px', fontWeight: 700 }}>
                    Metode E-Wallet:
                  </p>
                  <div className="payment-methods" style={{ marginBottom: '16px' }}>
                    <div className={`payment-method-card ${isActive('gopay') ? 'active' : ''}`} onClick={() => setPaymentMethod('gopay')}>
                      <input type="radio" name="pay-method" checked={isActive('gopay')} readOnly />
                      <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ fontSize: '14px' }}>GoPay / OVO</strong>
                        <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>Instan & Otomatis</span>
                      </label>
                    </div>
                    <div className={`payment-method-card ${isActive('dana') ? 'active' : ''}`} onClick={() => setPaymentMethod('dana')}>
                      <input type="radio" name="pay-method" checked={isActive('dana')} readOnly />
                      <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ fontSize: '14px' }}>DANA / ShopeePay</strong>
                        <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>Instan QRIS</span>
                      </label>
                    </div>
                  </div>
                  <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '8px', fontWeight: 700 }}>
                    Virtual Account Bank:
                  </p>
                  <div className="payment-methods" style={{ marginBottom: '24px', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    {['va-bca', 'va-mandiri', 'va-bni'].map(m => (
                      <div key={m} className={`payment-method-card ${isActive(m) ? 'active' : ''}`} style={{ padding: '10px' }} onClick={() => setPaymentMethod(m)}>
                        <input type="radio" name="pay-method" checked={isActive(m)} readOnly />
                        <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                          <strong style={{ fontSize: '13px' }}>{m === 'va-bca' ? 'BCA VA' : m === 'va-mandiri' ? 'Mandiri VA' : 'BNI VA'}</strong>
                          <span style={{ fontSize: '10px', color: 'var(--color-on-surface-variant)' }}>Verifikasi Instan</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="payment-method-details">
                    <p><strong>Simulasi {getPaymentMethodName(paymentMethod)}:</strong> {paymentDetails[paymentMethod]}</p>
                  </div>
                </div>
                <div className="booking-summary-box">
                  <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '12px', fontSize: '15px' }}>
                    Rincian Harga Tiket:
                  </h5>
                  <div className="summary-row">
                    <span>{schedule.origin} &rarr; {schedule.destination}</span>
                    <span>{passengers}x Tiket</span>
                  </div>
                  <div className="summary-row">
                    <span>Shuttle Class</span>
                    <span>{schedule.class}</span>
                  </div>
                  <div className="summary-row">
                    <span>Biaya Layanan Door-to-Door</span>
                    <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>GRATIS</span>
                  </div>
                  {activeEvent && (
                    <div className="summary-row">
                      <span>Penyesuaian: {activeEvent.name}</span>
                      <span style={{ color: 'var(--color-error)', fontWeight: 600 }}>
                        {activeEvent.type.startsWith('markup') ? '+' : '-'}Rp {(Math.abs(activeEvent.type === 'markup-percent' ? Math.round(basePrice * activeEvent.value / 100) : activeEvent.value) * passengers).toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Total Pembayaran</span>
                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="booking-step active" id="booking-step-success">
              <div className="ticket-confirmed-container">
                <div className="ticket-success-icon">&#10003;</div>
                <h3 className="headline-md" style={{ color: 'var(--color-secondary)' }}>
                  Pembayaran Berhasil Dikonfirmasi!
                </h3>
                <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '500px', margin: '8px auto 0 auto' }}>
                  E-Tiket Anda telah terbit dan siap digunakan. Detail tiket dikirim via WhatsApp simulator ke nomor Anda.
                </p>
                <div className="e-ticket">
                  <div className="ticket-header">
                    <h4>E-Tiket Resmi</h4>
                    <span className="label-bold" style={{ backgroundColor: 'var(--color-secondary)', color: '#ffffff', padding: '2px 8px', borderRadius: 'var(--radius-sm)', fontSize: '10px' }}>
                      Aktif
                    </span>
                  </div>
                  <div className="ticket-body">
                    <div className="ticket-info-grid">
                      <div className="ticket-info-item">
                        <label>KODE BOOKING</label>
                        <span style={{ color: 'var(--color-primary)', fontSize: '16px', fontWeight: 800 }}>{bookingCode}</span>
                      </div>
                      <div className="ticket-info-item">
                        <label>NAMA PENUMPANG</label>
                        <span>{passenger.name}</span>
                      </div>
                      <div className="ticket-info-item">
                        <label>RUTE PERJALANAN</label>
                        <span>{schedule.origin} &rarr; {schedule.destination}</span>
                      </div>
                      <div className="ticket-info-item">
                        <label>TANGGAL & WAKTU</label>
                        <span>{dateFormatted}<br />Jam {schedule.depTime} WITA</span>
                      </div>
                      <div className="ticket-info-item">
                        <label>KELAS & ARMADA</label>
                        <span>{schedule.class} ({schedule.plate})</span>
                      </div>
                      <div className="ticket-info-item">
                        <label>JUMLAH PENUMPANG</label>
                        <span>{passengers} Orang</span>
                      </div>
                    </div>
                    <div className="ticket-divider"></div>
                    <div className="ticket-qr-section">
                      <div className="ticket-qr-code">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingCode}`}
                          className="ticket-qr-code-img"
                          alt="QR E-ticket"
                        />
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
                <div style={{ marginTop: '32px' }}>
                  <button className="btn btn-outline" onClick={handleBackHome} style={{ marginRight: '12px' }}>
                    Kembali ke Home
                  </button>
                  <button className="btn btn-primary btn-icon" onClick={() => alert('Simulasi download E-Tiket PDF berhasil diproses ke perangkat Anda.')}>
                    Simpan E-Tiket
                  </button>
                </div>
              </div>
            </div>
          )}

          {step !== 'success' && (
            <div className="step-actions" id="booking-modal-actions">
              <button className="btn btn-outline" onClick={() => goTo(step - 1)} style={{ visibility: step === 1 ? 'hidden' : 'visible' }}>
                Sebelumnya
              </button>
              <button className="btn btn-primary" onClick={handleNext} disabled={processing}>
                {processing ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ animation: 'pulse 1s infinite' }}>...</span> Memproses Pembayaran...
                  </span>
                ) : step === 1 ? 'Selanjutnya: Pembayaran' : 'Bayar Sekarang'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
