import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import PopularRoutes from "./components/PopularRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <PopularRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
