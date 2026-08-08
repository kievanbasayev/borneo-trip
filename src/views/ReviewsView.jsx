import { useReviews } from '../hooks';

function ReviewsView() {
  const { reviews, addReview, _deleteReview } = useReviews();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const author = form['review-author'].value.trim();
    const rating = parseInt(form['review-rating'].value);
    const text = form['review-text'].value.trim();

    if (!author || !text) {
      alert('Mohon lengkapi semua field.');
      return;
    }

    addReview({ author, rating, text });
    form.reset();
    alert('Ulasan Anda berhasil dikirim. Terima kasih atas masukan berharga Anda!');
  };

  const renderStars = (rating, size = 14) => (
    <span style={{ color: '#fbbf24', display: 'inline-flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= rating ? '#fbbf24' : 'none'}
          stroke={i <= rating ? '#fbbf24' : 'var(--color-outline-variant)'}
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );

  return (
    <section className="section container">
      <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <h2 className="headline-lg">Ulasan & Rating Penumpang</h2>
        <p className="body-md">Feedback dari penumpang yang telah menikmati perjalanan premium bersama BorneoJourney.</p>
      </div>

      <div className="reviews-summary-card">
        <div className="rating-huge">
          <div className="rating-number">4.8</div>
          <div style={{ color: '#fbbf24', marginTop: '8px' }}>{renderStars(5, 20)}</div>
          <div className="body-sm" style={{ color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Dari 1,248 Penumpang</div>
        </div>
        <div className="rating-bars">
          {[85, 10, 3, 1, 1].map((pct, i) => (
            <div key={i} className="rating-bar-row">
              <span>{5 - i} <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></span>
              <div className="rating-bar-bg"><div className="rating-bar-fill" style={{ width: `${pct}%` }}></div></div>
              <span>{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-layout">
        <div className="reviews-list">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="review-card-header">
                <span className="review-author">{review.author}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="review-stars">{renderStars(review.rating)}</div>
              <p className="review-text body-sm">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="review-form-card">
          <h3>Tulis Ulasan Perjalanan</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="label-md">Nama Lengkap</label>
              <input type="text" className="form-control" name="review-author" placeholder="Masukkan nama Anda" required />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="label-md">Rating Perjalanan</label>
              <select className="form-control" name="review-rating" required>
                <option value="5">Bintang 5 - Sangat Memuaskan</option>
                <option value="4">Bintang 4 - Memuaskan</option>
                <option value="3">Bintang 3 - Cukup</option>
                <option value="2">Bintang 2 - Kurang Memuaskan</option>
                <option value="1">Bintang 1 - Buruk</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="label-md">Tulis Tanggapan Anda</label>
              <textarea className="form-control" name="review-text" rows="4" placeholder="Ceritakan kenyamanan kendaraan, keramahan driver, ketepatan waktu..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Kirim Ulasan</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReviewsView;
