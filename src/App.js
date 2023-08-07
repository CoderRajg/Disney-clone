import {BrowserRouter as Router , Route , Switch } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
