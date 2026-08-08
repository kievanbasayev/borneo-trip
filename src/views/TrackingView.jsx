import { useState, useEffect, useRef, useCallback } from 'react';

const initialShuttles = [
  {
    id: 'BT-302', origin: 'Banjarmasin', destination: 'Palangkaraya', driver: 'Ahmad Subardjo',
    plate: 'DA 7712 BA', speed: 65, status: 'On Time', eta: '45 Menit', currentPos: 0.65,
    stops: ['Banjarmasin', 'Banjarbaru', 'Palangkaraya'],
    routeCoords: [{ cx: 660, cy: 450 }, { cx: 560, cy: 420 }, { cx: 320, cy: 260 }],
  },
  {
    id: 'BT-104', origin: 'Palangkaraya', destination: 'Sampit', driver: 'Dedi Kurniawan',
    plate: 'KH 8844 A', speed: 55, status: 'Delayed', eta: '1 Jam 15 Menit', currentPos: 0.35,
    stops: ['Palangkaraya', 'Sampit'],
    routeCoords: [{ cx: 320, cy: 260 }, { cx: 120, cy: 200 }],
  },
  {
    id: 'BT-209', origin: 'Sampit', destination: 'Banjarmasin', driver: 'Budi Santoso',
    plate: 'KH 9012 AA', speed: 70, status: 'On Time', eta: '2 Jam 40 Menit', currentPos: 0.15,
    stops: ['Sampit', 'Palangkaraya', 'Banjarbaru', 'Banjarmasin'],
    routeCoords: [{ cx: 120, cy: 200 }, { cx: 320, cy: 260 }, { cx: 560, cy: 420 }, { cx: 660, cy: 450 }],
  },
];

function TrackingView() {
  const [shuttles, setShuttles] = useState(initialShuttles);
  const [activeShuttle, setActiveShuttle] = useState('BT-302');
  const [tooltip, setTooltip] = useState({ text: '', x: 0, y: 0, visible: false });
  const intervalRef = useRef(null);

  const animate = useCallback(() => {
    setShuttles(prev => prev.map(s => ({
      ...s,
      currentPos: s.currentPos + 0.003 >= 1.0 ? 0.0 : s.currentPos + 0.003,
    })));
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(animate, 1000);
    return () => clearInterval(intervalRef.current);
  }, [animate]);

  const active = shuttles.find(s => s.id === activeShuttle) || shuttles[0];
  const coords = active.routeCoords;
  const progress = active.currentPos;
  const numSeg = coords.length - 1;
  const exactSeg = progress * numSeg;
  const segIdx = Math.min(Math.floor(exactSeg), numSeg - 1);
  const segProg = exactSeg - segIdx;
  const start = coords[segIdx];
  const end = coords[segIdx + 1];
  const cx = start.cx + (end.cx - start.cx) * segProg;
  const cy = start.cy + (end.cy - start.cy) * segProg;

  let trailD = `M ${coords[0].cx} ${coords[0].cy}`;
  for (let i = 1; i <= segIdx; i++) {
    trailD += ` L ${coords[i].cx} ${coords[i].cy}`;
  }
  trailD += ` L ${cx} ${cy}`;

  const handleCityHover = (e, name) => {
    const rect = e.currentTarget.closest('.tracking-map-wrapper')?.getBoundingClientRect();
    if (rect) {
      setTooltip({ text: `Kota Transit: ${name}`, x: e.clientX - rect.left + 15, y: e.clientY - rect.top + 10, visible: true });
    }
  };

  const handleCityLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <section className="section container">
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <h2 className="headline-lg">Pelacakan Real-time Armada</h2>
        <p className="body-md">Pantau posisi keberangkatan armada shuttle secara langsung untuk kenyamanan Anda.</p>
      </div>

      <div className="tracking-layout">
        <div className="tracking-sidebar">
          {shuttles.map(s => (
            <div key={s.id}
              className={`tracking-card ${s.id === activeShuttle ? 'active' : ''}`}
              onClick={() => setActiveShuttle(s.id)}>
              <div className="tracking-card-header">
                <span className="shuttle-id">{s.id} ({s.plate})</span>
                <span className={`status-pill ${s.status === 'On Time' ? 'on-time' : 'delayed'}`} style={{ padding: '2px 8px', fontSize: '10px' }}>{s.status}</span>
              </div>
              <div className="tracking-card-body">
                <div>Rute: <strong>{s.origin} &rarr; {s.destination}</strong></div>
                <div>Driver: <strong>{s.driver}</strong></div>
                <div>Kecepatan: <strong>{s.speed} km/j</strong></div>
                <div>Estimasi Sampai (ETA): <strong style={{ color: 'var(--color-primary)' }}>{s.eta}</strong></div>
                <div style={{
                  backgroundColor: 'var(--color-surface-container-high)', height: '6px',
                  borderRadius: 'var(--radius-full)', marginTop: '8px', overflow: 'hidden', position: 'relative'
                }}>
                  <div style={{ width: `${Math.round(s.currentPos * 100)}%`, backgroundColor: 'var(--color-primary)', height: '100%', transition: 'width 0.5s ease-out' }}></div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '10px', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                  Perjalanan {Math.round(s.currentPos * 100)}% selesai
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="tracking-map-wrapper">
          <div id="map-tooltip-box" className="map-tooltip" style={{
            left: tooltip.x, top: tooltip.y, opacity: tooltip.visible ? 1 : 0
          }}>{tooltip.text}</div>
          <svg viewBox="0 0 800 600" className="route-map-svg">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00355f" />
                <stop offset="100%" stopColor="#1b6d24" />
              </linearGradient>
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.15" />
              </filter>
            </defs>
            <rect width="100%" height="100%" fill="#f4f7f6" />
            <path d="M 0 100 Q 200 80 400 150 T 800 100 L 800 600 L 0 600 Z" fill="#e8f0e8" opacity="0.6" />
            <path d="M 0 450 Q 300 480 500 400 T 800 500 L 800 600 L 0 600 Z" fill="#dceddc" opacity="0.4" />
            <path d="M 120 200 L 320 260 L 560 420 L 660 450" className="map-highway" />
            <path d="M 120 200 L 320 260 L 560 420 L 660 450" className="map-route-active" />
            <path d={trailD} className="map-route-shuttle-path" />
            <g>
              <circle cx="120" cy="200" className="map-city-node" data-name="Sampit"
                onMouseMove={(e) => handleCityHover(e, 'Sampit')} onMouseLeave={handleCityLeave} />
              <text x="120" y="175" className="map-city-label">Sampit</text>
            </g>
            <g>
              <circle cx="320" cy="260" className="map-city-node" data-name="Palangkaraya"
                onMouseMove={(e) => handleCityHover(e, 'Palangkaraya')} onMouseLeave={handleCityLeave} />
              <text x="320" y="235" className="map-city-label">Palangkaraya</text>
            </g>
            <g>
              <circle cx="560" cy="420" className="map-city-node" data-name="Banjarbaru"
                onMouseMove={(e) => handleCityHover(e, 'Banjarbaru')} onMouseLeave={handleCityLeave} />
              <text x="560" y="395" className="map-city-label">Banjarbaru</text>
            </g>
            <g>
              <circle cx="660" cy="450" className="map-city-node" data-name="Banjarmasin"
                onMouseMove={(e) => handleCityHover(e, 'Banjarmasin')} onMouseLeave={handleCityLeave} />
              <text x="660" y="480" className="map-city-label">Banjarmasin</text>
            </g>
            <g transform={`translate(${cx}, ${cy})`}>
              <circle cx="0" cy="0" className="shuttle-pulse" />
              <circle cx="0" cy="0" className="shuttle-dot" />
              <polygon points="-3,-4 5,0 -3,4" fill="#ffffff" transform="rotate(20)" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default TrackingView;
