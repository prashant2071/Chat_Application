import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./componet/Chat/chat.component";
import Join from "./componet/Join/join.component";

const App = () => {
  return (
    <>
      <Router>
        <Route path="/" exact component={Join}></Route>
        <Route path="/chat" exact component={Chat}></Route>
      </Router>
    </>
  );
};
export default App;
