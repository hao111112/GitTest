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

const RegisterPhone: React.FC = () => {
    //表单
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [present, dismiss] = useIonLoading();
    const [selectedCountry, setSelectedCountry] = useState<string>(''); // 默认值为字符串空值

    //判断表单内容是否为空
    const [isEmptyFirstName, setIsEmptyFirstName] = useState(false);
    const [isEmptyPhoneNumber, setIsEmptyPhoneNumber] = useState(false);
    const [isEmptyPassword, setIsEmptyPassword] = useState(false);
    const [isUseEffect, setIsUseEffect] = useState(true);
    //判断表单内容是否规范
    const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
    const [isInvalidPhoneNumber, setIsInvalidPhoneNumber] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isShortPassword, setIsShortPassword] = useState(false);
    const formatPhone = formatPhoneNumberIntl(phoneNumber);


    useEffect(() => {
        console.log(isInvalidFirstName);
        console.log(isInvalidPhoneNumber);
        console.log(isInvalidPassword);
        console.log(isShortPassword);
        console.log(isUseEffect);
        // 如果没有任何错误，则继续执行提交表单的逻辑
        if (firstName.trim() !== '' && phoneNumber.trim() !== '' && password.trim() !== '') {
            // 如果存在特定类型的错误，则直接返回，不执行提交表单的逻辑
            if (isInvalidFirstName || isInvalidPhoneNumber || isInvalidPassword || isShortPassword) {
                return;
            }
            (async () => {
                await present({ message: 'loading.....' });
                setTimeout(() => {
                    dismiss();
                    const userRegister = { id: 12, name: firstName, phoneNumber: formatPhone, vipCard: '690224056-402599', passwordOld: password };
                    localStorage.setItem('userRegister', JSON.stringify(userRegister));
                    history.push('/registerPhone1');
                }, 1500);
            })();
        }
    }, [isInvalidFirstName, isInvalidPhoneNumber, isInvalidPassword, isShortPassword, isUseEffect]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log("00" + firstName.trim() + lastName.trim() + phoneNumber.trim() + password.trim());
        event.preventDefault();
        setIsInvalidFirstName(false);
        setIsInvalidPhoneNumber(false);
        setIsInvalidPassword(false);
        setIsShortPassword(false);

        // 判断表单内容是否为空
        setIsEmptyFirstName(firstName.trim() === '');
        setIsEmptyPhoneNumber(phoneNumber.trim() === '');
        setIsEmptyPassword(password.trim() === '');

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

            // 判断密码是否过短
            setIsShortPassword(password.length < 6);

            // 如果所有验证通过，执行跳转逻辑
            console.log("01" + !isEmptyFirstName + !isEmptyPhoneNumber + !isEmptyPassword + !isInvalidFirstName + !isInvalidPhoneNumber + !isInvalidPassword + !isShortPassword);
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

    //返回按钮
    const handleBackClick = () => {
        history.goBack();
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

                    <div className='mt-8 flex justify-center px-5'>
                        <form onSubmit={onSubmit} className='text-[16px] font-bold w-[85%] '>
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
                            <div className='form-register'>
                                <p className='form-register-title'>曾用名</p>
                                <div className='flex flex-row items-center form-register-item'>
                                    <IonItem className={`basis-11/12 rounded-xl form-register-input h-full w-[100%] border-2 flex justify-center border-gray-400 text-gray-500`} lines="none">
                                        <input type='text' className='h-full w-full border-0' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)}></input >
                                    </IonItem>
                                </div>
                            </div>
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

                            <div className='flex flex-col items-center  '>
                                <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%]  relative form-register-btn text-white  rounded-full mb-3 '>继续</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Box>

        </Box>
    );
}

export default RegisterPhone;
