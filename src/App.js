import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Store from './common/store';
import Login from './screens/Login';
import Skills from './screens/Skills';

class App extends Component {
    render() {
        return (
            <Provider store={Store.store}>
                <PersistGate loading={null} persistor={Store.persistor}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/skills" component={Skills} />
                        </Switch>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
