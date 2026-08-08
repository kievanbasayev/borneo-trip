function Features() {
  return (
    <section className="section">
      <div className="max-w-container-max mx-auto">
        <div className="section-header">
          <h2 className="headline-lg">Mengapa Memilih BorneoJourney?</h2>
          <p className="body-md">Standar pelayanan premium untuk kenyamanan perjalanan Anda.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card door-to-door">
            <div className="feature-icon-wrapper">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>directions_car</span>
            </div>
            <h3>Door-to-Door</h3>
            <p className="body-sm">Kami menjemput dan mengantar Anda tepat dari depan pintu rumah hingga alamat tujuan tanpa repot transit.</p>
          </div>
          <div className="feature-card tracking">
            <div className="feature-icon-wrapper">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>share_location</span>
            </div>
            <h3>Pelacakan Real-time</h3>
            <p className="body-sm">Pantau posisi armada kami secara langsung melalui aplikasi untuk ketenangan pikiran selama perjalanan.</p>
          </div>
          <div className="feature-card payment">
            <div className="feature-icon-wrapper">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>verified_user</span>
            </div>
            <h3>Pembayaran Aman</h3>
            <p className="body-sm">Transaksi digital yang terenkripsi dan aman dengan berbagai pilihan metode pembayaran modern.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
