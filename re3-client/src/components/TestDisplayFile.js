import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../firebase';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/palenight';
import Prism from 'prism-react-renderer/prism';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-r');

const TestDisplayFile = () => {
  const [fileContents, setFileContents] = useState('');
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.DisplayContents().then((res) => {
      setFileContents(res);
    });
  }, [firebase]);

  return (
    <Highlight {...defaultProps} theme={theme} code={fileContents} language="r">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`text-left p-4 w-3/4 h-86 overflow-scroll ${className}`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div
              className="table-row"
              key={i}
              {...getLineProps({ line, key: i })}
            >
              <span className="table-cell text-right pr-4 opacity-50 select-none">
                {i + 1}
              </span>
              <span className="table-cell">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default TestDisplayFile;
