import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import '../../css/update.css'; // 导入自定义样式文件
import { useHistory } from 'react-router-dom';

const Update: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();
    const userStr = localStorage.getItem('user');
    
    const user = userStr ? JSON.parse(userStr) : null;
    const userName = user ? user.name : '';
    const oldGender = user ? user.gender : '';
    // 拆分用户名为姓氏和名字
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');

    // 性别选项
    const [gender, setGender] = useState(oldGender); // 默认为男性

    //表单提交事件
    const handleSaveClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // 阻止表单默认提交行为
        const formData = new FormData(event.currentTarget); // 获取表单数据
        formData.append('gender', gender); // 将性别数据添加到 FormData 中
        const newLastName = formData.get('lastName') as string; // 获取新的姓氏
        const newFirstName = formData.get('firstName') as string; // 获取新的名字
        const newUserName = `${newFirstName} ${newLastName}`; // 拼接新的用户名

        if (userStr) {
            const updatedUser = { ...user, name: newUserName, gender: gender };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            console.log(updatedUser); // 打印更新后的用户信息
        }
        const formDataObject: any = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        // console.log(formDataObject); // 打印表单数据
        alert('更新成功');
        history.push('/main/user');
        // 进行其他操作，比如提交数据到后端等

    };
    useEffect(() => {
        const nameParts = userName.split(' ');
        setLastName(nameParts[nameParts.length - 1]);
        setFirstName(nameParts.slice(0, -1).join(' '));
    }, [userName]);

    //返回按钮
    const handleBackClick = () => {
        history.push('/main/user');
    };

    // 组件挂载时隐藏底部导航栏
    useEffect(() => {
        setShowNavbar(false);
        // 组件卸载时重新显示底部导航栏
        return () => {
            setShowNavbar(true);
        };
    }, []);

    // 点击性别按钮事件处理函数
    const handleGenderClick = (selectedGender: string, event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // 阻止按钮的默认行为
        setGender(selectedGender);
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
                        <ArrowBackIosOutlinedIcon className='text-gray-400' style={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <div className='text-black text-[1.4rem]'>更新賬戶資料</div>
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
                <div>
                    <p className='text-[#000E88] update_content update_title'>個人資料</p>
                    <form className='mt-3 ' onSubmit={handleSaveClick}>
                        <div className='update_content '>
                            <p className='updateInfo_title'>姓氏</p>
                            <div className='updateInfo_input border-gray-300 flex items-center ' >
                                <input type='text' placeholder='姓氏' name='lastName' defaultValue={lastName}></input >
                            </div>
                        </div>
                        <div className='update_content'>
                            <p className='updateInfo_title'>名字</p>
                            <div className='updateInfo_input border-gray-300 flex items-center '>
                                <input type='text' placeholder='名字' name='firstName' defaultValue={firstName}></input >
                            </div>
                        </div>
                        <div className='update_content '>
                            <p className='updateInfo_title'>性别</p>
                            <div className='flex justify-between'>
                                <button
                                    className={`gender-button ${gender === '男' ? 'selected' : ''}`}
                                    onClick={(e) => handleGenderClick('男', e)}
                                >
                                    男
                                </button>
                                <button
                                    className={`gender-button ${gender === '女' ? 'selected' : ''}`}
                                    onClick={(e) => handleGenderClick('女', e)}
                                >
                                    女
                                </button>
                            </div>
                        </div>


                        <div className='flex flex-col items-center w-full update_save_btns  fixed bottom-0'>
                            <button type="submit" className='bg-[#CD5151] update_save_btn text-white text-xl rounded-[13px] mb-3'>儲存</button>
                        </div>
                    </form>
                </div>
            </Box>
        </Box>
    );
}
export default Update;
