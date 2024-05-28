
import React, { useEffect, useState } from 'react';
import logo from '../images/Logo.png';
import transitions from '../images/Transitions.png';
const Logo: React.FC = () => {
    const [backgroundImage, setBackgroundImage] = useState(logo);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBackgroundImage(transitions); // 更改背景图片
        }, 2000);

        return () => clearTimeout(timer); // 清除定时器
    }, []); // 只在组件挂载时执行一次

    const backgroundImageStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    return (
        <div style={{ ...backgroundImageStyle }} className='w-full h-full'>
            
        </div>
    );
}

export default Logo;
