import { useAuth } from '../hooks';

function Navbar({ onNavigate, currentView }) {
  const { currentUser, logout, isAdmin } = useAuth();

  const navItems = [
    { label: 'Schedules', view: 'home' },
    { label: 'My Bookings', view: 'bookings' },
    { label: 'Fleet Tracking', view: 'tracking' },
    { label: 'Reviews', view: 'reviews' },
    { label: 'Support', view: 'support' },
  ];

  return (
    <>
      <div className={`admin-mode-banner ${isAdmin ? 'active' : ''}`}>
        Mode Administrator - Borneo Journey
      </div>
      <header className="header">
        <div className="container header-container">
          <div
            className="logo"
            onClick={() => onNavigate('home')}
            style={{ cursor: 'pointer' }}
          >
            Borneo<span className="logo-accent">Journey</span>
          </div>

          <nav>
            <ul className="nav-links">
              {navItems.map(item => (
                <li key={item.view}>
                  <button
                    className={`nav-link ${currentView === item.view ? 'active' : ''}`}
                    onClick={() => onNavigate(item.view)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <button
                    className="nav-link active"
                    onClick={() => onNavigate('admin')}
                  >
                    Admin Panel
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div className="user-profile">
            {currentUser ? (
              <>
                <button className="btn btn-outline" onClick={() => { logout(); onNavigate('home'); }}>
                  Sign Out
                </button>
                <div className="avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-primary-fixed)', color: 'var(--color-primary)', fontWeight: 700, fontSize: '14px' }}>
                  {currentUser.email?.charAt(0).toUpperCase()}
                </div>
              </>
            ) : (
              <button className="btn btn-primary" onClick={() => onNavigate('login')}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
