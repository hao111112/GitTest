import React, {  useState } from 'react';

interface UserProps {
    onLogout: () => void;
  }

const User: React.FC <UserProps> = ({ onLogout }) => {
    // const history = useHistory();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = () => {
       
        setShowConfirmation(true);
    };

    const confirmLogout = () => {
        setShowConfirmation(false); // 首先关闭退出确认对话框
        // 延迟一段时间后执行页面跳转
        console.log("handleLogout!!!!!")
        //清除用户数据
        localStorage.clear(); // 清除所有存储的数据
        onLogout();
        // history.push('/default');
        // history.replace('/default');


    };

    const cancelLogout = () => {
        setShowConfirmation(false);

    };


    return (
        <div className='bg-red-300 h-full'>
            <h2 className="text-pink-200 text-center">User</h2>
            <div className="flex justify-center mt-4">
                <button onClick={handleLogout} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    退出登录
                </button>
            </div>
            {showConfirmation && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-lg text-gray-800 mb-4">确定要退出登录吗？</p>
                        <div className="flex justify-between">
                            <button onClick={confirmLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                确定
                            </button>
                            <button onClick={cancelLogout} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
