function Footer() {
  return (
    <footer className="bg-surface-container-highest dark:bg-inverse-surface w-full mt-auto border-t border-outline-variant dark:border-outline">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-container-max mx-auto py-12 px-margin-mobile md:px-margin-desktop">
        <div className="col-span-1 md:col-span-1 mb-8 md:mb-0">
          <div className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-inverse-on-surface mb-4">
            BorneoExpress
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant mb-4">
            © 2024 BorneoExpress. Inter-city reliability across Kalimantan.
          </p>
        </div>
        <div className="col-span-1 flex flex-col space-y-3">
          <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:underline decoration-primary transition-all cursor-pointer" href="#">
            About Us
          </a>
          <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:underline decoration-primary transition-all cursor-pointer" href="#">
            Terms of Service
          </a>
          <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:underline decoration-primary transition-all cursor-pointer" href="#">
            Privacy Policy
          </a>
        </div>
        <div className="col-span-1 flex flex-col space-y-3">
          <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:underline decoration-primary transition-all cursor-pointer" href="#">
            Routes &amp; Pricing
          </a>
          <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:underline decoration-primary transition-all cursor-pointer" href="#">
            Help Center
          </a>
          <a className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant hover:underline decoration-primary transition-all cursor-pointer" href="#">
            Contact Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
