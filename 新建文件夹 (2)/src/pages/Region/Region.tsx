import React, { useState } from 'react';
import { IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import alter from '../../images/alter.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface Props extends RouteComponentProps { }

function Region(props: Props) {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [present, dismiss] = useIonLoading();
    const [isEmptyEmail, setIsEmptyEmail] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email.trim() === '') {
            setIsEmptyEmail(true);
            return;
        } else {
            setIsEmptyEmail(false);
            setEmail(email.trim());
            if (!isValidEmail(email.trim())) {
                setIsInvalidEmail(true);
                return;
            } else {
                setIsInvalidEmail(false);
                await present({ message: 'loading.....' });
                setTimeout(() => {
                    dismiss();
                    localStorage.setItem('email', email);
                    props.history.push('/login1');
                }, 1500);
            }
        }
    };

    const isValidEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    return (
        <>
            <IonToolbar className="custom-toolbar flex items-center justify-center mt-2">
                <IonTitle className="ion-text-center text-black text-3xl font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                    44 GUM
                </IonTitle>
            </IonToolbar>

            <div className='mt-16'>
                <p className='text-center text-2xl font-bold'>Region</p>
                <div className='pl-14 pr-4 mt-8'>
                    <p>在这里输入你的邮箱地址</p>
                    <form onSubmit={onSubmit} className='mt-3 '>
                        <div className='flex flex-col items-center '>
                            <div className="flex items-center"> {/* 使用 Flex 布局水平放置国旗和输入框 */}
                                <PhoneInput
                                    international
                                    defaultCountry="RU"
                                    value={phoneNumber}
                                    onChange={(value) => setPhoneNumber(value as string)}
                                    className='w-[100%] text-black'// 设置国旗大小
                                />
                                {(isEmptyEmail || isInvalidEmail) && <img src={alter} className="w-6 h-6 ml-3" alt="Warning Icon" />}
                            </div>
                        </div>
                        {isEmptyEmail && <p className="text-red-500 mt-2 text-[11px]">请输入邮箱地址</p>}
                        {isInvalidEmail && <p className="text-red-500 mt-2 text-[11px]">没有找到该邮箱用户，请检查邮箱账号及格式是否正确</p>}

                        {(isEmptyEmail || isInvalidEmail) && <p className="text-[#0047FF80] text-center text-[11px] mt-12 pr-10 underline">忘记了使用哪个邮箱注册的账号？ 需要帮助</p>}
                        <div className='flex flex-col items-center mt-5 h-14 pr-10'>
                            <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] h-[80%] text-white text-lg rounded-full mb-3'>继续</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default withRouter(Region);
