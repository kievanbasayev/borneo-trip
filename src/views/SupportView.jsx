import { useState, useEffect, useRef } from 'react';

function SupportView() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Halo! Selamat datang di BorneoJourney Customer Service. Ada yang bisa saya bantu?' },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatOpen]);

  const generateResponse = (query) => {
    const text = query.toLowerCase();
    if (text.includes('jadwal') || text.includes('jam') || text.includes('berangkat')) {
      return 'Jadwal BorneoJourney beroperasi dari pagi hari pukul 06:00 hingga malam hari pukul 20:00 WITA. Anda dapat melihat jadwal lengkap terupdate pada halaman utama "Schedules" di bagian pencarian tiket.';
    }
    if (text.includes('harga') || text.includes('biaya') || text.includes('tarif') || text.includes('ongkos')) {
      return 'Tarif rute Banjarmasin - Palangkaraya adalah Rp 150.000 untuk kelas Executive dan Rp 220.000 untuk kelas Royal Premier. Untuk rute Banjarbaru - Sampit seharga Rp 200.000 (Executive) dan Rp 280.000 (Royal Premier).';
    }
    if (text.includes('jemput') || text.includes('antar') || text.includes('door')) {
      return 'Layanan kami bersifat door-to-door (jemput antar alamat). Cukup isi alamat lengkap penjemputan dan pengantaran Anda saat memesan tiket di aplikasi, driver kami akan langsung menjemput depan rumah Anda.';
    }
    if (text.includes('batal') || text.includes('cancel') || text.includes('reschedule') || text.includes('ubah')) {
      return 'Pembatalan atau perubahan jadwal tiket dapat diajukan secara gratis minimal 6 jam sebelum waktu keberangkatan dengan menghubungi hotline WhatsApp kami di nomor +62 811-5555-900.';
    }
    if (text.includes('kursi') || text.includes('tempat duduk')) {
      return 'Nomor kursi perjalanan Anda akan ditentukan secara optimal oleh administrator atau driver kami pada saat penjemputan alamat untuk memastikan kenyamanan semua penumpang.';
    }
    if (text.includes('gopay') || text.includes('ovo') || text.includes('bayar') || text.includes('transfer')) {
      return 'Kami mendukung pembayaran modern melalui e-Wallet (GoPay, OVO, ShopeePay) serta transfer bank langsung (BCA, Mandiri, BNI) untuk memudahkan verifikasi otomatis.';
    }
    return 'Terima kasih atas pesan Anda. Silakan hubungi hotline WhatsApp Customer Service kami di nomor +62 811-5555-900 untuk berbicara langsung dengan staf BorneoJourney terkait detail kendala khusus Anda.';
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: generateResponse(userMsg) }]);
    }, 1000);
  };

  return (
    <>
      <section className="section container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
          <h2 className="headline-lg">Pusat Bantuan & Layanan Pelanggan</h2>
          <p className="body-md">Kami siap melayani kebutuhan informasi dan penyelesaian kendala perjalanan Anda 24/7.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            boxShadow: 'var(--shadow-level1)'
          }}>
            <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '24px' }}>Pertanyaan Sering Diajukan (FAQ)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--color-primary-container)' }}>
                  Apakah ada layanan penjemputan alamat (door-to-door)?
                </h4>
                <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Ya, tarif tiket kami sudah mencakup penjemputan dan pengantaran alamat di area jangkauan kota Banjarmasin, Banjarbaru, Palangkaraya, dan Sampit.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-surface-container-high)', paddingTop: '16px' }}>
                <h4 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--color-primary-container)' }}>
                  Berapa jam estimasi perjalanan Kalsel - Kalteng?
                </h4>
                <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Perjalanan Banjarmasin ke Palangkaraya berkisar antara 3 - 4 jam, sedangkan rute Banjarbaru ke Sampit membutuhkan waktu sekitar 6 - 7 jam tergantung kondisi jalan.
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--color-surface-container-high)', paddingTop: '16px' }}>
                <h4 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--color-primary-container)' }}>
                  Bagaimana kebijakan pembatalan / reschedule tiket?
                </h4>
                <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                  Pembatalan atau perubahan jadwal tiket dapat diajukan paling lambat 6 jam sebelum keberangkatan dengan menghubungi CS BorneoJourney.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
            boxShadow: 'var(--shadow-level1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 className="headline-md" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>Hubungi Kami</h3>
              <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '24px' }}>
                Gunakan kontak di bawah ini atau mulailah percakapan langsung dengan asisten virtual kami melalui tombol chat di pojok kanan bawah.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-on-secondary-container)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="label-md" style={{ display: 'block', color: 'var(--color-on-surface-variant)' }}>Hotline WhatsApp</span>
                    <strong style={{ fontSize: '15px', color: 'var(--color-primary)' }}>+62 811-5555-900</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-primary-fixed)', color: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="label-md" style={{ display: 'block', color: 'var(--color-on-surface-variant)' }}>Email Pelayanan</span>
                    <strong style={{ fontSize: '15px', color: 'var(--color-primary)' }}>support@borneojourney.co.id</strong>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '32px', backgroundColor: 'var(--color-surface-container-low)', padding: '16px', borderRadius: 'var(--radius-default)' }}>
              <p className="body-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
                <strong>Butuh Bantuan Cepat?</strong> Silakan klik ikon chat obrolan berwarna biru di kanan bawah layar untuk mengobrol secara interaktif dengan Customer Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="chat-widget-floating">
        <div className={`chat-box-container ${chatOpen ? 'active' : ''}`}>
          <div className="chat-header">
            <div className="chat-agent-avatar">CS</div>
            <div className="chat-agent-info">
              <h4>Customer Service BorneoJourney</h4>
              <span>Online - Biasanya membalas dalam 1 menit</span>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from === 'user' ? 'outgoing' : 'incoming'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="chat-input-area" onSubmit={handleSend}>
            <input
              type="text"
              className="chat-input"
              placeholder="Tulis pesan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" x2="11" y1="2" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
        <button className="chat-bubble-toggle" onClick={() => setChatOpen(!chatOpen)}>
          {chatOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}

export default SupportView;
