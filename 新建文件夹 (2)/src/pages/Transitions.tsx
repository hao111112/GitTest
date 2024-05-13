import React from 'react';
import transitions from '../images/Transitions.png';
const Transitions: React.FC = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${transitions})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };

    return (
        <div style={{...backgroundImageStyle}} className='w-full h-full'>
            
        </div>
    );
}

export default Transitions;
