import React, { useState } from 'react';
import { IonBackButton, IonButtons, IonIcon, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory} from 'react-router-dom';
import title from '../../images/title.png';
import alter from '../../images/alter.png';
import loading from '../../images/loading.gif';
import '../../css/login.css'
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import TwoFactorAuth from './TwoFactorAuth'; // 导入二次验证组件
// interface Props extends RouteComponentProps { }

// function Login1(props: Props)
const Login1: React.FC = () => {
    const email = localStorage.getItem('email') || '';// 从本地存储中获取邮箱数据
    const [password, setPassword] = useState('');//密码
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    // const [present, dismiss] = useIonLoading(); //跳转时loading
    const [isLoading, setIsLoading] = useState(false); // 控制加载动画显示与隐藏
    const [isEmptyPassword, setIsEmptyPassword] = useState(false); //密码是否为空
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);//密码是否规范
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);//连接是否超时
    // const [showTwoFactorAuth] = useState(false); // 控制是否显示二次验证页面
    const [showTwoFactorAuth, setShowTwoFactorAuth] = useState(false); // 控制是否显示二次验证页面
    const [verificationSuccess, setVerificationSuccess] = useState(false); // 控制二次验证是否成功
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsInvalidPassword(false);
        setShowTimeoutMessage(false);
        if (password.trim() === '') {
            setIsEmptyPassword(true);
            return;
        } else {
            setIsEmptyPassword(false);
            setPassword(password.trim());
            if (!isValidPassword(password.trim())) {
                setIsInvalidPassword(true);
                return;
            } else {
                setIsInvalidPassword(false);
                setIsLoading(true); // 提交表单时显示加载动画
                setTimeout(() => {
                    setIsLoading(false); // 加载完成后隐藏加载动画

                    // history.push('/main');
                    setShowTwoFactorAuth(true);
                }, 1500);
            }
        }

    };
    //判断密码是否正确（查找邮箱用户对比密码api）
    const isValidPassword = (password: string) => {
        // 这里可以根据您的密码规范来编写验证逻辑，以下是一个示例
        return password.length >= 6;
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    // 二次验证通过后的操作
    const handleVerificationSuccess = () => {
        console.log('二次验证成功，执行相应操作');
        setVerificationSuccess(true); // 设置二次验证成功状态为 true
        // 示例：假设验证通过后跳转到主页面
        history.push('/main');
    };


    return (
        <>
            <IonToolbar className="custom-toolbar flex items-center justify-center mt-2 border-0">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/login" />
                </IonButtons>
                <IonTitle className="ion-text-center text-black text-3xl font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                    44 GUM
                </IonTitle>
            </IonToolbar>
            <div className='mt-14'>
                <p className='text-center text-2xl font-bold'>Login</p>
                <div className='flex items-center justify-center mt-4'>
                    {isLoading && <img src={loading} className='w-8 h-8' alt="Loading Indicator" />} {/* 加载动画 */}
                </div>

                <div className='pl-14 pr-4 mt-8'>
                    <p >在这里输入你的账户密码</p>
                    <form onSubmit={onSubmit} className='mt-3'>
                        <div className='flex flex-row items-center'>
                            <IonItem className={`basis-11/12 rounded-xl  border-2 border-gray-400 text-gray-500`} lines="none">
                                <IonInput type='text' placeholder='@gmail.com' value={email} disabled ></IonInput>
                                {/* <input type={showPassword ? 'text' : 'password'} className='h-full w-full border-0' placeholder='Password' value={password}></input> */}
                            </IonItem>
                        </div>
                        <div className='flex flex-row items-center mt-5'>
                            <IonItem className={`basis-11/12 rounded-xl border-2 ${isEmptyPassword ? 'border-red-500' : isInvalidPassword ? 'border-red-500' : showTimeoutMessage ? 'border-red-500' : 'border-gray-400'} text-gray-500`} no-lines lines="none" no-border>
                                <input type={showPassword ? 'text' : 'password'} className='h-full w-full border-0' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                                <button className="eye-button" onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
                                    <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} className='w-7 h-7' />
                                </button>
                            </IonItem>
                            {(isEmptyPassword || isInvalidPassword || showTimeoutMessage) && <img src={alter} className="w-6 h-6 ml-2" alt="Warning Icon" />}
                        </div>
                        {isEmptyPassword && <p className="text-red-500 mt-2 text-[10px]">请输入密码</p>}
                        {isInvalidPassword && <p className="text-red-500 mt-2 text-[10px]">密码错误</p>}
                        {showTimeoutMessage && <p className="text-red-500 mt-2 text-[10px]">連接超時,請檢查是否帶有VPN的應用在後台運行  錯誤:x10254</p>}
                        {(isEmptyPassword || isInvalidPassword || showTimeoutMessage) && <p className="text-[#0047FF80] text-center text-[11px] mt-12 pr-10 underline">忘記了使用哪個郵箱註冊的賬號？ 需要幫助</p>}
                        <div className='flex flex-col items-center mt-5 h-14 pr-10'>
                            <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] h-[80%] text-white text-lg rounded-full mb-3'>登录</button>
                        </div>
                    </form>
                </div>

                {/* 如果需要二次验证，则显示半透明遮罩和二次验证页面 */}
                {showTwoFactorAuth && !verificationSuccess && (
                    <div style={{
                        position: 'absolute',
                        top: 180,
                        left: 0,
                        width: '100%',
                        height: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)', // 半透明黑色背景
                        zIndex: 9999, // 确保在登录页面上方显示
                    }}>
                        <TwoFactorAuth onVerificationSuccess={handleVerificationSuccess} />
                    </div>
                )}
            </div>
        </>
    );
}

export default Login1;
