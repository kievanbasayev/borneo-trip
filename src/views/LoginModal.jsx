import { useState } from 'react';

function LoginModal({ onClose, onLoginSuccess, login }) {
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      if (email === 'admin@mail.com' && password === 'admin123') {
        login({ email, role: 'admin' });
        onLoginSuccess?.('admin');
      } else {
        alert('Email atau kata sandi Admin salah.');
      }
    } else {
      const isValid = (email === 'pelanggan@mail.com' || email === '081234567890' || email === '08123456789') && password === 'user123';
      if (isValid) {
        login({
          email: email.includes('@') ? email : 'pelanggan@mail.com',
          role: 'customer',
          profile: {
            name: 'Andi Setiawan',
            phone: email.includes('@') ? '081234567890' : email,
            nik: '6371020304050001',
          },
        });
        onLoginSuccess?.('customer');
      } else {
        alert('Nomor WhatsApp / Email atau kata sandi Pelanggan salah.');
      }
    }
  };

  const quickFill = () => {
    if (role === 'admin') {
      setEmail('admin@mail.com');
      setPassword('admin123');
    } else {
      setEmail('081234567890');
      setPassword('user123');
    }
  };

  const isAdmin = role === 'admin';

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="headline-md">Masuk ke BorneoJourney</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="login-tabs">
            <button className={`login-tab ${!isAdmin ? 'active' : ''}`} onClick={() => { setRole('customer'); }}>
              Penumpang
            </button>
            <button className={`login-tab ${isAdmin ? 'active' : ''}`} onClick={() => { setRole('admin'); }}>
              Administrator
            </button>
          </div>

          <div className="login-hint">
            <strong>{isAdmin ? 'Akun Demo Administrator:' : 'Akun Demo Pelanggan:'}</strong>
            <br />
            <span>{isAdmin ? 'admin@mail.com' : '081234567890 (atau pelanggan@mail.com)'}</span>
            <br />
            <span>{isAdmin ? 'admin123' : 'user123'}</span>
            <br />
            <button type="button" className="quick-fill-btn" onClick={quickFill}>Isi Otomatis</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="label-md">{isAdmin ? 'Alamat Email' : 'Nomor WhatsApp atau Email'}</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isAdmin ? 'nama@domain.com' : 'Contoh: 0812XXXXXXXX atau nama@domain.com'}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="label-md">Kata Sandi</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                required
              />
            </div>
            <input type="hidden" id="login-role" value={role} />
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
