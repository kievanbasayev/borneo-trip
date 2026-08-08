import { useEffect } from 'react';
import { getTomorrowDate } from '../hooks';

function Hero({ onSearch }) {
  useEffect(() => {
    const dateInput = document.getElementById('search-date');
    if (dateInput && !dateInput.value) {
      dateInput.value = getTomorrowDate();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const origin = form.origin.value;
    const destination = form.destination.value;

    if (origin === destination) {
      alert('Kota asal dan tujuan tidak boleh sama.');
      return;
    }

    onSearch({
      origin,
      destination,
      date: form.date.value,
      passengers: parseInt(form.passengers.value),
    });
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="headline-xl">Perjalanan Lintas Kota Lebih Mudah</h1>
          <p className="body-lg">Layanan shuttle premium menghubungkan Kalimantan Selatan dan Kalimantan Tengah dengan kenyamanan ekstra.</p>
        </div>
      </section>
      <div className="search-widget-container">
        <form className="search-widget" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Asal
            </label>
            <select className="form-control" name="origin" required defaultValue="">
              <option value="" disabled>Pilih Kota Asal</option>
              <option value="Banjarmasin">Banjarmasin (Kalsel)</option>
              <option value="Banjarbaru">Banjarbaru (Kalsel)</option>
              <option value="Palangkaraya">Palangkaraya (Kalteng)</option>
              <option value="Sampit">Sampit (Kalteng)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Tujuan
            </label>
            <select className="form-control" name="destination" required defaultValue="">
              <option value="" disabled>Pilih Kota Tujuan</option>
              <option value="Banjarmasin">Banjarmasin (Kalsel)</option>
              <option value="Banjarbaru">Banjarbaru (Kalsel)</option>
              <option value="Palangkaraya">Palangkaraya (Kalteng)</option>
              <option value="Sampit">Sampit (Kalteng)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              Tanggal
            </label>
            <input type="date" className="form-control" name="date" id="search-date" required />
          </div>
          <div className="form-group">
            <label className="label-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Penumpang
            </label>
            <select className="form-control" name="passengers">
              <option value="1">1 Orang</option>
              <option value="2">2 Orang</option>
              <option value="3">3 Orang</option>
              <option value="4">4 Orang</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Cari
          </button>
        </form>
      </div>
    </>
  );
}

export default Hero;
