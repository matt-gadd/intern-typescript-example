import { createElement } from 'react';
import { render } from 'react-dom';
import App from './App';

render(
	createElement(App, null),
	document.getElementById('app')
);
