import React, { useState } from 'react';
import { Link, RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import { IonBackButton, IonButtons, IonItem, IonTitle, IonToolbar } from '@ionic/react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import '../../css/register.css';
import axios from 'axios';
interface Props extends RouteComponentProps { }

function RegisterEamilSecond(props: Props) {
    const history = useHistory();
    const userRegisterStr = localStorage.getItem('userRegister');
    const userRegister = userRegisterStr ? JSON.parse(userRegisterStr) : null;
    const email = userRegister ? userRegister.email : '';
    const region = userRegister ? userRegister.region : '';
    console.log(email)
    console.log(region)
    console.log(userRegister)
    // 将邮箱地址前三个和后四个字符保留，其余字符用*代替
    // const maskedEmail = email.replace(/^(.{3}).*(.{4}@.+)/, (match: string, firstPart: string, secondPart: string) => {
    //     const maskedMiddle = '*'.repeat(email.length - firstPart.length - secondPart.length);
    //     return firstPart + maskedMiddle + secondPart;
    // });
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationSent, setVerificationSent] = useState(false);
    // 处理按钮点击事件的函数
    const handleClick = () => {
        // 在每次点击时增加点击次数
        props.history.push('/registerEamilSecondEnd');
    };
    // const handleDefaultClick = () => {
    //     // 在这里执行您想要的操作，例如显示一个提示、调用函数等等
    //     alert("需要帮助");
    const handleHelpClick = () => {
        alert("需要帮助？请联系客服！");
    };
    console.log(email)
    const sendVerificationCode = async () => {
        try {
            const response = await axios.post('http://kocu.cswallet.co/api/auth/forgotpassword/send/verificationcode/email', {
                email: email,
                type: 'FORGOT-PASSWORD'
            });
            console.log(response.data); // Assuming response contains relevant information
            setVerificationSent(true);
        } catch (error) {
            console.error('Error sending verification code:', error);
            alert('错误，请重试。');
            setVerificationSent(true);
        }
    };

    const verifyCode = async () => {
        try {
            const response = await axios.post('http://kocu.cswallet.co/api/auth/verify/verificationcode', {
                verification_code: verificationCode,
                type: 'RESET-TRANSACTION-PASSWORD'
            });
            console.log(response.data); // Assuming response contains relevant information
            history.push('/registerEmailSecondEnd');
        } catch (error) {
            history.push('/registerEmailSecondEnd');
            console.error('Error verifying code:', error);
            // Handle error appropriately, e.g., show error message to user
        }
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

                <div className='mt-10'>
                    <p className='text-center text-2xl font-bold'>開啟二級驗證</p>
                    <div className='flex justify-center register-second-content text-wrap'>
                        <form onSubmit={(e) => e.preventDefault()} className='text-[14px]'>
                            {!verificationSent && (
                                <>
                                    <div className='form-register w-full '>
                                        <p className='form-register-second-title font-bold'>*檢查你的电子邮箱是否可用</p>
                                    </div>
                                    <div className='text-sm text-center form-register-second-warning'>
                                        <p onClick={handleHelpClick} className='underline text-[#0047FF80] hover:text-sky-700'>沒有收到信件？需要幫助</p>
                                    </div>
                                    <div className='flex flex-col items-center form-register-second-btn'>
                                        <button type="button" onClick={sendVerificationCode} className='bg-[#FF9292] hover:bg-[#f46c6c] flex justify-center items-center w-[70%] h-[80%] text-white rounded-full'>发送验证码</button>
                                    </div>
                                </>
                            )}
                            {verificationSent && (
                                <>
                                    <div className='flex flex-row items-center'>
                                    <IonItem className={`basis-11/12 rounded-xl border-2 flex justify-center  form-register-second-input  h-full w-full text-gray-500`} no-lines lines="none" no-border>
                                            <input type={'text'} 
                                            className='h-full w-full border-0' 
                                            placeholder='輸入驗證碼'
                                            value={verificationCode} // Set the value of the input field to the verificationCode state
                                            onChange={(e) => setVerificationCode(e.target.value)} >
                                            </input>
                                        </IonItem>
                                    </div>
                                    <p>檢查您的电子邮箱 </p>
                                    <p>{email} </p>
                                    <p>是否收到來自 X-Fxxx開頭的信件</p>
                                    <div className='text-sm text-center form-register-second-warning'>
                                        <p onClick={handleHelpClick} className='underline text-[#0047FF80] hover:text-sky-700'>沒有收到信件？需要幫助</p>
                                    </div>
                                    <div className='flex flex-col items-center form-register-second-btn'>
                                        <button type="button" onClick={verifyCode} className='bg-[#FF9292] hover:bg-[#f46c6c] flex justify-center items-center w-[70%] h-[80%] text-white rounded-full'>验证</button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </Box>

        </Box>
    );
}

export default withRouter(RegisterEamilSecond);
