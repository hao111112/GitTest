import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import flashlight from '../../images/QRcode/flashlight.svg';
import photo from '../../images/QRcode/photo.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { BarcodeScanner, BarcodeFormat, ReadBarcodesFromImageOptions } from '@capacitor-mlkit/barcode-scanning';
import '../../css/QRcodeScan.css'; // 导入自定义样式文件
const QRcodeScan: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();
    const location = useLocation();
    const { from }: { from?: string } = location.state || {};
    const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

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
            return new Promise(async resolve => {
                const listener = await BarcodeScanner.addListener(
                    'barcodeScanned',
                    async result => {
                        await listener.remove();
                        await BarcodeScanner.stopScan();
                        setScannedBarcode(result.barcode.rawValue);
                        // alert('result.barcode.rawValue' + result.barcode.rawValue)
                        resolve(result.barcode.rawValue);
                    },
                );
                await BarcodeScanner.startScan();
            });

        } catch (error) {
            alert('Barcode scanning error:' + error);
        }
    };


    const stopScan = async () => {
        // alert('stopScan')
        // Remove all listeners
        await BarcodeScanner.removeAllListeners();
        // Stop the barcode scanner
        await BarcodeScanner.stopScan();
    };
    // 在组件中调用 startScan 函数
    useEffect(() => {
        setShowNavbar(false);
        startScan().then(barcodeData => {
            // 处理扫描到的二维码数据
            alert('扫描到的二维码数据:' + barcodeData);

        }).catch(error => {
            alert('二维码扫描出错:' + error);
        });
        return () => {
            setShowNavbar(true);
            stopScan();
            // alert('useEffect stopScan');
        };
    }, []);

    const requestPermissions = async () => {
        await BarcodeScanner.requestPermissions();
    };
    const handlePhotoClick = async () => {
        try {
            const photo: Photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos,
                quality: 100
            });

            if (photo && photo.webPath) {
                setImageUrl(photo.webPath);
                alert('拿到图片本地路径：' + photo.webPath);

                // 解析图片中的二维码
                try {
                    // 添加图片加载前的检查
                    if (await isImageValid(photo.webPath)) {
                        // alert('添加图片加载前的检查' + await isImageValid(photo.webPath))
                        parseQRCodeFromImage(photo.webPath)
                            .then(qrCode => {
                                if (qrCode) {
                                    alert('Detected QR code:' + qrCode);
                                } else {
                                    alert('No QR code detected in the image.');
                                }
                            })
                            .catch(error => {
                                alert('Error parsing QR code from image:handlePhotoClick' + error);
                            });
                    } else {
                        alert('图片加载失败。');
                    }
                } catch (error) {
                    alert('Error parsing QR code from image:' + error);
                }
            }
        } catch (error) {
            alert('Error selecting photo:' + error);
        }
    };

    const isImageValid = async (imagePath: string): Promise<boolean> => {
        try {
            // 使用 fetch 函数检查图片是否存在
            const response = await fetch(imagePath);

            // 检查响应状态码是否为 200
            if (!response.ok) {
                return false;
            }
            // 获取图片内容大小
            const blob = await response.blob();
            const imageSize = blob.size;

            // 如果图片大小大于0，则认为图片加载成功
            return imageSize > 0;
        } catch (error) {
            console.error('Error checking image validity:', error);
            return false;
        }
    };

    const parseQRCodeFromImage = async (imagePath: string): Promise<string | null> => {
        try {
            const options: ReadBarcodesFromImageOptions = {
                path: imagePath
            };
            alert('options' + options.path);
            const result = await BarcodeScanner.readBarcodesFromImage(options);
            // 如果有识别到二维码，则返回第一个二维码的内容
            if (result.barcodes && result.barcodes.length > 0) {
                alert('parseQRCodeFromImage解析到的二维码数据' + result.barcodes[0].rawValue);
                return result.barcodes[0].rawValue;
            } else {
                return null;
            }
        } catch (error) {
            alert('Error parsing QR code from image:parseQRCodeFromImage' + error);
            return null;
        }
    };

    const handleFlashlightClick = async () => {
        try {
            const torchAvailableResult = await BarcodeScanner.isTorchAvailable();
            const torchEnabledResult = await BarcodeScanner.isTorchEnabled();

            if (!torchAvailableResult.available) {
                console.log('该设备不支持手电筒功能。');
                return;
            }

            if (torchEnabledResult.enabled) {
                await BarcodeScanner.toggleTorch(); // 禁用手电筒
                console.log('手电筒已关闭。');
            } else {
                await BarcodeScanner.toggleTorch(); // 启用手电筒
                console.log('手电筒已启用。');
            }
        } catch (error) {
            console.error('切换手电筒时出错：', error);
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                // backgroundColor: 'pink',
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
                <div className='w-1/2'>
                    {scannedBarcode && <p className='break-words'>扫描到的QR码: <p className='break-words'>{scannedBarcode}</p></p>}
                </div>
                <div>
                    {imageUrl && <img src={imageUrl} alt="Selected Image" className='photo-image' />}
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
