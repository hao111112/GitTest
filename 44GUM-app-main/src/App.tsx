// src/App.tsx
import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Default from './pages/Default';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import Main from './pages/Main';
import Login from './pages/Login/Login';
import Login1 from './pages/Login/Login1';
import RegisterEmail from './pages/Register/RegisterEmail';
import Region from './pages/Region/Region';
import RegisterEmail1 from './pages/Register/RegisterEmail1';
import Logo from './pages/Logo';
import Transitions from './pages/Transitions';
import RegisterEamilSecond from './pages/Register/RegisterEamilSecond';
import RegisterEamilSecondPhone from './pages/Register/RegisterEamilSecondPhone';
import RegisterEamilSecondEnd from './pages/Register/RegisterEamilSecondEnd';
import RegisterSuccess from './pages/Register/RegisterSuccess';



setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <BrowserRouter>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/default" exact={true} component={Default} />
            <Route path="/home" exact={true} component={Home} />
            <Route path="/about" exact={true} component={About} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/login1" exact={true} component={Login1} />
            <Route path="/main" exact={true} component={Main} />
            <Route path="/registerEmail" exact={true} component={RegisterEmail} />
            <Route path="/registerEmail1" exact={true} component={RegisterEmail1} />
            <Route path="/registerEamilSecond" exact={true} component={RegisterEamilSecond} />
            <Route path="/registerEamilSecondPhone" exact={true} component={RegisterEamilSecondPhone} />
            <Route path="/registerEamilSecondEnd" exact={true} component={RegisterEamilSecondEnd} />
            <Route path="/registerSuccess" exact={true} component={RegisterSuccess} />
            <Route path="/region" exact={true} component={Region} />
            <Route path="/logo" exact={true} component={Logo} />
            <Route path="/transitions" exact={true} component={Transitions} />
            <Redirect exact={true} from="/" to="/default" />
          </IonRouterOutlet>
        </IonReactRouter>
      </BrowserRouter>
    </IonApp>
  )
};




export default App;
