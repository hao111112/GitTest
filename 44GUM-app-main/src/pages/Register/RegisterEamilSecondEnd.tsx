
import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButtons, IonTitle, IonToolbar} from '@ionic/react';
import {  RouteComponentProps, withRouter } from 'react-router-dom';
import title from '../../images/title.png';

import union from '../../images/Union.png';

import '../../css/login.css'
interface Props extends RouteComponentProps { }
//注册成功后将local数据清除，
function RegisterEamilSecondEnd(props: Props) {
    // const email = localStorage.getItem('email') || '';// 从本地存储中获取邮箱数据
    // 将邮箱地址前三个和后四个字符保留，其余字符用*代替
    // const maskedEmail = email.replace(/^(.{3}).+(.{4}@.+)/, (match, firstPart, secondPart) => {
    //     const maskedMiddle = '*'.repeat(email.length - firstPart.length - secondPart.length);
    //     return firstPart + maskedMiddle + secondPart;
    // });
    // 处理按钮点击事件的函数
    const [second,setSecond] =useState(true);
    const handleClick = () => {
        setSecond(true);//加入数据库，是否要二级验证
        localStorage.clear(); // 清除所有存储的数据
        props.history.push('/registerSuccess');
    };
    const handleNoClick = () => {
        setSecond(false);
        localStorage.clear(); // 清除所有存储的数据
        props.history.push('/registerSuccess');
    };
    // 使用useEffect监听second的变化
    useEffect(() => {
        console.log(second);
    }, [second]);

    return (
        <>
            <IonToolbar className="custom-toolbar flex mt-2">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/registerEamilSecondPhone" />
                </IonButtons>
                <IonTitle className="ion-text-center text-black text-3xl  font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo"/>
                    44 GUM
                </IonTitle>
            </IonToolbar>

            <div className='mt-10'>
                <p className='text-center text-2xl font-bold'>最後一步</p>
                <div className='text-center mt-8 px-10'>
                    <p className='form-signup-title mt-5'></p>
                    <p className='text-left mt-5'>是否開啟二級驗證</p>
                    <div className='mt-[10%] mb-[10%] text-sm flex flex-row h-28'>
                        <div className='basis-4/6  text-left endtitle'>
                            <p>開啟二級驗證將會啟動雙層保護，在異地登錄您的賬戶需要驗證您的安全信息</p>
                        </div>
                        <div className='basis-2/6  flex justify-end items-end'>
                            <img src={union} className='w-20 h-20' alt=""/>
                        </div>
                    </div>

                    <div className='flex flex-col items-center mt-5 h-14'>
                        <button onClick={handleClick} className='bg-[#FF9292] hover:bg-[#f46c6c] w-[60%] h-[80%] text-white text-lg rounded-full mb-3'>继续</button> 
                    </div>
                    <div className='flex flex-col items-center mt-1 h-14'>
                        <button onClick={handleNoClick} className='bg-gray-400 hover:bg-gray-700 w-[60%] h-[80%] text-white text-lg rounded-full mb-3'>暂时不用</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default withRouter(RegisterEamilSecondEnd);
