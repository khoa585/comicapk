// import React from 'react';
// import Home from '../icons/Home';
// import User from '../icons/User';
// import Category from './Category';
// import Follow from './Follow';
// import History from './History';
// export const tabs = [
//     { icon: <Home />, name: 'Home' },
//     // { icon: <Category />, name: 'Search' },
//     { icon: <Follow />, name: 'Bookcase' },
//     // { icon: <History />, name: 'History' },
//     { icon: <User />, name: 'Setting' },
// ];
import React from 'react';
import Home from '../icons/Home';
import User from '../icons/User';
import Category from './Category';
import Follow from './Follow';
import History from './History';
export const iconHome = require('../../assets/image/a7c.png');
export const iconHomeFocus = require('../../assets/image/a7e.png');
export const iconbook = require('../../assets/image/a7f.png');
export const iconbookFocus = require('../../assets/image/a7h.png');
export const iconSetting = require('../../assets/image/a7_.png');
export const iconSettingFocus = require('../../assets/image/a7b.png');
export const tabs = [
    {
        icon: iconHome,
        focus: iconHomeFocus
    },
    {
        icon: iconbook,
        focus: iconbookFocus
    },
    {
        icon: iconSetting,
        focus: iconSettingFocus
    },
];
