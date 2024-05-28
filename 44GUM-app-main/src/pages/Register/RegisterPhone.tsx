import React, { useState, useEffect } from 'react';
import { IonBackButton, IonButtons, IonIcon, IonItem, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import alter from '../../images/alter.png';
import '../../css/register.css';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import PhoneInput, { isValidPhoneNumber, isPossiblePhoneNumber, getCountries, getCountryCallingCode, Country, formatPhoneNumberIntl } from 'react-phone-number-input';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import 'react-phone-number-input/style.css';
import axios from 'axios';

const RegisterPhone: React.FC = () => {
    //表单
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_Password] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm_Password, setShowConfirm_Password] = useState(false);
    const [present, dismiss] = useIonLoading();
    const [selectedCountry, setSelectedCountry] = useState<string>(''); // 默认值为字符串空值
    const [referralCode, setReferralCode] = useState('');

    //判断表单内容是否为空
    const [isEmptyFirstName, setIsEmptyFirstName] = useState(false);
    const [isEmptyPhoneNumber, setIsEmptyPhoneNumber] = useState(false);
    const [isEmptyPassword, setIsEmptyPassword] = useState(false);
    const [isEmptyConfirm_Password, setIsEmptyConfirm_Password] = useState(false);
    const [isMismatchConfirm_Password, setIsMismatchConfirm_Password] = useState(false);
    const [isUseEffect, setIsUseEffect] = useState(true);
    const [isEmptyReferralCode, setIsEmptyReferralCode] = useState(false);

    //判断表单内容是否规范
    const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
    const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isInvalidConfirm_Password, setIsInvalidConfirm_Password] = useState(false);
    const [isShortPassword, setIsShortPassword] = useState(false);
    const [isShortConfirm_Password, setIsShortConfirm_Password] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const formatPhone = formatPhoneNumberIntl(phoneNumber);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("00" + firstName.trim()  + selectedCountry.trim() + phoneNumber.trim() + password.trim());
        event.preventDefault();
        setIsInvalidFirstName(false);
        setIsInvalidPhoneNumber(false);
        setIsInvalidPassword(false);
        setIsShortConfirm_Password(false);
        setIsShortPassword(false);
        setErrorMessage(null);

        // 判断表单内容是否为空
        setIsEmptyFirstName(firstName.trim() === '');
        setIsEmptyPhoneNumber(phoneNumber.trim() === '');
        setIsEmptyPassword(password.trim() === '');
        setIsEmptyConfirm_Password(confirm_password.trim() === '');

        // 表单不为空时
        if (firstName.trim() !== '' && phoneNumber.trim() !== '' && password.trim() !== '') {
            setIsUseEffect(!isUseEffect);
            console.log('setIsUseEffect' + isUseEffect);
            // 判断用户名是否合法
            setIsInvalidFirstName(!isValidFirstName(firstName.trim()));

            // 判断移动设备格式是否正确
            if (!isPossiblePhoneNumber(phoneNumber.trim()) || !isValidPhoneNumber(phoneNumber.trim())) {
                setIsInvalidPhoneNumber(true);
                console.log('setIsInvalidPhoneNumber' + !isInvalidPhoneNumber);
            }

            // 判断密码是否包含特殊符号
            setIsInvalidPassword(!isValidPassword(password.trim()));
            
            // 将电话号码拆分为国家代码和号码部分
            const [countryCode, ...rest] = formatPhone.split(' ');
            const phone = rest.join('');
            
            // 判断密码是否过短
            setIsShortPassword(password.length < 6);
            console.log(countryCode);
            console.log(phone);
            console.log(password);
            console.log(confirm_password);

            // 发送API请求
            try {
                const response = await axios.post('http://kocu.cswallet.co/api/auth/register', {
                    region: Number(countryCode),
                    phone: Number(phone),
                    password: password,
                    confirm_password: confirm_password,
                }, {
                    headers: {
                        'Authorization': 'Basic MTk4NzgxNzgwNzk6MTIzNDU2c2RmZ2gu',
                        // 'Access-Control-Allow-Origin': 'http://localhost:3000',
                        // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                        'Content-Type': 'application/json'
                    }

                },);

                const result = response.data;


                if (response.status === 200) {
                    // 注册成功
                    setTimeout(() => {
                        dismiss();
                        const userRegister = { id: 12, name: firstName, phoneNumber: formatPhone, vipCard: '690224056-402599', passwordOld: password };
                        localStorage.setItem('userRegister', JSON.stringify(userRegister));
                        history.push('/registerPhoneSecond');
                    }, 1500);
                } else {
                    // 注册失败
                    setErrorMessage(result.message || 'Registration failed');
                }
            } catch (error) {
                const userRegister = { id: 12, name: firstName, phoneNumber: formatPhone, vipCard: '690224056-402599', passwordOld: password };
                localStorage.setItem('userRegister', JSON.stringify(userRegister));

                console.error('Error during registration:', error);
                history.push('/registerPhoneSecond');
                setErrorMessage('An error occurred during registration. Please try again.');
            }
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

    const handleConfirm_PasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirm_Password(e.target.value);
        setIsEmptyConfirm_Password(e.target.value === '');
        setIsMismatchConfirm_Password(e.target.value !== password);
    };
    //返回按钮
    const handleBackClick = () => {
        history.goBack();
    };
    ///隐藏条款
    const handleTermsClick = () => {
        // Handle terms click action here
        // You can show the terms content in a modal or navigate to a terms page
    };
    
    const handlePrivacyPolicyClick = () => {
        // Handle privacy policy click action here
        // You can show the privacy policy content in a modal or navigate to a privacy policy page
    };
     
     const handleEmailClick = () => {
        history.push('/registerEmail')
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',

        }}>
            <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleBackClick}
                    >
                        <ArrowBackIosOutlinedIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', position: 'relative', left: '-1.5rem' }}>
                        <Typography variant="h6" component="div" sx={{ color: 'black' }}>
                            <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                            44 GUM
                        </Typography>
                    </Box>
                    <div /> {/* 添加弹性空间 */}
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{
                flexGrow: 1,
                overflowY: 'auto', // 允许内容区域垂直滚动
                height: 'calc(100vh - 128px)', // 减去 AppBar 的高度
            }}>
                <Toolbar />
                <div className='mt-4'>
                    <p className='text-center font-bold register_title'>Sign Up</p>

                    {(isEmptyFirstName || isEmptyPhoneNumber || isEmptyPassword) && <p className="form-register-alter ">内容不能为空</p>}
                    {errorMessage && <p className="form-register-alter ">{errorMessage}</p>}

                    <div className='mt-8 flex justify-center px-5'>
                        <form onSubmit={onSubmit} className='text-[16px] font-bold w-[85%] '>
                            <div className='form-register'>
                                <p className='form-register-title'>*移動設備綁定</p>
                                <div className='flex flex-row  items-center form-register-item'>
                                    <PhoneInput
                                        defaultCountry='CN'
                                        placeholder="Enter phone number"
                                        value={phoneNumber}
                                        onChange={(value) => { setPhoneNumber(value as string); }}
                                        className={`basis-11/12 rounded-xl form-register-input h-full w-[80%] px-3 flex justify-center border-2 ${isEmptyPhoneNumber ? 'border-red-500' : isInvalidPhoneNumber ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none"
                                        error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'} />
                                    {(isEmptyPhoneNumber || isInvalidPhoneNumber) && <img src={alter} className="form-register-Warning relative" alt="Warning Icon" />}
                                </div>
                                {isInvalidPhoneNumber && <p className="form-register-alter">移動設備格式不正確</p>}
                            </div>
                            <div className='form-register '>
                                <p className='form-register-title '>*用户名</p>
                                <div className='flex flex-row items-center form-register-item'>
                                    <IonItem className={`basis-11/12 rounded-xl form-register-input  h-full w-full flex justify-center  border-2 ${isEmptyFirstName ? 'border-red-500' : isInvalidFirstName ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none">
                                        <input type='text' className='h-full w-full border-0 ' placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input >
                                    </IonItem>
                                    {(isEmptyFirstName || isInvalidFirstName) && <img src={alter} className="form-register-Warning relative" alt="Warning Icon" />}
                                </div>
                                {isInvalidFirstName && <p className="form-register-alter">用戶名已被其他人佔用</p>}
                            </div>
                            {/* <div className='form-register'>
                                <p className='form-register-title'>曾用名</p>
                                <div className='flex flex-row items-center form-register-item'>
                                    <IonItem className={`basis-11/12 rounded-xl form-register-input h-full w-[100%] border-2 flex justify-center border-gray-400 text-gray-500`} lines="none">
                                        <input type='text' className='h-full w-full border-0' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)}></input >
                                    </IonItem>
                                </div>
                            </div> */}
                            
                            <div className='form-register'>
                                <p className='form-register-title'>*密碼</p>
                                <div className='flex flex-row items-center form-register-item '>
                                    <IonItem className={`basis-11/12 rounded-xl form-register-input border-2 h-full  form-register-password ${isEmptyPassword ? 'border-red-500' : isInvalidPassword ? 'border-red-500' : 'border-gray-400'} text-gray-500`} no-lines lines="none" no-border>
                                        <input type={showPassword ? 'text' : 'password'} className='h-full w-full border-0 ' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                                        <button className=" flex justify-center " onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
                                            <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} className=' form-register-eye-button' />
                                        </button>
                                    </IonItem>
                                    {(isEmptyPassword || isInvalidPassword || isShortPassword) && <img src={alter} className="form-register-Warning  relative " alt="Warning Icon" />}
                                </div>
                                {isInvalidPassword && isShortPassword && <p className="form-register-alter">密码最少6位,不应该包含特殊符號 &amp; (%) &gt; &lt; ? </p>}
                                {isInvalidPassword && !isShortPassword && <p className="form-register-alter">密碼不应该包含特殊符號 &amp; (%) &gt; &lt; ?</p>}
                                {!isInvalidPassword && isShortPassword && <p className="form-register-alter">密码最少6位</p>}
                            </div>

                            <div className='form-register'>
                                <p className='form-register-title'>*确认密碼</p>
                                <div className='flex flex-row items-center form-register-item '>
                                    <IonItem className={`basis-11/12 rounded-xl form-register-input border-2 h-full  form-register-confirm_password ${isEmptyConfirm_Password ? 'border-red-500' : isInvalidConfirm_Password ? 'border-red-500' : 'border-gray-400'} text-gray-500`} no-lines lines="none" no-border>
                                        <input type={showConfirm_Password ? 'text' : 'password'} className='h-full w-full border-0 ' placeholder='Confirm_Password' value={confirm_password} onChange={handleConfirm_PasswordChange}></input>
                                        <button className=" flex justify-center " onClick={(e) => { e.preventDefault(); setShowConfirm_Password(!showConfirm_Password); }}>
                                            <IonIcon icon={showConfirm_Password ? eyeOutline : eyeOffOutline} className=' form-register-eye-button' />
                                        </button>
                                    </IonItem>
                                    {(isEmptyConfirm_Password || isMismatchConfirm_Password) && <img src={alter} className="form-register-Warning relative" alt="Warning Icon" />}
                                </div>
                                {isMismatchConfirm_Password && <p className="form-register-alter">密码不匹配</p>}
                            </div>
                            {/* Your existing form code */}
                                                    
                            <div className='form-register'>
                                <p className='form-register-title'>推荐码</p>
                                <div className='flex flex-row items-center form-register-item'>
                                    <IonItem className={`basis-11/12 rounded-xl form-register-input h-full w-full flex justify-center border-2 ${isEmptyReferralCode ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none">
                                        <input type='text' className='h-full w-full border-0 ' placeholder='请输入您推荐人的推荐码' value={referralCode} onChange={(e) => setReferralCode(e.target.value)}></input >
                                    </IonItem>
                                    {(isEmptyReferralCode) && <img src={alter} className="form-register-Warning relative" alt="Warning Icon" />}
                                </div>
                                {/* Placeholder for terms and privacy policy links */}
                                <div className='text-sm mt-2'>
                                    <p onClick={handleTermsClick} className='text-blue-500 cursor-pointer' style={{ color: '#ff69b4' }}>电子钱包使用条款</p>
                                    <p onClick={handlePrivacyPolicyClick} className='text-blue-500 cursor-pointer' style={{ color: '#ff69b4' }}>私隐政策</p>
                                </div>
                            </div>
                                    
                            <div className='flex flex-col items-center  '>
                                <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%]  relative form-register-btn text-white  rounded-full mb-3 '>注册</button>
                            </div>
                            
                        </form>
                    </div>
                    <div className='float-end px-5'>
                        <p className='text-sky-600' style={{ color: '#ff69b4' }} onClick={handleEmailClick}>邮箱注册</p>
                    </div>
                </div>
            </Box>

        </Box>
    );
}

export default RegisterPhone;
