import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Write from "./pages/Write";
import PostFull from "./pages/PostFull";
import Footer from "./components/footer/Footer";
import About from "./pages/About";
import { useContext } from "react";
import { Context } from "./context/Context";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import ScrollToTop from "./ScrollTop";
import { AnimatePresence } from "framer-motion";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <ScrollToTop />
      <Navbar className="sticky top-0 " />

      <div className="flex px-3 sm:px-5 md:px-10 xl:px-16 pb-10 max-w-8xl min-h-screen justify-center">
        

        <AnimatePresence>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/posts">
              <Posts />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>

            <Route path="/login">{user ? <Home /> : <Login />}</Route>
            <Route path="/register">{user ? <Home /> : <Register />}</Route>
            <Route path="/profile">{user ? <Profile /> : <Register />}</Route>
            <Route path="/write">{user ? <Write /> : <Login />}</Route>
            <Route path="/post/:postId">
              <PostFull />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
      <Footer className="bottom-0" />
    </Router>
  );
}

export default App;
