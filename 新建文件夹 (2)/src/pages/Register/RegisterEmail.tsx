import React, { useState, useEffect } from 'react';
import { IonBackButton, IonButtons, IonIcon, IonItem, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import alter from '../../images/alter.png';
import '../../css/login.css'
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import PhoneInput, { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';

interface Props extends RouteComponentProps { }

function RegisterEmail(props: Props) {
    //表单
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [present, dismiss] = useIonLoading();

    //判断表单内容是否为空
    const [isEmptyFirstName, setIsEmptyFirstName] = useState(false);
    // const [isEmptyEmail, setIsEmptyEmail] = useState(false);
    const [isEmptyPhoneNumber, setIsEmptyPhoneNumber] = useState(false);
    const [isEmptyPassword, setIsEmptyPassword] = useState(false);

    //判断表单内容是否规范
    const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
    // const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isShortPassword, setIsShortPassword] = useState(false);

    useEffect(() => {
        // 如果存在特定类型的错误，则直接返回，不执行提交表单的逻辑
        if (isInvalidFirstName || isInvalidPhoneNumber || isInvalidPassword || isShortPassword) {
            return;
        }

        // 如果没有任何错误，则继续执行提交表单的逻辑
        if (firstName.trim() !== '' && phoneNumber.trim() !== '' && password.trim() !== '') {
            (async () => {
                await present({ message: 'loading.....' });
                setTimeout(() => {
                    dismiss();
                    localStorage.setItem('passwordOld', password); // 将密码存储到 localStorage 中
                    localStorage.setItem('phoneNumber', phoneNumber); // 将电话号码存储到 localStorage 中
                    props.history.push('/registerEmail1');
                }, 1500);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInvalidFirstName, isInvalidPhoneNumber, isInvalidPassword, isShortPassword]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsInvalidFirstName(false);
        setIsInvalidPhoneNumber(false);
        setIsInvalidPassword(false);
        setIsShortPassword(false);

        //判断表单内容是否为空
        setIsEmptyFirstName(firstName.trim() === '');
        setIsEmptyPhoneNumber(phoneNumber.trim() === '');
        setIsEmptyPassword(password.trim() === '');

        //表单不为空时
        if (firstName.trim() !== '' && phoneNumber.trim() !== '' && password.trim() !== '') {
            // 判断用户名是否合法
            setIsInvalidFirstName(!isValidFirstName(firstName.trim()));

            // 判断移动设备格式是否正确
            if (!isPossiblePhoneNumber(phoneNumber.trim()) || !isValidPhoneNumber(phoneNumber.trim())) {
                setIsInvalidPhoneNumber(true);
            }

            // 判断密码是否包含特殊符号
            setIsInvalidPassword(!isValidPassword(password.trim()));

            //判断密码是否过短
            setIsShortPassword(password.length < 6);
        }
    };

    //判断用戶名是否已被其他人佔用(连接后端api 数据库判断)
    const isValidFirstName = (firstName: string) => {
        const firstNamePattern = /^[^&()%><]+$/;
        return firstNamePattern.test(firstName);
    };

    //判断密碼是否包含特殊符號&（%》《？
    const isValidPassword = (password: string) => {
        const passwordPattern = /^[^&()%><]+$/;
        return passwordPattern.test(password);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <IonToolbar className="custom-toolbar flex items-center justify-center mt-2">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle className="ion-text-center text-black text-3xl font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                    44 GUM
                </IonTitle>
            </IonToolbar>

            <div className='mt-4'>
                <p className='text-center text-2xl font-bold'>Sign Up</p>

                {(isEmptyFirstName || isEmptyPhoneNumber || isEmptyPassword) && <p className="form-alter ">内容不能为空</p>}

                <div className='mt-8 flex justify-center px-5'>
                    <form onSubmit={onSubmit} className='text-[16px] font-bold w-[80%]'>
                        <div className='form-signup'>
                            <p className='form-signup-title'>*用户名</p>
                            <div className='flex flex-row items-center h-[50px]'>
                                <IonItem className={`basis-11/12 rounded-xl  h-[50px] w-[100%]  border-2 ${isEmptyFirstName ? 'border-red-500' : isInvalidFirstName ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none">
                                    <input type='text' className='h-full w-full border-0 ' placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input >
                                </IonItem>
                                {(isEmptyFirstName || isInvalidFirstName) && <img src={alter} className="w-6 h-6 ml-3" alt="Warning Icon" />}
                            </div>
                            {isInvalidFirstName && <p className="form-alter">用戶名已被其他人佔用</p>}
                        </div>
                        <div className='form-signup'>
                            <p className='form-signup-title'>曾用名</p>
                            <div className='flex flex-row items-center h-[50px]'>
                                <IonItem className={`basis-11/12 rounded-xl  h-[50px] w-[100%] border-2 border-gray-400 text-gray-500`} lines="none">
                                    <input type='text' className='h-full w-full border-0' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)}></input >
                                </IonItem>
                            </div>
                        </div>
                        <div className='form-signup'>
                            <p className='form-signup-title'>*移動設備綁定</p>
                            <div className='flex flex-row  items-center h-[50px]'>
                                <PhoneInput
                                    defaultCountry="CN"
                                    placeholder="Enter phone number"
                                    value={phoneNumber}
                                    onChange={(value) => setPhoneNumber(value as string)}
                                    className={`basis-11/12 rounded-xl h-[50px] w-[100%] px-3 border-2 ${isEmptyPhoneNumber ? 'border-red-500' : isInvalidPhoneNumber ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none"
                                    error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'} />
                                {(isEmptyPhoneNumber || isInvalidPhoneNumber) && <img src={alter} className="w-6 h-6 ml-3" alt="Warning Icon" />}
                            </div>
                            {isInvalidPhoneNumber && <p className="form-alter">移動設備格式不正確</p>}
                        </div>
                        <div className='form-signup'>
                            <p className='form-signup-title'>*密碼</p>
                            <div className='flex flex-row items-center h-[50px]'>
                                <IonItem className={`basis-11/12 rounded-xl border-2  h-[50px] w-[100%] ${isEmptyPassword ? 'border-red-500' : isInvalidPassword ? 'border-red-500' : 'border-gray-400'} text-gray-500`} no-lines lines="none" no-border>
                                    <input type={showPassword ? 'text' : 'password'} className='h-full w-full border-0' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                                    <button className="eye-button" onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
                                        <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} className='w-7 h-7' />
                                    </button>
                                </IonItem>
                                {(isEmptyPassword || isInvalidPassword || isShortPassword) && <img src={alter} className="w-6 h-6 ml-3" alt="Warning Icon" />}
                            </div>
                            {isInvalidPassword && isShortPassword && <p className="form-alter">密码最少6位,不应该包含特殊符號 &amp; (%) &gt; &lt; ? </p>}
                            {isInvalidPassword && !isShortPassword && <p className="form-alter">密碼不应该包含特殊符號 &amp; (%) &gt; &lt; ?</p>}
                            {!isInvalidPassword && isShortPassword && <p className="form-alter">密码最少6位</p>}
                        </div>

                        <div className='flex flex-col items-center mt-7 h-14 pr-10'>
                            <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] h-[80%] text-white text-lg rounded-full mb-3'>继续</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default withRouter(RegisterEmail);
