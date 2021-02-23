import React from 'react';

const Card = ({w, h,color,children}) => {

    return(
        <div className={`rounded-md  ${w != null ? w : 'w-auto px-16'} ${h != null ? 'h' : 'h-auto py-8'} ${color !=null ? color : "bg-white"} ` }>
            {children}
        </div>
    );
};
export default Card;