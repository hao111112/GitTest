import React, { ChangeEvent, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import defaultbg from '../images/DefaultUndo.png';

interface Props extends RouteComponentProps {}
function Default(props: Props) {
    const [isChecked, setIsChecked] = useState(false);
    // const history = useHistory(); // 创建 history 对象
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
      };
    const backgroundImageStyle = {
        backgroundImage: `url(${defaultbg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };

    function login() {
        isChecked ? props.history.push('/login') : alert('隐私政策還沒同意');
    }
    function register() {
        isChecked ? props.history.push('/registerEmail') : alert('隐私政策還沒同意！！');
    }

    
    return (
        <div style={{...backgroundImageStyle}} className='w-full h-full'>
            <div className="absolute inset-x-0 bottom-0 p-4  h-[30%]">
                <div className='flex flex-col items-center mb-3 text-sm'>
                    <label>
                        <input
                        type="checkbox"
                        name="{isChecked}"
                        value="agree"
                        onChange={handleCheckboxChange}
                        className='mr-1'
                        />
                        同意相关
                        {/* <a href="/about" target="_self" rel="noopener noreferrer" className='text-sky-500 hover:text-sky-700'>电子钱包服务使用条款协议</a> */}
                        <Link to="/about" className='text-sky-500 hover:text-sky-700'>电子钱包服务使用条款协议</Link>
                        及
                        {/* <a href="/home" target="_self" rel="noopener noreferrer" className='text-sky-500 hover:text-sky-700'>隐私政策</a> */}
                        <Link to="/home" className='text-sky-500 hover:text-sky-700'>隐私政策</Link>
    
                    </label>
                </div>
                <div className='flex flex-col items-center'>
                    {/* <Link to="/login">
                        <button onClick={login} className='bg-pink-400 hover:bg-pink-700 w-[60%] h-[80%] text-white text-lg rounded-full mb-3'>登录</button>
                    </Link> */}
                    <button onClick={login} className='bg-pink-400 hover:bg-pink-700 w-[60%] h-[80%] text-white text-lg rounded-full mb-3'>登录</button>
                    <button onClick={register} className='bg-gray-400 hover:bg-gray-700 w-[60%] h-[80%] text-white text-lg rounded-full'>注册</button>
                    {/* <Link to="/dashboard">
                        <button onClick={register} className='bg-gray-400 hover:bg-gray-700 w-[60%] h-[80%] text-white text-lg rounded-full'>注册</button>
                    </Link> */}
                </div>
            </div>
        </div>
    );
  }
  
  export default withRouter(Default);
