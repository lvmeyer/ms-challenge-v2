import { Header } from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { NavRoutes } from "./routes/NavRoutes";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";


function App() {

  return (
    <div className="App">
      <Header />
      <NavRoutes />
      <ScrollToTop />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: { duration: 1500 },
          error: { duration: 1500 },
        }}
        containerStyle={{
          top: "6rem",
        }}
      />
    </div>
  );
}

export default App;
