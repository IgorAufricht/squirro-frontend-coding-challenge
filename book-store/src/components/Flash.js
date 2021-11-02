import { useEffect, useState } from 'react';
import { on, remove } from '../utils/events';

import './Flash.scss';

// Inspired by https://medium.com/@jaouad_45834/building-a-flash-message-component-with-react-js-6288da386d53
function Flash() {
  let [visibility, setVisibility] = useState(false);
  let [fadeout, setFadeout] = useState(false);
  let [message, setMessage] = useState('');
  let [type, setType] = useState('');

  useEffect(() => {
    let timerId = null;

    on('flash', flash);

    return () => {
      remove('flash', flash);
    };

    function flash({ message, type }) {
      setVisibility(true);
      setFadeout(true);
      setMessage(message);
      setType(type);

      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        setVisibility(false);
        timerId = null;
      }, 4000);
    }
  }, []);

  const visibilityClass = visibility ? 'alert-visible' : '';
  const fadeoutClass = !visibility && fadeout ? 'alert-fadeout' : '';

  return (
    <div className={`alert alert-${type} ${visibilityClass} ${fadeoutClass}`}>
      <p>{message}</p>
      <button
        className="close"
        onClick={() => {
          setVisibility(false);
          setFadeout(false);
        }}
      >
        &#10006;
      </button>
    </div>
  );
}

export default Flash;
