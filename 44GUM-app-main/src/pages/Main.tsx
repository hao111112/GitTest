import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect,  useHistory} from 'react-router-dom';
import Home from './Home/Home';
import Wallet from './Wallet/Wallet';
import Cart from './Cart/Cart';
import User from './User/User';
import HomeSelectedIcon from '../images/navbar/Home1.png';
import HomeUnselectedIcon from '../images/navbar/Home0.png';
import WalletSelectedIcon from '../images/navbar/Wallet1.png';
import WalletUnselectedIcon from '../images/navbar/Wallet0.png';
import CartSelectedIcon from '../images/navbar/Card1.png';
import CartUnselectedIcon from '../images/navbar/Card0.png';
import UserSelectedIcon from '../images/navbar/Primary1.png';
import UserUnselectedIcon from '../images/navbar/Primary0.png';

const Main: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string | null>('home');
  const history = useHistory();
  const getIcon = (tab: string) => {
    switch (tab) {
      case 'home':
        return selectedTab === 'home' ? HomeSelectedIcon : HomeUnselectedIcon;
      case 'wallet':
        return selectedTab === 'wallet' ? WalletSelectedIcon : WalletUnselectedIcon;
      case 'cart':
        return selectedTab === 'cart' ? CartSelectedIcon : CartUnselectedIcon;
      case 'user':
        return selectedTab === 'user' ? UserSelectedIcon : UserUnselectedIcon;
      default:
        return '';
    }
  };
  const handleLogout = () => {
    // 执行退出逻辑
    // 清除用户数据等
    console.log('用户退出');
    // 重定向到默认页面
    history.push('/default');
  };

  return (
    <Router>
      <div className="fixed bottom-0 w-full bg-gray-200 p-3 flex justify-between items-center">
        <Link to="/main/home" onClick={() => setSelectedTab('home')} className="focus:outline-none">
          <img src={getIcon('home')} alt="Home" />
        </Link>
        <Link to="/main/wallet" onClick={() => setSelectedTab('wallet')} className="focus:outline-none">
          <img src={getIcon('wallet')} alt="Wallet" />
        </Link>
        <Link to="/main/cart" onClick={() => setSelectedTab('cart')} className="focus:outline-none">
          <img src={getIcon('cart')} alt="Cart" />
        </Link>
        <Link to="/main/user" onClick={() => setSelectedTab('user')} className="focus:outline-none">
          <img src={getIcon('user')} alt="User" />
        </Link>
      </div>

      <Route path="/main/home" component={Home} />
      <Route path="/main/wallet" component={Wallet} />
      <Route path="/main/cart" component={Cart} />
      <Route path="/main/user" ><User onLogout={handleLogout} /></Route>
      {/* <Route path="/main/user" render={() => <User updateSelectedTab={updateSelectedTab} />}/> */}
      {/* <Route exact={true} path="/main"><Redirect to="/main/home" /></Route> */}
      <Redirect exact={true} from="/main" to="/main/home" />
    </Router>
  );
};

export default Main;
