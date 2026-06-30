import Banner from "./components/homepage/Banner";
import Homepage from "./components/homepage/Homepage";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 max-w-6xl">
        <Banner />
      </div>
      <Homepage />
    </div>
  );
}
