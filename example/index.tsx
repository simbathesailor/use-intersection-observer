import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useIntersectionObserver } from '../.';
import './styles.css';

const defaultVisibilityCondition = (entry: IntersectionObserverEntry) => {
  if (entry.intersectionRatio >= 1) {
    return true;
  }
  return false;
};

const defaultOptions = {
  rootMargin: '0px 0px 0px 0px',
  threshold: '0, 1',
  when: true,
  visibilityCondition: defaultVisibilityCondition,
};

const App = () => {
  const [isVisible, boxElemCallback, rootCallbackRef] = useIntersectionObserver(
    defaultOptions
  );
  return (
    <div className="App">
      <h1>See for the visibility of box at bottom of page</h1>
      <h2>Start scroling down to the visibility change!</h2>
      <div ref={boxElemCallback} className="box">
        {isVisible ? 'Box is visible' : 'Box is not visible'}
      </div>
      {isVisible ? 'Box is visible' : 'Box is not visible'}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
