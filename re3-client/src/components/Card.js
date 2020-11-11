import React from 'react';

const Card = ({w, h,children}) => {

    return(
        <div className={`bg-white rounded-md shadow ${w != null ? w : 'w-auto px-16'} ${h != null ? 'h' : 'h-auto py-8'}`}>
            {children}
        </div>
    );
};
export default Card;