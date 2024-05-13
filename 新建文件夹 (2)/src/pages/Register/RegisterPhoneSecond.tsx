import React from 'react';
import { IonBackButton, IonButtons, IonItem, IonTitle, IonToolbar } from '@ionic/react';
import { Link, RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import '../../css/register.css';

const RegisterPhoneSecond: React.FC = () => {
    const history = useHistory();
    const userRegisterStr = localStorage.getItem('userRegister');
    const userRegister = userRegisterStr ? JSON.parse(userRegisterStr) : null;
    const phoneNumber = userRegister ? userRegister.phoneNumber : '';

    // 将电话号码拆分为国家代码和号码部分
    const [countryCode, ...rest] = phoneNumber.split(' ');
    const phone = rest.join(' ');

    // 电话号码和选择的国家
    console.log('国家代码:', countryCode);
    console.log('电话号码:', phone);

    //电话号省略
    const maskPhoneNumber = (phone: String) => {
        // 如果电话号码不合法或长度不够，则直接返回
        const cleanedPhoneNumber = phone.replace(/\s/g, '');
        if (!cleanedPhoneNumber || cleanedPhoneNumber.length < 7) {
            return cleanedPhoneNumber;
        }
        // 截取前三位和后三位
        const firstThreeDigits = cleanedPhoneNumber.slice(0, 3);
        const lastThreeDigits = cleanedPhoneNumber.slice(-3);
        // 使用星号替换中间部分
        const middlePart = cleanedPhoneNumber.slice(3, -3).replace(/\d/g, '*');

        // 拼接电话号码并返回
        return `${firstThreeDigits} ${middlePart} ${lastThreeDigits}`;

    };
    const maskedPhoneNumber = maskPhoneNumber(phone);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        history.push('/registerPhoneSecondEnd');
    };
    const handleDefaultClick = () => {
        // 在这里执行您想要的操作，例如显示一个提示、调用函数等等
        alert("链接被点击了");
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

                <div className=' flex flex-col items-center register-second'>
                    <p className='text-center register-second-title font-bold'>開啟二級驗證</p>

                    <div className='flex justify-center register-second-content text-wrap'>
                        <form onSubmit={onSubmit} className='text-[14px]'>
                            <div className='form-register w-full '>
                                <p className='form-register-second-title font-bold'>*檢查你的移動設備是否可用</p>
                                <div className='flex flex-row items-center'>
                                    <IonItem className={`basis-11/12 rounded-xl border-2 flex justify-center  form-register-second-input  h-full w-full text-gray-500`} no-lines lines="none" no-border>
                                        <input type={'text'} className='h-full w-full border-0' placeholder='輸入驗證碼'></input>
                                    </IonItem>
                                </div>
                                <div className='flex text-nowrap form-register-second-phoneitem'>
                                    <p>檢查您的移動設備 </p>
                                    <p>{countryCode} {maskedPhoneNumber}</p>
                                    <p>是否收到來自 X-Fxxx開頭的信件</p>
                                </div>

                            </div>
                            <div className='text-sm text-center form-register-second-warning'>
                                <p onClick={handleDefaultClick} className='underline text-[#0047FF80] hover:text-sky-700 '>沒有收到信件？需要幫助</p>
                            </div>
                            <div className='flex flex-col items-center form-register-second-btn'>
                                <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] flex justify-center items-center w-[70%] h-[80%] text-white rounded-full '>继续</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Box>

        </Box>
    );
}

export default RegisterPhoneSecond;
