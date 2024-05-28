

import React from 'react';
import { IonBackButton, IonButtons, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import '../../css/register.css';



const RegisterSuccess: React.FC = () => {

    const history = useHistory();
    // 处理按钮点击事件的函数
    const handleClick = () => {
        history.push('/default');
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
                <div className='mt-10 text-center '>
                    <p className='font-[500] RegisterSuccess-title'>恭喜&nbsp;!</p>
                    <p className='font-[400] mt-10 px-10 RegisterSuccess-item'>您創建的新賬號能夠正常使用了</p>
                    <div className='flex flex-col items-center  '>
                        <button onClick={handleClick} className='bg-[#FF9292] hover:bg-[#f46c6c] w-[60%]  relative RegisterSuccessr-btn text-white  rounded-full mb-3 '>跳转至登录页</button>
                    </div>
                </div>
            </Box>

        </Box>
    );
}

export default RegisterSuccess;
