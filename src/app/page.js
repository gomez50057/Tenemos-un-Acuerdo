import Portada from "../components/Portada";
import Sobre from "../components/About";
import PlanEstatal from "../components/planEstatal/PlanEstatal";
import Slider from "../components/Slider";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import Chatbot from "../components/chat/Chatbot";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Portada />
      <Sobre />
      <PlanEstatal />
      <Slider />
      <Footer />
      <Chatbot />
    </div>
  );
}