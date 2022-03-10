import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function Main() {

    const [ initialMenu, setInitialMenu] = useState('LOGIN')

    switch(initialMenu) {
        case 'SIGN_IN':
            return (
                <SignIn uiAttr={{ setInitialMenu }}/>
            );
        case 'SIGN_UP':
            return (
                <SignUp uiAttr={{ setInitialMenu }}/>
            );
        default:
            return (
                <SignIn uiAttr={{ setInitialMenu }}/>
            );
    }
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
