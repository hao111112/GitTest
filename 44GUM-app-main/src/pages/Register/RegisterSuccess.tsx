

import React from 'react';
import { IonBackButton, IonButtons, IonTitle, IonToolbar} from '@ionic/react';
import {  RouteComponentProps, withRouter } from 'react-router-dom';
import title from '../../images/title.png';

import '../../css/login.css'
interface Props extends RouteComponentProps { }

function RegisterSuccess(props: Props) {
    const email = localStorage.getItem('email') || '';// 从本地存储中获取邮箱数据
    // 将邮箱地址前三个和后四个字符保留，其余字符用*代替
    const maskedEmail = email.replace(/^(.{3}).+(.{4}@.+)/, (match, firstPart, secondPart) => {
        const maskedMiddle = '*'.repeat(email.length - firstPart.length - secondPart.length);
        return firstPart + maskedMiddle + secondPart;
    });
    // 处理按钮点击事件的函数
    const handleClick = () => {
        props.history.push('/default');
    };

    return (
        <>
            <IonToolbar className="custom-toolbar flex mt-2">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/RegisterEamilSecondEnd" />
                </IonButtons>
                <IonTitle className="ion-text-center text-black text-3xl  font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                    44 GUM
                </IonTitle>
            </IonToolbar>

            <div className='mt-10 text-center'>
                <p className='text-[38px] font-[500]'>恭喜&nbsp;!</p>
                <p className='text-[16px] font-[400] mt-10 px-10'>您創建的新賬號能夠正常使用了{maskedEmail}</p>

                <div className='absolute bottom-1/3 w-full h-14 flex justify-center'>
                    <button onClick={handleClick} className='bg-[#FF9292] hover:bg-[#f46c6c] w-[50%] h-[80%] text-white text-lg rounded-full mb-3'>跳转至登录页</button>
                </div>
            </div>
        </>
    );
}

export default withRouter(RegisterSuccess);
