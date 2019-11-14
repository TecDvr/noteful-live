import React from 'react';
import ReactDOM from 'react-dom';
import Folder from './Folder';

it('renders w/o crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Folder />, div);
    ReactDOM.unmountComponentAtNode(div);
})