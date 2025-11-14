
import Banner from "./components/homepage/Banner";
import Homepage from "./components/homepage/Homepage";

export default function Home() {

  return (
    <div className="font-sans"> {/* Updated background color */}
      <Banner />

      {/* Main Content Section */}
      <Homepage />
    </div>
  );
}