import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import PopularRoutes from './components/PopularRoutes';
import Footer from './components/Footer';
import SchedulesView from './views/SchedulesView';
import BookingsView from './views/BookingsView';
import TrackingView from './views/TrackingView';
import ReviewsView from './views/ReviewsView';
import SupportView from './views/SupportView';
import AdminView from './views/AdminView';
import LoginModal from './views/LoginModal';
import BookingModal from './views/BookingModal';
import { useAuth } from './hooks';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [searchParams, setSearchParams] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { currentUser, login, logout } = useAuth();

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail;
      if (detail === 'home') setCurrentView('home');
      if (detail === 'bookings') setCurrentView('bookings');
      if (detail === 'schedules') setCurrentView('schedules');
    };
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, []);

  const handleNavigate = (view) => {
    if (view === 'login') {
      setCurrentView('login-overlay');
      return;
    }
    setCurrentView(view);
    setSearchParams(null);
  };

  const handleSearch = (params) => {
    setSearchParams(params);
    setCurrentView('schedules');
  };

  const handleRouteClick = (params) => {
    setSearchParams(params);
    setCurrentView('schedules');
  };

  const handleOpenBooking = (schedule) => {
    setSelectedSchedule(schedule);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    // Don't close modal automatically - let user see the e-ticket
  };

  const handleCloseBooking = () => {
    setShowBookingModal(false);
    setSelectedSchedule(null);
  };

  const handleLoginSuccess = (role) => {
    if (role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('home');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Hero onSearch={handleSearch} />;
      case 'schedules':
        return <SchedulesView searchParams={searchParams} onBackHome={() => setCurrentView('home')} onOpenBooking={handleOpenBooking} />;
      case 'bookings':
        return <BookingsView />;
      case 'tracking':
        return <TrackingView />;
      case 'reviews':
        return <ReviewsView />;
      case 'support':
        return <SupportView />;
      case 'admin':
        return <AdminView />;
      default:
        return <Hero onSearch={handleSearch} />;
    }
  };

  const showNavContent = currentView !== 'login-overlay';

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      {showNavContent && (
        <Navbar
          onNavigate={handleNavigate}
          currentView={currentView}
          currentUser={currentUser}
          onLogout={() => { logout(); handleNavigate('home'); }}
        />
      )}
      <main className="flex-grow">
        {renderView()}
        {currentView === 'home' && <Features />}
        {currentView === 'home' && <PopularRoutes onRouteClick={handleRouteClick} />}
      </main>
      {showNavContent && <Footer />}

      {currentView === 'login-overlay' && (
        <LoginModal
          onClose={() => setCurrentView('home')}
          onLoginSuccess={handleLoginSuccess}
          login={login}
        />
      )}

      {showBookingModal && selectedSchedule && (
        <BookingModal
          schedule={selectedSchedule}
          searchParams={searchParams}
          onClose={handleCloseBooking}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}

export default App;
