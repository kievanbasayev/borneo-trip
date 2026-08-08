function Features() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
            Mengapa Memilih BorneoExpress?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Standar pelayanan premium untuk kenyamanan perjalanan Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-primary-fixed rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Door-to-Door</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Kami menjemput dan mengantar Anda tepat dari depan pintu rumah hingga alamat tujuan tanpa repot transit.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-tertiary-fixed rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>share_location</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Pelacakan Real-time</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Pantau posisi armada kami secara langsung melalui aplikasi untuk ketenangan pikiran selama perjalanan.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant flex flex-col items-start hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-secondary-fixed rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-3">Pembayaran Aman</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Transaksi digital yang terenkripsi dan aman dengan berbagai pilihan metode pembayaran modern.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
