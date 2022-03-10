import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './pages/SignIn';

function Main() {
    return (
        <SignIn/>
    );
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}
