import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { GithubProvider } from "./context/github/GithubContext";
import { useState } from "react";
import Alert from "./components/layout/Alert";
import User from "./pages/User";

function App() {
  const [alert, setAlert] = useState("");
  const handleAlert = (msg) => {
    setAlert(msg);
    //3초 뒤에 메세지 제거
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };
  return (
    //여기가 전역으로 context를 적용하는 부분 : children은 App.js의 자식 컴포넌트들
    <GithubProvider>
      <BrowserRouter>
        <div className="flex flex-col justify-between h-screen">
          <Navbar title="Github Finder" />

          <main className="container mx-auto px-3 pb-12">
            <Alert alert={alert} />
            <Routes>
              <Route path="/" element={<Home handleAlert={handleAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/user/:login" element={<User />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </GithubProvider>
  );
}

export default App;
