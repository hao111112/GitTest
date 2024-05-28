import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import '../../css/tc.css'; // 导入自定义样式文件
import { useHistory } from 'react-router-dom';

const TCLogin: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();

    //返回按钮
    const handleBackClick = () => {
        history.push('/default');
    };


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <AppBar position="fixed" sx={{
                backgroundColor: 'white',
                boxShadow: 'none'
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleBackClick}
                    >
                        <ArrowBackIosOutlinedIcon className='text-gray-400' style={{ fontSize: '1.5rem' }} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <div className='text-black text-[1.4rem]'>使用細則及條款</div>
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
                <div className='px-6'>
                    <p className='text-[1.2rem]'>現金券使用條款及細則:</p>
                    <p className='tc_item'>a) 本現金券由 CHINA ENGINE LIMITED 下稱「商戶」發行及承兌。 </p>
                    <p className='tc_item'>b) 本現金券面值為$ 100港元。 </p>
                    <p className='tc_item'>c) 本現金券持有人只限於商戶及其指定分店換取不超於其面值之貨品及/或服務，不設找續。</p>
                    <p className='tc_item'>d) 有效日期: 本現金券自購買日或兌換日( 以較早者為準) 起計90天內有效( 包括購買日或兌換日當日) ，逾期作廢失效。 </p>
                    <p className='tc_item'>e) 本現金券只適用於指定商戶分店，產品價格按照門市不時更新的價錢為準。 </p>
                    <p className='tc_item'>f) 現金券持有人須於付款前於收銀處透過流動裝置出示本現金券。商戶在任何情況下均不接受列印本。</p>
                    <p className='tc_item'>g) 本現金券不可兌換現金。</p>
                    <p className='tc_item'>h) 如欲辦理換貨，須根據各門店之換貨程序處理不得返回現金或現金券。</p>
                    <p className='tc_item'>i) 除非本條款及細則另有說明，否則本現金券不設最低消費額。於指定分店使用時，商戶不得對之加以任何限制。</p>
                    <p className='tc_item'>j) 除非本條款及細則另有說明，否則本現金券同時適用於商戶及其分店提供的其他所有優惠、折讓或促銷。 </p>
                    <p className='tc_item'>k) 本現金券條款與細則由商戶提供,在任何情況下均不構成KOC AND U FINTECH LIMITED對商戶產品或服務的說明及保證。 </p>
                    <p className='tc_item'>l) 如有任何爭議，商戶保留一切最終決定權及闡釋權。</p>
                    <div>
                        <p className='tc_item'>
                            m) 使用本現金券時如遇任何問題( 包括商戶拒絕接受現金券或無法於商戶門店使用現金券) ,請與KOC And U 錢包當值客戶經理聯絡或電郵至
                            <span className='text-[#000E88]'>admin@kocnu.com。</span>
                        </p>
                    </div>




                </div>
            </Box>
        </Box>
    );
}
export default TCLogin;
