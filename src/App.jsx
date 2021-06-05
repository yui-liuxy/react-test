//根组件
import React, {Component} from 'react';
import Routes from "./router/index";
class App extends Component {
    render() {
        return (
            <>
               <Routes></Routes>
            </>
        );
    }
}

export default App;