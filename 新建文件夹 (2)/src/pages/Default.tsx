import React, { ChangeEvent, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import defaultbg from '../images/DefaultUndo.png';
import '../css/default.css'
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
    const handleTCClick=()=>{
        props.history.push('/tcLogin')
    }
    function login() {
        isChecked ? props.history.push('/loginTest') : alert('隐私政策還沒同意');
    }
    function register() {
        isChecked ? props.history.push('/registerPhone') : alert('隐私政策還沒同意！！');
    }

    
    return (
        <div style={{...backgroundImageStyle}} className='w-full h-full'>
            <div className="absolute inset-x-0 bottom-0 default-content   h-[30%]">
                <div className='flex flex-col items-center default-item'>
                    <label className='flex '>
                        <input
                        type="checkbox"
                        name="{isChecked}"
                        value="agree"
                        onChange={handleCheckboxChange}
                        className='mr-1 default-checkbox'
                        />
                        同意相关
                        <p className='text-sky-500 hover:text-sky-700' onClick={handleTCClick}>电子钱包服务使用条款协议</p>
                        及
                        <p className='text-sky-500 hover:text-sky-700' onClick={handleTCClick}>隐私政策</p>
                    </label>
                </div>
                <div className='flex flex-col items-center default-btns'>
                    <button onClick={login} className='bg-pink-400 hover:bg-pink-700  default-btn  text-white rounded-full mb-3'>登录</button>
                    <button onClick={register} className='bg-gray-400 hover:bg-gray-700  default-btn  text-white rounded-full'>注册</button>
                </div>
            </div>
        </div>
    );
  }
  
  export default withRouter(Default);
