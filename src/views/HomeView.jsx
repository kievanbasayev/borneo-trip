import Hero from "../components/Hero";
import Features from "../components/Features";
import PopularRoutes from "../components/PopularRoutes";

function HomeView({ onSearch, onRouteClick }) {
  return (
    <div>
      <Hero onSearch={onSearch} />
      <Features />
      <PopularRoutes onRouteClick={onRouteClick} />
    </div>
  );
}

export default HomeView;
