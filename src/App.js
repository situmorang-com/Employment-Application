import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Skills from './screens/Skills';
import Store from './common/store';

class App extends Component {
    render() {
        return (
            <Provider store={Store.store}>
                <PersistGate loading={null} persistor={Store.persistor}>
                    <Skills />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
