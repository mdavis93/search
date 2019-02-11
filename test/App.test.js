import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Search from './components/Search';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("App", () => {
  it('should return HTTP Status 200', () => {
    fetch('http://localhost:3000')
        .then( (response) => {
          expect(response.status).toBe(200);
          expect(response.ok).toBe(true);
        })
  });
});