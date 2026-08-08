function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Borneo<span className="logo-accent">Journey</span></h3>
            <p>Layanan shuttle premium menghubungkan Kalimantan Selatan dan Kalimantan Tengah dengan kenyamanan ekstra.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" className="social-icon" aria-label="Facebook">f</a>
              <a href="#" className="social-icon" aria-label="Instagram">IG</a>
              <a href="#" className="social-icon" aria-label="Twitter">X</a>
              <a href="#" className="social-icon" aria-label="WhatsApp">WA</a>
            </div>
          </div>
          <div className="footer-links-col">
            <h4>Perusahaan</h4>
            <ul>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
            </ul>
          </div>
          <div className="footer-links-col">
            <h4>Layanan</h4>
            <ul>
              <li><a href="#">Rute & Harga</a></li>
              <li><a href="#">Pusat Bantuan</a></li>
              <li><a href="#">Hubungi Kami</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 BorneoJourney. All rights reserved.</span>
          <span>Solusi Travel Kalimantan Selatan & Tengah</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
