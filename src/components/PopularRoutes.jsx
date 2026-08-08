const routes = [
  {
    from: "Banjarmasin",
    to: "Palangkaraya",
    price: "Rp 150k",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRUaFpdbYLfCPOi0ziD8taw9XbcgL-nvnERnYO2EHL0GX6PBtUUQjm4gGIWfIY_7uuniXP6QNsw8hVYHEwbCt4zIQdWQ2I7t6dEgdGkxsb385-LflV58J0KsyQbG9aMEY5urLGIbNH3wCqcTJj0giwFyhL3BDk5yuKq9UrQUjrrbBZ36U9VWTRN4mDX6jHhTrsrsDBMMjTx-G3xzYEiHP_vUJkm80vnVWouraxswABfTC-5r_fJ01L",
    alt: "Palangkaraya",
  },
  {
    from: "Banjarbaru",
    to: "Sampit",
    price: "Rp 200k",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNykVrnclgS_WBSPe37B4K3nM2FwWVV-Q24tUpTaGCcvY7b9Y9vfFCBarLBFryOyuZXw5chbJffZCv7Epna4b8_bRbGcV2q_j-4IT_xzqTzXL5_nXIkQqVUY_nL0cF-QyvTapDoYe7rDae1Aaqrbqdkpa5M4ZyxyQOzutwXgdyqBvefSC36VWDuyQre3I-j7wnTleziaLYSFbrhjX-ckit84Ftm6HXz1OBP_QWMlJR4_VUIk5cFNu2",
    alt: "Sampit",
  },
  {
    from: "Palangkaraya",
    to: "Banjarmasin",
    price: "Rp 150k",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRUaFpdbYLfCPOi0ziD8taw9XbcgL-nvnERnYO2EHL0GX6PBtUUQjm4gGIWfIY_7uuniXP6QNsw8hVYHEwbCt4zIQdWQ2I7t6dEgdGkxsb385-LflV58J0KsyQbG9aMEY5urLGIbNH3wCqcTJj0giwFyhL3BDk5yuKq9UrQUjrrbBZ36U9VWTRN4mDX6jHhTrsrsDBMMjTx-G3xzYEiHP_vUJkm80vnVWouraxswABfTC-5r_fJ01L",
    alt: "Palangkaraya",
  },
  {
    from: "Sampit",
    to: "Banjarbaru",
    price: "Rp 200k",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNykVrnclgS_WBSPe37B4K3nM2FwWVV-Q24tUpTaGCcvY7b9Y9vfFCBarLBFryOyuZXw5chbJffZCv7Epna4b8_bRbGcV2q_j-4IT_xzqTzXL5_nXIkQqVUY_nL0cF-QyvTapDoYe7rDae1Aaqrbqdkpa5M4ZyxyQOzutwXgdyqBvefSC36VWDuyQre3I-j7wnTleziaLYSFbrhjX-ckit84Ftm6HXz1OBP_QWMlJR4_VUIk5cFNu2",
    alt: "Sampit",
  },
];

function PopularRoutes() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
              Rute Populer
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Destinasi favorit pelanggan setia kami.
            </p>
          </div>
          <button className="hidden md:flex items-center text-primary font-label-bold text-label-bold hover:underline">
            Lihat Semua Rute <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, index) => (
            <div key={index} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group cursor-pointer border border-transparent hover:border-primary transition-all">
              <div className="h-40 w-full relative">
                <img
                  alt={route.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={route.image}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="bg-secondary text-on-secondary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    Tersedia
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-label-bold text-label-bold text-on-surface-variant">{route.from}</h4>
                  <span className="material-symbols-outlined text-outline text-sm mx-2">sync_alt</span>
                  <h4 className="font-label-bold text-label-bold text-on-surface-variant">{route.to}</h4>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-xs text-on-surface-variant mb-1">Mulai dari</p>
                    <p className="font-headline-md text-headline-md text-primary">{route.price}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm">arrow_forward_ios</span>
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
