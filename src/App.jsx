import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import MyTrip from "./pages/MyTrip";
import { TripProvider } from "./context/TripContext";

function App() {
  return (
    <BrowserRouter>
      <TripProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/destination/:id" element={<DestinationDetails />} />
              <Route path="/my-trip" element={<MyTrip />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </div>
      </TripProvider>
    </BrowserRouter>
  );
}

export default App;