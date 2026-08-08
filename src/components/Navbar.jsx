function Navbar() {
  return (
    <nav className="bg-surface-container-lowest dark:bg-surface-container-low w-full top-0 sticky shadow-sm z-50">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20">
        <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
          BorneoExpress
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a className="text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim pb-1 font-bold font-body-md text-body-md" href="#">Schedules</a>
          <a className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-body-md text-body-md cursor-pointer active:scale-95 duration-200" href="#">My Bookings</a>
          <a className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-body-md text-body-md cursor-pointer active:scale-95 duration-200" href="#">Fleet Tracking</a>
          <a className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-body-md text-body-md cursor-pointer active:scale-95 duration-200" href="#">Reviews</a>
          <a className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors font-body-md text-body-md cursor-pointer active:scale-95 duration-200" href="#">Support</a>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-bold text-label-bold hover:bg-primary-container transition-colors cursor-pointer active:scale-95 duration-200">
            Sign In
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-variant overflow-hidden cursor-pointer">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIQz3DWgvcEbCd4_JQTfpZoHDqh700GyLSQFiQMcj_E0UTfMt2lWkOQUjRf3UaSPWTaUKUsxTfOZQoyfeSrovlWWWp2RdqYjjUlv3TnzQx5Ti-wE4IS-MaVmUjZg-bL00uds7d1bTPoT_cK6KauMlSsfzYrmjrGSWzmmuRBl9EmdINqTftWMj_cNsBU7YHeF5_WFeuY9yNwDyPi9In2v8SieeyFUWABQSwUEZ9kxeeD_ewA0WPnVWA"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
