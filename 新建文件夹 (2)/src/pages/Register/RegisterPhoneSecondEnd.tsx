import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import union from '../../images/Union.png';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import '../../css/register.css';

const RegisterPhoneSecondEnd: React.FC = () => {
    const history = useHistory();
    const [second, setSecond] = useState(true);
    const handleClick = () => {
        setSecond(true);//加入数据库，是否要二级验证
        localStorage.clear(); // 清除所有存储的数据
        history.push('/registerSuccess');
    };
    const handleNoClick = () => {
        setSecond(false);
        localStorage.clear(); // 清除所有存储的数据
        history.push('/registerSuccess');
    };
    // 使用useEffect监听second的变化
    useEffect(() => {
        console.log(second);
    }, [second]);

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
                    <p className='text-center register_title  font-bold'>最後一步</p>
                    <div className='text-center register-second-end '>
                        <p className='text-left register-second-end-title '>是否開啟二級驗證</p>
                        <div className='mt-[10%] mb-[10%] text-sm flex flex-row h-28 register-second-end-content'>
                            <div className='basis-4/6  text-left register-second-end-item'>
                                <p>開啟二級驗證將會啟動雙層保護，在異地登錄您的賬戶需要驗證您的安全信息</p>
                            </div>
                            <div className='basis-2/6 flex justify-end items-end'>
                                <img src={union} className='register-second-end-img bg-cyan-00' alt="" />
                            </div>
                        </div>

                        <div className='flex flex-col items-center register-second-end-btns '>
                            <button onClick={handleClick} className='bg-[#FF9292] hover:bg-[#f46c6c] register-second-end-btn text-white rounded-full'>继续</button>
                        </div>
                        <div className='flex flex-col items-center  register-second-end-btns'>
                            <button onClick={handleNoClick} className='bg-gray-400 hover:bg-gray-700 register-second-end-btn text-white rounded-full'>暂时不用</button>
                        </div>

                    </div>
                </div>
            </Box>

        </Box>
    );
}

export default RegisterPhoneSecondEnd;
