import "./App.css";
import React from "react";
import { params, model } from "./ParamEditor";
import ParamEditor from "./ParamEditor";
class App extends React.Component {
  render() {
    return <ParamEditor params={params} model={model} />;
  }
}

export default App;
