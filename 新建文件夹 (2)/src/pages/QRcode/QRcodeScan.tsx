import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Design from '../../images/QRcode/Sample Design.svg';
import flashlight from '../../images/QRcode/flashlight.svg';
import photo from '../../images/QRcode/photo.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import '../../css/QRcodeScan.css'; // 导入自定义样式文件
const QRcodeScan: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();
    const location = useLocation();
    const { from }: { from?: string } = location.state || {};
    const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);


    useEffect(() => {
        startScan();

        return () => {
            stopScan();
        };
    }, []);

    // 组件挂载时隐藏底部导航栏
    useEffect(() => {
        setShowNavbar(false);
        // 组件卸载时重新显示底部导航栏
        return () => {
            setShowNavbar(true);
        };
    }, []);

    const handleBackClick = () => {
        // 根据 'from' 值跳转到相应的路由
        if (from === 'home') {
            history.push('/main/home');
        } else if (from === 'cart') {
            history.push('/main/cart');
        } else if (from === 'wallet') {
            history.push('/main/wallet');
        } else if (from === 'user') {
            history.push('/main/user');
        }
    };

    const startScan = async () => {
        try {
            const { camera } = await BarcodeScanner.checkPermissions();
            if (!camera) {
                await requestPermissions();
                return;
            }

            const listener = await BarcodeScanner.addListener('barcodeScanned', handleBarcodeScanned);
            await BarcodeScanner.startScan({ formats: [BarcodeFormat.QrCode] });

            return listener;
        } catch (error) {
            console.error('Barcode scanning error:', error);
        }
    };

    const stopScan = async () => {
        await BarcodeScanner.removeAllListeners();
        await BarcodeScanner.stopScan();
    };

    const requestPermissions = async () => {
        await BarcodeScanner.requestPermissions();
    };

    const handleBarcodeScanned = async (event: any) => {
        const barcode = event?.barcode;
        if (barcode) {
            alert('scan')
            setScannedBarcode(barcode);
            await stopScan(); // 扫描到第一个条形码后停止扫描
        }
    };
    const handlePhotoClick = () => {
        alert('handlePhotoClick')
    }
    const handleFlashlightClick = () => {
        alert('handleFlashlightClick')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                // backgroundColor: 'blue',
                position: 'relative', // 相对定位以便绝对定位视频和叠加层
            }}
        >
            <AppBar position="fixed" sx={{ boxShadow: 'none', zIndex: '10', backgroundColor: 'transparent' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleBackClick}
                    >
                        <ArrowBackIosOutlinedIcon className='text-white' style={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <div className='text-white text-[1.2rem] text-center relative -left-3'>扫QR码</div>
                    </Box>
                    <div /> {/* 弹性空间 */}
                </Toolbar>
            </AppBar>
            {/* 正方形扫描区域叠加层 */}
            <Box>
                <div className='QRcodeScan_box'>
                    {/* 扫描线 */}
                    <div className="QRcodeScan_scanLine"></div>
                </div>
            </Box>


            <Box className="flex-grow flex items-center justify-center relative">
                <div>         
                    {scannedBarcode && <p>扫描到的QR码: {scannedBarcode}</p>}
                </div>
                {/* 按钮组 */}
                <div className="flex absolute justify-around space-x-4  QRcodeScan_btns">
                    {/* 相册按钮 */}
                    <div className='QRcodeScan_btn' onClick={handlePhotoClick}>
                        <img src={photo} alt="" className='w-full' />
                    </div>
                    {/* 手电筒按钮 */}
                    <div className='QRcodeScan_btn' onClick={handleFlashlightClick}>
                        <img src={flashlight} alt="" className='w-full' />
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default QRcodeScan;
