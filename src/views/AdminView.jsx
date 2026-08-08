import { useState } from 'react';
import { useSchedules, useCities, useRoutePrices, usePricingEvents, useReviews, getTomorrowDate } from '../hooks';

function AdminView() {
  const [activeTab, setActiveTab] = useState('admin-schedules-tab');
  const { schedules, updateSchedule, deleteSchedule, addSchedule } = useSchedules();
  const { cities, addCity, deleteCity } = useCities();
  const { routePrices, updatePrice, getPrice } = useRoutePrices();
  const { events, addEvent, deleteEvent, getAdjustedPrice } = usePricingEvents();
  const { reviews, deleteReview } = useReviews();

  // Schedule form state
  const [editingId, setEditingId] = useState(null);
  const [schedForm, setSchedForm] = useState({
    origin: 'Banjarmasin', destination: 'Palangkaraya', depTime: '08:00', arrTime: '11:30',
    class: 'Executive', price: 150000, plate: 'DA 1234 A', status: 'on-time',
  });

  const resetSchedForm = () => {
    setEditingId(null);
    setSchedForm({ origin: 'Banjarmasin', destination: 'Palangkaraya', depTime: '08:00', arrTime: '11:30', class: 'Executive', price: 150000, plate: 'DA 1234 A', status: 'on-time' });
  };

  const handleSchedSubmit = (e) => {
    e.preventDefault();
    if (schedForm.origin === schedForm.destination) {
      alert('Kota asal dan tujuan tidak boleh sama.');
      return;
    }
    if (editingId) {
      updateSchedule(editingId, { ...schedForm, price: Number(schedForm.price) });
      alert('Jadwal keberangkatan berhasil diperbarui!');
    } else {
      const newId = `S-${Math.floor(10 + Math.random() * 90)}`;
      const timeCategory = (() => {
        const h = parseInt(schedForm.depTime.split(':')[0]) || 8;
        if (h >= 12 && h < 17) return 'siang';
        if (h >= 17 || h < 6) return 'malam';
        return 'pagi';
      })();
      const isLong = (schedForm.origin.includes('Sampit') || schedForm.destination.includes('Sampit')) &&
        (schedForm.origin.includes('Banjarmasin') || schedForm.origin.includes('Banjarbaru') || schedForm.destination.includes('Banjarmasin') || schedForm.destination.includes('Banjarbaru'));
      addSchedule({
        id: newId, ...schedForm, price: Number(schedForm.price),
        duration: isLong ? '6j 30m' : '3j 30m',
        seatsAvailable: schedForm.class.includes('Royal') ? 9 : 12,
        timeCategory,
      });
      alert('Jadwal keberangkatan baru berhasil ditambahkan!');
    }
    resetSchedForm();
  };

  const startEdit = (s) => {
    setEditingId(s.id);
    setSchedForm({
      origin: s.origin, destination: s.destination, depTime: s.depTime, arrTime: s.arrTime,
      class: s.class, price: s.price, plate: s.plate, status: s.status,
    });
  };

  // City form state
  const [newCity, setNewCity] = useState('');

  const handleAddCity = (e) => {
    e.preventDefault();
    if (!newCity.trim()) return;
    addCity(newCity.trim());
    setNewCity('');
    alert(`Kota ${newCity.trim()} berhasil ditambahkan!`);
  };

  // Simulator state
  const [sim, setSim] = useState({ origin: 'Banjarmasin', destination: 'Palangkaraya', class: 'Executive', date: getTomorrowDate() });

  const simBasePrice = getPrice(sim.origin, sim.destination, sim.class);
  const simResult = getAdjustedPrice(simBasePrice, sim.date);

  const handleSimSubmit = (e) => {
    e.preventDefault();
    const newPrice = parseInt(e.target['new-price'].value);
    if (isNaN(newPrice) || newPrice <= 0) {
      alert('Silakan masukkan nilai harga baru yang valid.');
      return;
    }
    if (sim.origin === sim.destination) {
      alert('Kota asal dan tujuan tidak boleh sama.');
      return;
    }
    updatePrice(sim.origin, sim.destination, sim.class, newPrice);
    schedules.forEach(s => {
      if (s.origin === sim.origin && s.destination === sim.destination && s.class === sim.class) {
        updateSchedule(s.id, { price: newPrice });
      }
    });
    alert(`Harga dasar rute ${sim.origin} -> ${sim.destination} (${sim.class}) berhasil diperbarui menjadi Rp ${newPrice.toLocaleString('id-ID')}.`);
  };

  // Event form state
  const [eventForm, setEventForm] = useState({ name: '', start: getTomorrowDate(), end: getTomorrowDate(), type: 'markup-percent', value: 20 });

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (new Date(eventForm.start) > new Date(eventForm.end)) {
      alert('Tanggal mulai tidak boleh setelah tanggal selesai.');
      return;
    }
    addEvent({ id: `E-${Math.floor(10 + Math.random() * 90)}`, ...eventForm, value: Number(eventForm.value) });
    setEventForm({ name: '', start: getTomorrowDate(), end: getTomorrowDate(), type: 'markup-percent', value: 20 });
    alert(`Aturan harga event ${eventForm.name} berhasil disimpan!`);
  };

  const tabs = [
    { id: 'admin-schedules-tab', label: 'Kelola Jadwal Keberangkatan' },
    { id: 'admin-routes-tab', label: 'Kelola Rute & Kota' },
    { id: 'admin-pricing-tab', label: 'Atur Harga & Simulasi' },
    { id: 'admin-events-tab', label: 'Pengaturan Harga Event' },
    { id: 'admin-reviews-tab', label: 'Kelola Ulasan Pelanggan' },
  ];

  return (
    <section className="admin-view-container active">
      <div className="container">
        <div className="admin-header-row">
          <div>
            <h2 className="headline-lg">Dashboard Administrator</h2>
            <p className="body-md">Kelola rute, jadwal operasional shuttle, dan pantau review penumpang.</p>
          </div>
          <button className="btn btn-outline" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }))}>
            Keluar Admin
          </button>
        </div>

        <div className="admin-tabs-bar">
          {tabs.map(tab => (
            <button key={tab.id}
              className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schedules Tab */}
        {activeTab === 'admin-schedules-tab' && (
          <div className="admin-tab-content active">
            <div className="admin-grid">
              <div style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-lg)', padding: '24px',
                boxShadow: 'var(--shadow-level1)'
              }}>
                <h3 className="headline-md" style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--color-primary)' }}>
                  {editingId ? 'Edit Jadwal Keberangkatan' : 'Tambah Jadwal Baru'}
                </h3>
                <form onSubmit={handleSchedSubmit}>
                  <input type="hidden" value={editingId || ''} readOnly />
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Kota Asal</label>
                    <select className="form-control" value={schedForm.origin} onChange={(e) => setSchedForm({ ...schedForm, origin: e.target.value })} required>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Kota Tujuan</label>
                    <select className="form-control" value={schedForm.destination} onChange={(e) => setSchedForm({ ...schedForm, destination: e.target.value })} required>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div className="form-group">
                      <label className="label-md">Jam Berangkat</label>
                      <input type="text" className="form-control" value={schedForm.depTime} onChange={(e) => setSchedForm({ ...schedForm, depTime: e.target.value })} placeholder="08:00" required />
                    </div>
                    <div className="form-group">
                      <label className="label-md">Jam Tiba</label>
                      <input type="text" className="form-control" value={schedForm.arrTime} onChange={(e) => setSchedForm({ ...schedForm, arrTime: e.target.value })} placeholder="11:30" required />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Kelas & Armada</label>
                    <select className="form-control" value={schedForm.class} onChange={(e) => setSchedForm({ ...schedForm, class: e.target.value })} required>
                      <option value="Executive">Executive (12 Kursi)</option>
                      <option value="Royal Executive">Royal Executive (9 Kursi VIP)</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Harga Tiket (Rp)</label>
                    <input type="number" className="form-control" value={schedForm.price} onChange={(e) => setSchedForm({ ...schedForm, price: e.target.value })} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div className="form-group">
                      <label className="label-md">Nomor Plat Mobil</label>
                      <input type="text" className="form-control" value={schedForm.plate} onChange={(e) => setSchedForm({ ...schedForm, plate: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="label-md">Status</label>
                      <select className="form-control" value={schedForm.status} onChange={(e) => setSchedForm({ ...schedForm, status: e.target.value })}>
                        <option value="on-time">On Time</option>
                        <option value="delayed">Delayed</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    {editingId ? 'Update Jadwal' : 'Simpan Jadwal'}
                  </button>
                  {editingId && (
                    <button type="button" className="btn btn-outline" onClick={resetSchedForm} style={{ width: '100%', marginTop: '8px' }}>
                      Batal Edit
                    </button>
                  )}
                </form>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Rute / Jam</th>
                      <th>Kelas</th>
                      <th>Harga</th>
                      <th>Mobil</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map(s => (
                      <tr key={s.id}>
                        <td><strong>{s.origin} &rarr; {s.destination}</strong><br /><span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>Waktu: {s.depTime} - {s.arrTime}</span></td>
                        <td><span className="admin-action-badge">{s.class}</span></td>
                        <td>Rp {s.price.toLocaleString('id-ID')}</td>
                        <td>{s.plate}</td>
                        <td><span className={`status-pill ${s.status === 'on-time' ? 'on-time' : 'delayed'}`} style={{ fontSize: '10px', padding: '2px 8px' }}>{s.status === 'on-time' ? 'On Time' : 'Delayed'}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-outline btn-small" onClick={() => startEdit(s)}>Edit</button>
                            <button className="btn btn-secondary btn-small" style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-on-error)' }} onClick={() => { if (confirm('Yakin hapus?')) { deleteSchedule(s.id); } }}>Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === 'admin-routes-tab' && (
          <div className="admin-tab-content active">
            <div className="admin-grid">
              <div style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-lg)', padding: '24px',
                boxShadow: 'var(--shadow-level1)'
              }}>
                <h3 className="headline-md" style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--color-primary)' }}>Tambah Kota Baru</h3>
                <form onSubmit={handleAddCity}>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label className="label-md">Nama Kota / Wilayah</label>
                    <input type="text" className="form-control" value={newCity} onChange={(e) => setNewCity(e.target.value)} placeholder="Contoh: Amuntai" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Tambah Kota</button>
                </form>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr><th>Nama Kota / Wilayah</th><th style={{ width: '120px', textAlign: 'center' }}>Aksi</th></tr>
                  </thead>
                  <tbody>
                    {cities.map(city => (
                      <tr key={city}>
                        <td><strong>{city}</strong></td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="btn btn-secondary btn-small" style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-on-error)' }} onClick={() => { if (confirm(`Yakin hapus kota ${city}?`)) deleteCity(city); }}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'admin-pricing-tab' && (
          <div className="admin-tab-content active">
            <div className="admin-grid" style={{ gridTemplateColumns: '360px 1fr' }}>
              <div style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-lg)', padding: '24px',
                boxShadow: 'var(--shadow-level1)'
              }}>
                <h3 className="headline-md" style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--color-primary)' }}>Simulasi & Edit Harga Rute</h3>
                <form onSubmit={handleSimSubmit}>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Kota Asal</label>
                    <select className="form-control" value={sim.origin} onChange={(e) => setSim({ ...sim, origin: e.target.value })} required>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Kota Tujuan</label>
                    <select className="form-control" value={sim.destination} onChange={(e) => setSim({ ...sim, destination: e.target.value })} required>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Kelas Armada</label>
                    <select className="form-control" value={sim.class} onChange={(e) => setSim({ ...sim, class: e.target.value })} required>
                      <option value="Executive">Executive</option>
                      <option value="Royal Executive">Royal Executive</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label className="label-md">Tanggal Perjalanan (Simulasi)</label>
                    <input type="date" className="form-control" value={sim.date} onChange={(e) => setSim({ ...sim, date: e.target.value })} required />
                  </div>
                  <div style={{
                    backgroundColor: 'var(--color-surface-container-low)', borderRadius: 'var(--radius-md)',
                    padding: '16px', marginBottom: '20px', border: '1px dashed var(--color-outline)'
                  }}>
                    <h4 style={{ fontSize: '13px', color: 'var(--color-primary)', marginBottom: '12px', fontWeight: 700 }}>Rincian Harga Simulasi</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                      <span>Harga Dasar Rute:</span><strong>Rp {simBasePrice.toLocaleString('id-ID')}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                      <span>{simResult.activeEvent ? `Event: ${simResult.activeEvent.name}` : 'Event Penyesuaian:'}</span>
                      <strong style={{ color: simResult.adjustmentAmount > 0 ? 'var(--color-error)' : simResult.adjustmentAmount < 0 ? 'var(--color-secondary)' : 'var(--color-on-surface-variant)' }}>
                        {simResult.activeEvent && simResult.adjustmentAmount !== 0
                          ? `${simResult.adjustmentAmount > 0 ? '+' : ''}Rp ${Math.abs(simResult.adjustmentAmount).toLocaleString('id-ID')}`
                          : 'Tidak Ada'}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, borderTop: '1px solid var(--color-outline-variant)', paddingTop: '8px' }}>
                      <span>Harga Akhir:</span>
                      <span style={{ color: 'var(--color-secondary)' }}>Rp {simResult.finalPrice.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label className="label-md">Ubah Harga Dasar Rute (Rp)</label>
                    <input type="number" className="form-control" name="new-price" defaultValue={simBasePrice} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Terapkan Harga Dasar Baru</button>
                </form>
              </div>
              <div style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-lg)', padding: '24px',
                boxShadow: 'var(--shadow-level1)', marginBottom: '20px'
              }}>
                <h3 className="headline-md" style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--color-primary)' }}>Matriks Harga Rute</h3>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr><th>Rute</th><th>Kelas</th><th>Harga</th></tr>
                    </thead>
                    <tbody>
                      {routePrices.map((rp, i) => (
                        <tr key={i}>
                          <td><strong>{rp.origin} &rarr; {rp.destination}</strong></td>
                          <td><span className="admin-action-badge" style={{ backgroundColor: 'var(--color-surface-container-high)', color: 'var(--color-on-surface-variant)' }}>{rp.class}</span></td>
                          <td><strong>Rp {rp.price.toLocaleString('id-ID')}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'admin-events-tab' && (
          <div className="admin-tab-content active">
            <div className="admin-grid">
              <div style={{
                backgroundColor: 'var(--color-surface-container-lowest)',
                border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--radius-lg)', padding: '24px',
                boxShadow: 'var(--shadow-level1)'
              }}>
                <h3 className="headline-md" style={{ fontSize: '18px', marginBottom: '20px', color: 'var(--color-primary)' }}>Tambah Event Harga</h3>
                <form onSubmit={handleEventSubmit}>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Nama Event</label>
                    <input type="text" className="form-control" value={eventForm.name} onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })} placeholder="Contoh: Libur Lebaran" required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div className="form-group">
                      <label className="label-md">Tanggal Mulai</label>
                      <input type="date" className="form-control" value={eventForm.start} onChange={(e) => setEventForm({ ...eventForm, start: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label className="label-md">Tanggal Selesai</label>
                      <input type="date" className="form-control" value={eventForm.end} onChange={(e) => setEventForm({ ...eventForm, end: e.target.value })} required />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="label-md">Tipe Penyesuaian</label>
                    <select className="form-control" value={eventForm.type} onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}>
                      <option value="markup-percent">Markup Persentase</option>
                      <option value="markup-nominal">Markup Nominal</option>
                      <option value="discount-percent">Diskon Persentase</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label className="label-md">Nilai</label>
                    <input type="number" className="form-control" value={eventForm.value} onChange={(e) => setEventForm({ ...eventForm, value: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Simpan Event</button>
                </form>
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr><th>Nama Event</th><th>Periode</th><th>Tipe</th><th>Aksi</th></tr>
                  </thead>
                  <tbody>
                    {events.map(ev => (
                      <tr key={ev.id}>
                        <td><strong>{ev.name}</strong></td>
                        <td><span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                          {new Date(ev.start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} -
                          {new Date(ev.end).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span></td>
                        <td>
                          <span className="admin-action-badge" style={{
                            backgroundColor: ev.type === 'discount-percent' ? 'var(--color-secondary-container)' : 'var(--color-primary-fixed)',
                            color: ev.type === 'discount-percent' ? 'var(--color-on-secondary-container)' : 'var(--color-primary)',
                            fontWeight: 700
                          }}>
                            {ev.type === 'markup-percent' ? `Markup +${ev.value}%` : ev.type === 'markup-nominal' ? `Markup +Rp ${ev.value.toLocaleString('id-ID')}` : `Diskon -${ev.value}%`}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="btn btn-secondary btn-small" style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-on-error)' }} onClick={() => { if (confirm('Yakin hapus event ini?')) deleteEvent(ev.id); }}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'admin-reviews-tab' && (
          <div className="admin-tab-content active">
            <div style={{
              backgroundColor: 'var(--color-surface-container-lowest)',
              border: '1px solid var(--color-outline-variant)',
              borderRadius: 'var(--radius-lg)', padding: '24px',
              boxShadow: 'var(--shadow-level1)'
            }}>
              <h3 className="headline-md" style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--color-primary)' }}>Review Ulasan Pelanggan</h3>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Nama Pelanggan</th>
                      <th>Tanggal</th>
                      <th>Rating</th>
                      <th>Ulasan / Feedback</th>
                      <th style={{ width: '120px' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((r, i) => (
                      <tr key={i}>
                        <td><strong>{r.author}</strong></td>
                        <td>{r.date}</td>
                        <td><span style={{ color: '#fbbf24', fontWeight: 700 }}>{r.rating} ★</span></td>
                        <td><p style={{ maxWidth: '350px', fontStyle: 'italic' }}>&ldquo;{r.text}&rdquo;</p></td>
                        <td>
                          <button className="btn btn-secondary btn-small" style={{ backgroundColor: 'var(--color-error)', color: 'var(--color-on-error)' }} onClick={() => { if (confirm('Yakin hapus ulasan ini?')) deleteReview(i); }}>Hapus</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminView;
