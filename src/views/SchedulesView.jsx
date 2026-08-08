import { useState, useEffect } from 'react';
import { useSchedules, useRoutePrices, usePricingEvents } from '../hooks';

function SchedulesView({ searchParams, onBackHome, onOpenBooking }) {
  const { filterSchedules } = useSchedules();
  const { getPrice } = useRoutePrices();
  const { getAdjustedPrice: getAdjPrice } = usePricingEvents();
  const [timeFilter, setTimeFilter] = useState([]);
  const [classFilter, setClassFilter] = useState([]);
  const [sortBy, setSortBy] = useState('low-high');

  const origin = searchParams?.origin || '';
  const destination = searchParams?.destination || '';
  const date = searchParams?.date || '';

  useEffect(() => {
    if (!origin && !destination) {
      setTimeFilter([]);
      setClassFilter([]);
      setSortBy('low-high');
    }
  }, [origin, destination]);

  let filtered = filterSchedules(origin, destination, timeFilter, classFilter);

  if (filtered.length === 0 && origin && destination) {
    const baseExec = getPrice(origin, destination, 'Executive');
    const baseRoyal = getPrice(origin, destination, 'Royal Executive');
    const isLong = (origin.includes('Sampit') || destination.includes('Sampit')) &&
      (origin.includes('Banjarmasin') || origin.includes('Banjarbaru') || destination.includes('Banjarmasin') || destination.includes('Banjarbaru'));
    filtered = [
      {
        id: `SD-${origin.substring(0, 2).toUpperCase()}-${destination.substring(0, 2).toUpperCase()}-01`,
        origin, destination, depTime: '08:30', arrTime: isLong ? '15:00' : '12:00',
        duration: isLong ? '6j 30m' : '3j 30m', class: 'Executive', price: baseExec,
        status: 'on-time', seatsAvailable: 12, plate: 'DA 8830 BA', timeCategory: 'pagi',
      },
      {
        id: `SD-${origin.substring(0, 2).toUpperCase()}-${destination.substring(0, 2).toUpperCase()}-02`,
        origin, destination, depTime: '16:00', arrTime: isLong ? '22:30' : '19:30',
        duration: isLong ? '6j 30m' : '3j 30m', class: 'Royal Executive', price: baseRoyal,
        status: 'on-time', seatsAvailable: 9, plate: 'DA 1600 RA', timeCategory: 'siang',
      },
    ];
  }

  if (sortBy === 'low-high') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const titleText = origin && destination
    ? `${origin} ke ${destination} (${new Date(date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })})`
    : 'Jadwal Keberangkatan';

  const handleTimeChange = (e) => {
    const val = e.target.value;
    setTimeFilter(prev => e.target.checked ? [...prev, val] : prev.filter(v => v !== val));
  };

  const handleClassChange = (e) => {
    const val = e.target.value;
    setClassFilter(prev => e.target.checked ? [...prev, val] : prev.filter(v => v !== val));
  };

  return (
    <section className="results-container active">
      <div className="container">
        <div className="schedules-header-row">
          <div>
            <button className="back-to-home" onClick={onBackHome}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Kembali ke Pencarian
            </button>
            <h2 className="headline-lg" style={{ marginTop: '12px' }}>{titleText}</h2>
          </div>
          <div className="body-md" style={{ fontWeight: 600 }}>Menampilkan {filtered.length} Jadwal</div>
        </div>

        <div className="admin-contact-notice">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="body-sm" style={{ color: 'var(--color-on-surface)', margin: 0, lineHeight: 1.5 }}>
              <strong>Butuh jadwal keberangkatan khusus?</strong> Anda bisa memesan charter pribadi atau menanyakan jadwal tambahan langsung kepada Admin kami.
            </p>
          </div>
          <a href="https://wa.me/6281234567890" target="_blank" className="btn btn-primary btn-icon btn-small"
            style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-secondary)', color: '#ffffff', whiteSpace: 'nowrap' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Hubungi Admin (WA)
          </a>
        </div>

        <div className="schedules-grid">
          <aside className="filter-panel">
            <div className="filter-section">
              <h4 className="filter-title">Waktu Keberangkatan</h4>
              <div className="checkbox-group">
                <label className="checkbox-label"><input type="checkbox" className="time-filter" value="pagi" checked={timeFilter.includes('pagi')} onChange={handleTimeChange} /> Pagi (06:00 - 12:00)</label>
                <label className="checkbox-label"><input type="checkbox" className="time-filter" value="siang" checked={timeFilter.includes('siang')} onChange={handleTimeChange} /> Siang (12:00 - 17:00)</label>
                <label className="checkbox-label"><input type="checkbox" className="time-filter" value="malam" checked={timeFilter.includes('malam')} onChange={handleTimeChange} /> Malam (17:00 - 23:00)</label>
              </div>
            </div>
            <div className="filter-section">
              <h4 className="filter-title">Kelas Shuttle</h4>
              <div className="checkbox-group">
                <label className="checkbox-label"><input type="checkbox" className="class-filter" value="Executive" checked={classFilter.includes('Executive')} onChange={handleClassChange} /> Executive (12 Kursi)</label>
                <label className="checkbox-label"><input type="checkbox" className="class-filter" value="Royal Executive" checked={classFilter.includes('Royal Executive')} onChange={handleClassChange} /> Royal Premier (9 Kursi VIP)</label>
              </div>
            </div>
            <div className="filter-section">
              <h4 className="filter-title">Urutkan Harga</h4>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="radio" name="price-sort" value="low-high" checked={sortBy === 'low-high'} onChange={(e) => setSortBy(e.target.value)} /> Terendah &rarr; Tertinggi
                </label>
                <label className="checkbox-label">
                  <input type="radio" name="price-sort" value="high-low" checked={sortBy === 'high-low'} onChange={(e) => setSortBy(e.target.value)} /> Tertinggi &rarr; Terendah
                </label>
              </div>
            </div>
          </aside>

          <div className="schedules-list">
            {filtered.length === 0 ? (
              <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', borderRadius: 'var(--radius-lg)', padding: '40px', textAlign: 'center', boxShadow: 'var(--shadow-level1)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-outline)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
                <h3 className="headline-md" style={{ marginBottom: '8px' }}>Jadwal Tidak Ditemukan</h3>
                <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
                  Maaf, tidak ada jadwal shuttle yang sesuai dengan kriteria filter Anda.
                </p>
                <a href="https://wa.me/6281234567890" target="_blank" className="btn btn-primary btn-icon" style={{ backgroundColor: 'var(--color-secondary)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Hubungi Admin via WhatsApp
                </a>
              </div>
            ) : (
              filtered.map(schedule => {
                const { finalPrice, activeEvent } = getAdjPrice(schedule.price, date);
                const isVIP = schedule.class === 'Royal Executive';
                const statusText = schedule.status === 'on-time' ? 'On Time' : 'Delayed';
                let eventBadge = '';
                if (activeEvent) {
                  const sign = activeEvent.type.startsWith('markup') ? '+' : '-';
                  const val = activeEvent.type === 'markup-percent' ? `${activeEvent.value}%` : `Rp ${activeEvent.value.toLocaleString('id-ID')}`;
                  eventBadge = (
                    <span className="event-price-badge" style={{ backgroundColor: activeEvent.type.startsWith('markup') ? 'var(--color-error)' : 'var(--color-secondary)', color: '#ffffff' }}>
                      {activeEvent.name} ({sign}{val})
                    </span>
                  );
                }
                return (
                  <div key={schedule.id} className="schedule-card" style={{ borderLeftColor: isVIP ? 'var(--color-secondary)' : 'var(--color-primary)' }}>
                    <div className="schedule-card-body">
                      <div className="schedule-time-flow">
                        <div className="time-box">
                          <h3>{schedule.depTime}</h3>
                          <p>{schedule.origin}</p>
                        </div>
                        <div className="trip-duration-line">
                          <span>{schedule.duration}</span>
                          <div className="duration-bar"></div>
                          <span className="body-sm" style={{ fontSize: '11px' }}>Langsung</span>
                        </div>
                        <div className="time-box">
                          <h3>{schedule.arrTime}</h3>
                          <p>{schedule.destination}</p>
                        </div>
                      </div>
                      <div className="schedule-middle">
                        <span className={`status-pill ${schedule.status}`}>{statusText}</span>
                        <div className="vehicle-info">
                          <strong>{schedule.class}</strong>
                          <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>Toyota HiAce • {schedule.plate}</div>
                        </div>
                      </div>
                      <div className="schedule-right">
                        <span className="price-bold">Rp {finalPrice.toLocaleString('id-ID')}</span>
                        {eventBadge}
                        <button className="btn btn-primary btn-pesan" style={{ height: '40px', minHeight: '40px', marginTop: '8px' }}
                          onClick={() => onOpenBooking?.(schedule)}>
                          Pesan Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SchedulesView;
