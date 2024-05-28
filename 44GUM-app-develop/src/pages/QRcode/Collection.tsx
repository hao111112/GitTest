import { AppBar, Box, Button, Grid, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Design from '../../images/QRcode/Sample Design.svg';
import copy from '../../images/QRcode/collection/copy.svg';
import qrcode from '../../images/QRcode/collection/qrcode.svg';
import save from '../../images/QRcode/collection/save.svg';
import share from '../../images/QRcode/collection/share.svg';
import { useHistory, useLocation } from 'react-router-dom';
import '../../css/collection.css'; // 导入自定义样式文件
const Collection: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();
    const location = useLocation();
    const { from }: { from?: string } = location.state || {};
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userName = user ? user.name : '';
    const userVipCard = user ? user.vipCard : '';
    // console.log('TransactionHistory'+from)
    //返回按钮
    const handleBackClick = () => {
        if (from === 'home') {
            history.push('/main/home');
        }
        else if (from === 'cart') {
            history.push('/main/cart');
        }
        else if (from === 'wallet') {
            history.push('/main/wallet');
        }
        else if (from === 'user') {
            history.push('/main/user');
        }
    };

    // 组件挂载时隐藏底部导航栏
    useEffect(() => {
        setShowNavbar(false);
        // 组件卸载时重新显示底部导航栏
        return () => {
            setShowNavbar(true);
        };
    }, []);

    
    const handleCopyClick = () => {
        alert('copy')
    }
    const handleShareClick = () => {
        alert('share')
    }
    const handleSaveClick = () => {
        alert('save')
    }

return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: `url(${Design})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
    }}>

        <AppBar position="fixed" sx={{ boxShadow: 'none', zIndex: '10', backgroundColor: 'white' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleBackClick}
                >
                    <ArrowBackIosOutlinedIcon className='text-gray-400' style={{ fontSize: '1.8rem' }} />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <div className='text-black text-[1.5rem]'>收款</div>
                </Box>
                <Button onClick={handleCopyClick} color="inherit" >
                    <img src={copy} alt="HeaderRight" className=' collection-copy' />
                </Button>
            </Toolbar>
        </AppBar>
        <Box component="main" sx={{
            flexGrow: 1,
            overflowY: 'auto', // 允许内容区域垂直滚动
            padding: '0px',
            height: 'calc(100vh - 64px)', // 减去 AppBar 的高度

        }}>
            <Toolbar />
            <div >
                <div className='text-center collection-username'>
                    <p>{userName}</p>
                </div>
                <div className='w-full flex flex-col items-center'>
                    <div className='collection-qrcode'>
                        <img src={qrcode} alt="" className='w-full h-full' />
                    </div>
                    <p className='collection-userVipCard'>{userVipCard}</p>
                    <p className='w-[90%] collection-line'></p>
                </div>
                <div className='flex justify-center'>
                    <div className='collection-icon text-center' onClick={handleShareClick}>
                        <img src={share} alt="" className='w-full h-full' />
                        <p className='collection-icon-item'>分享</p>
                    </div>
                    <div className='collection-icon text-center' onClick={handleSaveClick}>
                        <img src={save} alt="" className='w-full h-full' />
                        <p className='collection-icon-item'>儲存QRcode</p>
                    </div>
                </div>
            </div>
        </Box>
    </Box>
);
}
export default Collection;
