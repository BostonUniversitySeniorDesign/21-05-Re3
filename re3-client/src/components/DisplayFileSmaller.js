import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/palenight';
import Prism from 'prism-react-renderer/prism';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-r');

const DisplayFileSmaller = ({ snippet }) => {
  return (
    <Highlight {...defaultProps} theme={theme} code={snippet} language="r">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`text-left p-4 w-full h-90 overflow-scroll rounded ${className} `}
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

export default DisplayFileSmaller;
