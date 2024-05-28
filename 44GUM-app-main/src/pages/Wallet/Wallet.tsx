
import React from 'react';
import profile from '../../images/wallet/profile.png';
const Wallet: React.FC = () => {
    return (
        <div className='bg-blue-300 h-full pt-10 px-5'>
            <div className='bg-gray-300 h-20 rounded-xl flex flex-row '>
                <div className='basis-1/4 flex justify-center'>
                    <img src={profile} className='w-20 h-20 -translate-y-4' alt=''/>
                </div>
                <div className='basis-3/4 flex items-center pl-5'>
                    <p className='text-[#5B8FCB] text-xl'>0.00</p>
                </div>
            </div>
            <div  className='bg-gray-300 h-1/3 rounded-xl flex flex-row mt-10'>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default Wallet;
