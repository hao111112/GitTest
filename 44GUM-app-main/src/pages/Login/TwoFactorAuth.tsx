import React, { useEffect, useRef, useState } from 'react';
import union from '../../images/Union1.png';
import loading from '../../images/loading.gif';



interface Props {
    onVerificationSuccess: (event: any) => void;
}
const TwoFactorAuth: React.FC<Props> = ({ onVerificationSuccess }) => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const phoneNumber = localStorage.getItem('phoneNumber') || ''; // 从本地存储中获取邮箱数据
    const maskedphoneNumber = phoneNumber.replace(/^(.{3}).+(.{3})$/, (match, firstPart, lastPart) => {
        const middlePart = '*'.repeat(phoneNumber.length - 6); // 除去前三位和后三位的长度
        return firstPart + middlePart + lastPart;
    });
    const [isLoading, setIsLoading] = useState(false); // 控制加载动画显示与隐藏
    const [isAlertShown, setIsAlertShown] = useState(false);//是否已经弹出了警告框

    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array.from({ length: 4 }, () => null)); // 存储输入框的引用。
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);//存储定时器的 ID，

    const focusNextInput = (index: number) => {
        if (inputRefs.current[index]!) {
            inputRefs.current[index]!.focus();
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        setVerificationCode(prevCode => {
            const newCode = [...prevCode];
            newCode[index] = value;
            return newCode;
        });
        if (value && index === 3) {
            handleLastCodeChange(value);
        }
        else if (value && index < 3) {
            focusNextInput(index + 1);
        }
    };

    const handleLastCodeChange = (value: string) => {
        const currentCode = inputRefs.current.map(input => input?.value || ''); // 获取当前输入框的值
        setIsLoading(true); // 提交表单时显示加载动画
        if (value && verificationCode.every(code => code !== '')) { // 检查所有输入框是否都有值
            if (timerId) {
                clearTimeout(timerId); // 清除之前的定时器
            }
            if (currentCode.join('') === '1234') { // 请替换为您的实际验证逻辑
                setIsLoading(false); // 加载完成后隐藏加载动画
                onVerificationSuccess(currentCode); // 调用成功回调函数，执行页面跳转等操作
            } else {
                setIsLoading(false); // 加载完成后隐藏加载动画
                if (!isAlertShown) { // 检查是否已经弹出了警告框
                    setIsAlertShown(true); // 设置警告框状态为已弹出
                    alert('验证失败，请重试'+currentCode.join('')); // 提示验证失败
                }

                setVerificationCode(['', '', '', '']); // 重置输入框的数据
                focusNextInput(0); // 把 focus 放回第一个输入框

            }
        }
    };
    // 在警告框关闭时将 isAlertShown 设置为 false
    const handleAlertClose = () => {
        setIsAlertShown(false);
    };

    // 警告框关闭后调用 handleAlertClose 函数
    if (isAlertShown) {
        handleAlertClose();
    }

    useEffect(() => {
        const handleInputChange = (index: number) => (e: Event) => {
            handleCodeChange(index, (e.target as HTMLInputElement).value);
        };

        const handleLastInputChange = () => (e: Event) => {
            handleLastCodeChange((e.target as HTMLInputElement).value);
        };
        // eslint-disable-next-line
        inputRefs.current.forEach((input, index) => {
            if (input) {
                if (index <= 3) {
                    input.addEventListener('input', handleInputChange(index));
                } else {
                    input.addEventListener('input', handleLastInputChange());
                }
            }
        });

        return () => {
            // eslint-disable-next-line
            inputRefs.current.forEach((input, index) => {
                if (input) {
                    if (index <= 3) {
                        input.removeEventListener('input', handleInputChange(index));
                    } else {
                        input.removeEventListener('input', handleLastInputChange());
                    }
                }
            });
            if (timerId) {
                clearTimeout(timerId);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    return (
        <div className='text-white py-10 '>
            <div className='flex px-6 items-center justify-center'>
                <img src={union} className='w-10 h-10 absolute left-5' alt="" />
                <p className='text-center text-2xl font-bold'>二級驗證</p>
            </div>
            <div className='text-center mt-8 px-11 flex'>
                <div>
                    <p className='text-left mt-5'>賬號似乎開啟了二級驗證...</p>
                    <div className='flex text-[10px] mt-2 twophoneitem'>
                        <p>檢查您的移動設備 </p>
                        <p>+65 {maskedphoneNumber} </p>
                        <p>是否收到來自 X-Fxxx開頭的信件</p>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-4 ml-5'>
                    {isLoading && <img src={loading} className='w-8 h-8' alt="Loading Indicator" />} {/* 加载动画 */}
                </div>
            </div>
            <div className='text-center'>
                <p className='mt-5 text-sm'>輸入驗證碼</p>
                <div className="flex justify-center text-black mt-3">
                    {verificationCode.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            value={value}
                            maxLength={1}
                            className="w-10 h-10 border border-gray-300 text-xl rounded text-center mr-2"
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            ref={el => inputRefs.current[index] = el}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TwoFactorAuth;
