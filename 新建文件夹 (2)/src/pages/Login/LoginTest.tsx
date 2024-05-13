
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useHistory } from 'react-router-dom';
import title from '../../images/title.png';
import alter from '../../images/alter.png';
import { IonItem, useIonLoading } from '@ionic/react';
const LoginTest: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [present, dismiss] = useIonLoading();
    const [isEmptyEmail, setIsEmptyEmail] = useState(false);
    const [isEmptyUsername, setIsEmptyUsername] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);

    //返回按钮
    const handleBackClick = () => {
        history.goBack();
    };
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // setIsInvalidEmail(false);
        if (username.trim() === '') {
            // setIsEmptyEmail(true);
            // setIsInvalidEmail(false);
            setIsEmptyUsername(true);
            return;
        } else {
            setIsEmptyUsername(false);
            setUsername(username.trim());
            // setIsEmptyEmail(false);
            // setEmail(email.trim());
            // setIsInvalidEmail(false);
            await present({ message: 'loading.....' })
            setTimeout(() => {
                dismiss();
                // localStorage.setItem('email', email); 
                history.push(`/loginTest1/${username}`);
            }, 1500);

        }
    };

    // const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     setIsInvalidEmail(false);
    //     if (email.trim() === '') {
    //         setIsEmptyEmail(true);
    //         // setIsInvalidEmail(false);
    //         return;
    //     } else {
    //         setIsEmptyEmail(false);
    //         setEmail(email.trim());
    //         if (!isValidEmail(email.trim())) {
    //             setIsInvalidEmail(true);
    //             return;
    //         } else {
    //             setIsInvalidEmail(false);
    //             await present({ message: 'loading.....' })
    //             setTimeout(() => {
    //                 dismiss();
    //                 // localStorage.setItem('email', email); 
    //                 history.push(`/loginTest1/${email}`);
    //             }, 1500);
    //         }
    //     }
    // };
    //判断邮箱地址是否规范（查找邮箱用户）
    // const isValidEmail = (email: string) => {
    //     // 正则表达式来验证邮箱格式
    //     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;//包括一个用户名，一个 '@' 符号，一个域名，和一个域名后缀
    //     return emailPattern.test(email);
    // };

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
                <div className=' mt-16'>
                    <p className='text-center text-2xl font-bold'>Login</p>
                    <div className='pl-14 pr-4 mt-8'>
                        <p>在这里输入你的用户名</p>
                        <form onSubmit={onSubmit} className='mt-3 '>
                            <div className='flex flex-row  items-center'>
                                <IonItem className={`basis-11/12 rounded-xl  border-2 ${isEmptyUsername ? 'border-red-500' : isInvalidEmail ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none">
                                    {/* <IonInput type='text' placeholder='@gmail.com' value={email} onIonChange={handleInputChange}></IonInput> */}
                                    <input type='text' className='h-full w-full border-0' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}></input >
                                </IonItem>
                                {(isEmptyUsername || isInvalidEmail) && <img src={alter} className="w-6 h-6 ml-3" alt="Warning Icon" />}
                            </div>
                            {isEmptyUsername && <p className="text-red-500 mt-2 text-[11px]">请输入用户名</p>}
                            {/* {isInvalidEmail && <p className="text-red-500 mt-2 text-[11px]">沒有找到該郵箱用戶，請檢查郵箱賬號及格式是否正確</p>} */}

                            {(isEmptyUsername || isInvalidEmail) && <p className="text-[#0047FF80] text-center text-[11px] mt-12 pr-10 underline">忘記了用户名？ 需要幫助</p>}
                            {/* {(isEmptyUsername || isInvalidEmail) && <p className="text-[#0047FF80] text-center text-[11px] mt-12 pr-10 underline">忘記了使用哪個郵箱註冊的賬號？ 需要幫助</p>} */}
                            <div className='flex flex-col items-center mt-5 h-14 pr-10'>
                                <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] h-[80%] text-white text-lg rounded-full mb-3'>继续</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Box>

        </Box>
    );
}
export default LoginTest;