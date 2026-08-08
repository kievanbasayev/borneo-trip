function PopularRoutes({ onRouteClick }) {
  const routes = [
    { from: 'Banjarmasin', to: 'Palangkaraya', price: 'Rp 150k', image: '/images/banjarmasin.jpg', alt: 'Banjarmasin ke Palangkaraya' },
    { from: 'Banjarbaru', to: 'Sampit', price: 'Rp 200k', image: '/images/banjarbaru-sampit.jpg', alt: 'Banjarbaru ke Sampit' },
    { from: 'Palangkaraya', to: 'Banjarmasin', price: 'Rp 150k', image: '/images/palangkaraya.jpg', alt: 'Palangkaraya ke Banjarmasin' },
  ];

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="max-w-container-max mx-auto px-margin-desktop">
        <div className="routes-header">
          <div className="left">
            <h2 className="headline-lg">Rute Populer</h2>
            <p className="body-md">Destinasi favorit pelanggan setia kami.</p>
          </div>
          <button className="hidden md:flex items-center" style={{ color: 'var(--color-primary)', fontWeight: 600, gap: '6px', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => onRouteClick({ origin: 'Banjarmasin', destination: 'Palangkaraya' })}>
            Lihat Semua Rute <span style={{ fontSize: '16px' }}>&rarr;</span>
          </button>
        </div>
        <div className="routes-grid">
          {routes.map((route, index) => (
            <div
              key={index}
              className="route-card"
              onClick={() => onRouteClick({ origin: route.from, destination: route.to })}
            >
              <div className="route-image-wrapper">
                <img
                  alt={route.alt}
                  className="w-full h-full object-cover"
                  src={route.image}
                />
                {index === 0 && <div className="route-badge label-bold">TERSEDIA</div>}
                {index === 2 && <div className="route-badge label-bold">TERSEDIA</div>}
              </div>
              <div className="route-info">
                <div className="route-cities">
                  <span>{route.from}</span>
                  <span className="route-arrow">&rarr;</span>
                  <span>{route.to}</span>
                </div>
                <p className="route-price-label body-sm">Mulai dari</p>
                <div className="route-price-row">
                  <span className="route-price">{route.price}</span>
                  <div className="route-go-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularRoutes;
