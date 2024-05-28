import React, { useState } from 'react';
import { IonBackButton, IonButtons, IonIcon, IonItem, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import alter from '../../images/alter.png';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import '../../css/login.css'


// 定义 Props 接口
interface Props extends RouteComponentProps {}

function RegisterEmail1(props: Props) {
    //密码
    const [password, setPassword] = useState('');
    const passwordOld = localStorage.getItem('passwordOld') || '';// 从本地存储中获取邮箱数据
    
    // const { passwordOld, email } = props.data || {};
    const [showPassword, setShowPassword] = useState(false);
    const [present, dismiss] = useIonLoading();

    //判断密码是否为空
    const [isEmptyPassword, setIsEmptyPassword] = useState(false);

    //判断密码是否规范
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isShortPassword, setIsShortPassword] = useState(false);
    //判断前后密码是否一致
    const [isEqualPassword, setIsEqualPassword] = useState(false);


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsInvalidPassword(false);
        setIsShortPassword(false);
        setIsEqualPassword(false);
        //判断表单内容是否为空
        if (password.trim() === '') {
            setIsEmptyPassword(password.trim() === '');
            return;
        }
        //表单不为空时
        else {
            setIsEmptyPassword(false);

            //判断密碼是否包含特殊符號&（%》《？
            if (!isValidPassword(password.trim())) {
                setIsInvalidPassword(true);
                return;
            }
            //判断密码是否过短
            else if (password.length < 6) {
                setIsShortPassword(true);
                return;
            }
            //判断前后密码是否一致
            else if (password.trim() === passwordOld.trim()) {
                await present({ message: 'loading.....' })
                setTimeout(() => {
                    dismiss();

                    props.history.push('/registerEamilSecondPhone');
                }, 1500);
                return;
            }
            //前后密码不一致
            else {
                setIsEqualPassword(true);
                return;
            }
        }
    };

    //判断密碼是否包含特殊符號&（%》《？
    const isValidPassword = (password: string) => {
        const passwordPattern = /^[^&()%><]+$/;
        // const passwordPattern = /^[^&\(\)%><?]+$/; // 根据您的密码策略进行调整
        return passwordPattern.test(password);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <IonToolbar className="custom-toolbar flex items-center justify-center mt-2">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/registerEmail" />
                </IonButtons>
                <IonTitle className="ion-text-center text-black text-3xl font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                    44 GUM
                </IonTitle>
            </IonToolbar>

            <div className='mt-10'>
                <p className='text-center text-2xl font-bold'>Sign Up1</p>

                {isEmptyPassword && <p className="form-alter ">密码不能为空</p>}

                {isInvalidPassword && <p className="form-alter">密碼包含特殊符號 &amp; (%) &gt; &lt; ?</p>}
                {isShortPassword && <p className="form-alter">密碼設置過短</p>}
                {isEqualPassword && <p className="form-alter">密碼前后不一致</p>}


                <div className='pl-14 pr-4 mt-8'>
                    <form onSubmit={onSubmit} className='mt-3 text-[14px] font-bold'>
                        <div className='form-signup'>
                            <p className='form-signup-title'>*再次確認一下你的賬戶密碼</p>
                            <div className='flex flex-row  items-center'>
                                <IonItem className={`basis-11/12 rounded-xl border-2 ${isEmptyPassword ? 'border-red-500' : isInvalidPassword ? 'border-red-500' : 'border-gray-400'} text-gray-500`} no-lines lines="none" no-border>
                                    <input type={showPassword ? 'text' : 'password'} className='h-full w-full border-0' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                                    <button className="eye-button" onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
                                        <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} className='w-7 h-7' />
                                    </button>
                                </IonItem>
                                {/* <IonItem className={`basis-11/12 rounded-xl  border-2 ${isEmptyPassword ? 'border-red-500' : isInvalidPassword ? 'border-red-500' : isShortPassword ? 'border-red-500' : isEqualPassword ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none">
                                    <input type='password' className='h-full w-full border-0' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input >
                                </IonItem> */}
                                {(isEmptyPassword || isInvalidPassword || isShortPassword || isEqualPassword) && <img src={alter} className="w-6 h-6 ml-3" alt="Warning Icon" />}
                            </div>
                        </div>

                        <div className='flex flex-col items-center mt-5 h-14 pr-10'>
                            <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] h-[80%] text-white text-lg rounded-full mb-3'>继续</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default withRouter(RegisterEmail1);
