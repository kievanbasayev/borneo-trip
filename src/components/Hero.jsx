function Hero() {
  return (
    <section className="relative bg-primary-container py-20 px-margin-mobile md:px-margin-desktop overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApz-d9jwrrRgow26cVhRP3fcZmNxSYnGDgxHBX26fTHuBcmGAKL1U3NAg-Eva47UYh0ueAQcYeIEGT3QrLLnF97sL6CqD_FZKYmh6ZI7LL6W7ChqmdqeBpYuUsl2zkeZGxi2Dyubgv-eCEYNYrC7zrvnDn9kGiJ6VBL0bpVht6Qt9dsXA3tq73whRJP67c70_HHJexgAcsm-2PRZAsGM340oyXD9e-R2iONGl52O2ylQdtBpzAj2IN')",
        }}
      ></div>
      <div className="max-w-container-max mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-primary mb-4">
            Perjalanan Lintas Kota Lebih Mudah
          </h1>
          <p className="font-body-lg text-body-lg text-primary-fixed max-w-2xl mx-auto">
            Layanan shuttle premium menghubungkan Kalimantan Selatan dan Kalimantan Tengah dengan kenyamanan ekstra.
          </p>
        </div>
        <div className="w-full max-w-4xl bg-surface-container-lowest rounded-xl shadow-lg p-6 md:p-8 backdrop-blur-sm bg-opacity-95">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="font-label-bold text-label-bold text-on-surface-variant flex items-center">
                <span className="material-symbols-outlined mr-2 text-primary text-sm">location_on</span>
                Asal
              </label>
              <select className="w-full border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:ring-primary focus:border-primary bg-surface-container-low transition-colors">
                <option>Banjarmasin</option>
                <option>Banjarbaru</option>
                <option>Palangkaraya</option>
                <option>Sampit</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-label-bold text-label-bold text-on-surface-variant flex items-center">
                <span className="material-symbols-outlined mr-2 text-primary text-sm">flag</span>
                Tujuan
              </label>
              <select className="w-full border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:ring-primary focus:border-primary bg-surface-container-low transition-colors">
                <option>Palangkaraya</option>
                <option>Sampit</option>
                <option>Banjarmasin</option>
                <option>Banjarbaru</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-label-bold text-label-bold text-on-surface-variant flex items-center">
                <span className="material-symbols-outlined mr-2 text-primary text-sm">calendar_today</span>
                Tanggal
              </label>
              <input className="w-full border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:ring-primary focus:border-primary bg-surface-container-low transition-colors" type="date" />
            </div>
            <div className="flex flex-col space-y-2 justify-end">
              <label className="font-label-bold text-label-bold text-on-surface-variant flex items-center lg:hidden">
                <span className="material-symbols-outlined mr-2 text-primary text-sm">person</span>
                Penumpang
              </label>
              <div className="flex space-x-4">
                <select className="w-1/3 lg:w-full border-outline-variant rounded-lg p-3 font-body-md text-on-surface focus:ring-primary focus:border-primary bg-surface-container-low transition-colors">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
                <button className="w-2/3 lg:w-full bg-primary text-on-primary rounded-lg font-label-bold text-label-bold py-3 px-4 hover:bg-primary-container transition-colors shadow-md flex justify-center items-center" type="button">
                  <span className="material-symbols-outlined mr-2 text-sm">search</span>
                  Cari
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Hero;
