import React, { useState } from 'react';
import { IonBackButton, IonButtons, IonIcon, IonItem, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import alter from '../../images/alter.png';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import '../../css/register.css';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

const RegisterPhone1: React.FC = () => {
    //密码
    const history = useHistory();
    const [password, setPassword] = useState('');
    const userRegisterStr = localStorage.getItem('userRegister');
    const userRegister = userRegisterStr ? JSON.parse(userRegisterStr) : null;
    const passwordOld = userRegister ? userRegister.passwordOld : '';

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
                    history.push('/registerPhoneSecond');
                   
                    // localStorage.clear(); // 清除所有存储的数据
                    // history.push('/registerSuccess');
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

                <div className='mt-8'>
                    <p className='text-center register_title font-bold'>Sign Up1</p>

                    {isEmptyPassword && <p className="form-register-alter">密码不能为空</p>}

                    {isInvalidPassword && <p className="form-register-alter">密碼包含特殊符號 &amp; (%) &gt; &lt; ?</p>}
                    {isShortPassword && <p className="form-register-alter">密碼設置過短</p>}
                    {isEqualPassword && <p className="form-register-alter">密碼前后不一致</p>}


                    <div className='mt-8 flex justify-center px-5 '>
                        <form onSubmit={onSubmit} className='mt-3 text-[14px] font-bold w-[85%]'>
                            <div className='form-register '>
                                <p className='form-register-title'>*再次確認一下你的賬戶密碼</p>
                                <div className='flex flex-row  items-center  form-register-item'>
                                    <IonItem className={`basis-11/12 rounded-xl form-register-input  h-full  form-register-password  border-2  ${isEmptyPassword ? 'border-red-500' : isInvalidPassword ? 'border-red-500' : 'border-gray-400'} text-gray-500`} no-lines lines="none" no-border>
                                        <input type={showPassword ? 'text' : 'password'} className='h-full w-full border-0' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                                        <button className="flex justify-center " onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
                                            <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} className='form-register-eye-button' />
                                        </button>
                                    </IonItem>
                                    {/* <IonItem className={`basis-11/12 rounded-xl  border-2 ${isEmptyPassword ? 'border-red-500' : isInvalidPassword ? 'border-red-500' : isShortPassword ? 'border-red-500' : isEqualPassword ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none">
                                    <input type='password' className='h-full w-full border-0' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input >
                                </IonItem> */}
                                    {(isEmptyPassword || isInvalidPassword || isShortPassword || isEqualPassword) && <img src={alter} className="form-register-Warning relative" alt="Warning Icon" />}
                                </div>
                            </div>

                            <div className='flex flex-col items-center'>
                                <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] relative form-register-btn text-white rounded-full mb-3'>继续</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Box>

        </Box>
    );
}

export default RegisterPhone1;
