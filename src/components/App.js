import React from 'react';
import Header from './Header';
import { Route } from 'react-router-dom';

const App = ({ children }) => {
  return (
    <div className="ui container">
      <Route path="/" component={Header} />
      {children}
    </div>
  );
};

export default App;
