import React from 'react';

const STORAGE_KEYS = {
  schedules: 'borneo_schedules',
  bookings: 'borneo_bookings',
  reviews: 'borneo_reviews',
  cities: 'borneo_cities',
  events: 'borneo_pricing_events',
  routePrices: 'borneo_route_prices',
  currentUser: 'borneo_current_user',
};

const defaultSchedules = [
  { id: 'S-01', origin: 'Banjarmasin', destination: 'Palangkaraya', depTime: '07:30', arrTime: '11:00', duration: '3j 30m', class: 'Executive', price: 150000, status: 'on-time', seatsAvailable: 8, plate: 'DA 1022 T', timeCategory: 'pagi' },
  { id: 'S-02', origin: 'Banjarmasin', destination: 'Palangkaraya', depTime: '13:00', arrTime: '16:30', duration: '3j 30m', class: 'Royal Executive', price: 220000, status: 'on-time', seatsAvailable: 5, plate: 'DA 8088 BS', timeCategory: 'siang' },
  { id: 'S-03', origin: 'Banjarmasin', destination: 'Palangkaraya', depTime: '19:00', arrTime: '22:30', duration: '3j 30m', class: 'Executive', price: 150000, status: 'delayed', seatsAvailable: 11, plate: 'DA 2901 X', timeCategory: 'malam' },
  { id: 'S-04', origin: 'Banjarbaru', destination: 'Sampit', depTime: '06:00', arrTime: '12:30', duration: '6j 30m', class: 'Executive', price: 200000, status: 'on-time', seatsAvailable: 9, plate: 'DA 1124 AC', timeCategory: 'pagi' },
  { id: 'S-05', origin: 'Banjarbaru', destination: 'Sampit', depTime: '14:30', arrTime: '21:00', duration: '6j 30m', class: 'Royal Executive', price: 280000, status: 'on-time', seatsAvailable: 4, plate: 'DA 9900 KK', timeCategory: 'siang' },
  { id: 'S-06', origin: 'Palangkaraya', destination: 'Banjarmasin', depTime: '08:00', arrTime: '11:30', duration: '3j 30m', class: 'Executive', price: 150000, status: 'on-time', seatsAvailable: 7, plate: 'KH 1088 T', timeCategory: 'pagi' },
  { id: 'S-07', origin: 'Palangkaraya', destination: 'Banjarmasin', depTime: '16:00', arrTime: '19:30', duration: '3j 30m', class: 'Royal Executive', price: 220000, status: 'on-time', seatsAvailable: 6, plate: 'KH 7077 P', timeCategory: 'siang' },
  { id: 'S-08', origin: 'Sampit', destination: 'Banjarbaru', depTime: '08:30', arrTime: '15:00', duration: '6j 30m', class: 'Executive', price: 200000, status: 'on-time', seatsAvailable: 10, plate: 'KH 1234 B', timeCategory: 'pagi' },
  { id: 'S-09', origin: 'Sampit', destination: 'Banjarbaru', depTime: '20:00', arrTime: '02:30', duration: '6j 30m', class: 'Royal Executive', price: 280000, status: 'delayed', seatsAvailable: 8, plate: 'KH 5543 AX', timeCategory: 'malam' },
];

const defaultReviews = [
  { author: 'Rizky Pratama', rating: 5, date: '05 Agustus 2026', text: 'Sangat puas dengan layanan door-to-door. Saya dijemput tepat waktu di Banjarmasin dan diantar langsung sampai depan kantor di Palangkaraya. Kendaraan bersih dan wangi.' },
  { author: 'Siti Rahmah', rating: 5, date: '01 Agustus 2026', text: 'Nyaman sekali menggunakan kelas Royal Executive. Kursinya lebar dan empuk, ada colokan charger USB berfungsi baik, dan drivernya ramah. Pelacakan di peta sangat membantu keluarga memantau posisi saya.' },
  { author: 'Hendra Wijaya', rating: 4, date: '28 Juli 2026', text: 'Shuttle on time. Estimasi waktu perjalanan akurat. Pelayanan bagus, harga tiket sepadan dengan fasilitas jemputan.' },
];

const defaultCities = ['Banjarmasin', 'Banjarbaru', 'Palangkaraya', 'Sampit'];

const defaultEvents = [
  { id: 'E-01', name: 'Libur Lebaran', start: '2026-08-10', end: '2026-08-17', type: 'markup-percent', value: 20 },
];

const defaultRoutePrices = [
  { origin: 'Banjarmasin', destination: 'Palangkaraya', class: 'Executive', price: 150000 },
  { origin: 'Banjarmasin', destination: 'Palangkaraya', class: 'Royal Executive', price: 220000 },
  { origin: 'Banjarbaru', destination: 'Sampit', class: 'Executive', price: 200000 },
  { origin: 'Banjarbaru', destination: 'Sampit', class: 'Royal Executive', price: 280000 },
  { origin: 'Palangkaraya', destination: 'Banjarmasin', class: 'Executive', price: 150000 },
  { origin: 'Palangkaraya', destination: 'Banjarmasin', class: 'Royal Executive', price: 220000 },
  { origin: 'Sampit', destination: 'Banjarbaru', class: 'Executive', price: 200000 },
  { origin: 'Sampit', destination: 'Banjarbaru', class: 'Royal Executive', price: 280000 },
];

function loadFromStorage(key, defaults) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaults;
  } catch {
    return defaults;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch { /* ignore */ }
}

export function useSchedules() {
  const [schedules, setSchedules] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.schedules, defaultSchedules)
  );

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.schedules, schedules);
  }, [schedules]);

  const updateSchedule = (id, data) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  };

  const deleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const addSchedule = (schedule) => {
    setSchedules(prev => [...prev, schedule]);
  };

  const filterSchedules = (origin, destination, timeFilter = [], classFilter = []) => {
    let result = schedules;
    if (origin) result = result.filter(s => s.origin === origin);
    if (destination) result = result.filter(s => s.destination === destination);
    if (timeFilter.length > 0) result = result.filter(s => timeFilter.includes(s.timeCategory));
    if (classFilter.length > 0) result = result.filter(s => classFilter.includes(s.class));
    return result;
  };

  return { schedules, setSchedules, updateSchedule, deleteSchedule, addSchedule, filterSchedules };
}

export function useBookings() {
  const [bookings, setBookings] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.bookings, [])
  );

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.bookings, bookings);
  }, [bookings]);

  const addBooking = (booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  return { bookings, setBookings, addBooking };
}

export function useReviews() {
  const [reviews, setReviews] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.reviews, defaultReviews)
  );

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.reviews, reviews);
  }, [reviews]);

  const addReview = (review) => {
    setReviews(prev => [{ ...review, date: 'Hari ini' }, ...prev]);
  };

  const deleteReview = (index) => {
    setReviews(prev => prev.filter((_, i) => i !== index));
  };

  return { reviews, setReviews, addReview, deleteReview };
}

export function useAuth() {
  const [currentUser, setCurrentUser] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.currentUser, null)
  );

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.currentUser, currentUser);
  }, [currentUser]);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return { currentUser, login, logout, isAdmin: currentUser?.role === 'admin', isCustomer: currentUser?.role === 'customer', isLoggedIn: !!currentUser };
}

export function useCities() {
  const [cities, setCities] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.cities, defaultCities)
  );

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.cities, cities);
  }, [cities]);

  const addCity = (name) => {
    if (!cities.map(c => c.toLowerCase()).includes(name.toLowerCase())) {
      setCities(prev => [...prev, name]);
    }
  };

  const deleteCity = (name) => {
    setCities(prev => prev.filter(c => c !== name));
  };

  return { cities, addCity, deleteCity };
}

export function useRoutePrices() {
  const [routePrices, setRoutePrices] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.routePrices, defaultRoutePrices)
  );

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.routePrices, routePrices);
  }, [routePrices]);

  const updatePrice = (origin, destination, sClass, price) => {
    setRoutePrices(prev => {
      const idx = prev.findIndex(rp => rp.origin === origin && rp.destination === destination && rp.class === sClass);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], price };
        return next;
      }
      return [...prev, { origin, destination, class: sClass, price }];
    });
  };

  const getPrice = (origin, destination, sClass) => {
    return routePrices.find(rp => rp.origin === origin && rp.destination === destination && rp.class === sClass)?.price || 150000;
  };

  return { routePrices, setRoutePrices, updatePrice, getPrice };
}

export function usePricingEvents() {
  const [events, setEvents] = React.useState(() =>
    loadFromStorage(STORAGE_KEYS.events, defaultEvents)
  );

  React.useEffect(() => {
    saveToStorage(STORAGE_KEYS.events, events);
  }, [events]);

  const addEvent = (event) => {
    setEvents(prev => [...prev, event]);
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const getAdjustedPrice = (basePrice, date) => {
    if (!date) return { finalPrice: basePrice, activeEvent: null, adjustmentAmount: 0 };
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    const activeEvent = events.find(ev => {
      const start = new Date(ev.start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(ev.end);
      end.setHours(23, 59, 59, 999);
      return targetDate >= start && targetDate <= end;
    });
    if (!activeEvent) return { finalPrice: basePrice, activeEvent: null, adjustmentAmount: 0 };
    let adjustmentAmount = 0;
    let finalPrice = basePrice;
    if (activeEvent.type === 'markup-percent') {
      adjustmentAmount = Math.round(basePrice * (activeEvent.value / 100));
      finalPrice = basePrice + adjustmentAmount;
    } else if (activeEvent.type === 'markup-nominal') {
      adjustmentAmount = activeEvent.value;
      finalPrice = basePrice + adjustmentAmount;
    } else if (activeEvent.type === 'discount-percent') {
      adjustmentAmount = Math.round(basePrice * (activeEvent.value / 100));
      finalPrice = basePrice - adjustmentAmount;
      adjustmentAmount = -adjustmentAmount;
    }
    return { finalPrice, activeEvent, adjustmentAmount };
  };

  return { events, setEvents, addEvent, deleteEvent, getAdjustedPrice };
}

export function getPaymentMethodName(method) {
  const map = {
    'gopay': 'GoPay / OVO (e-Wallet)',
    'dana': 'DANA / ShopeePay (QRIS)',
    'va-bca': 'BCA Virtual Account',
    'va-mandiri': 'Mandiri Virtual Account',
    'va-bni': 'BNI Virtual Account',
  };
  return map[method] || 'Pembayaran Digital';
}

export function generateBookingCode() {
  return `BTX-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}
