import React from 'react';
import Navigator from './navigator/Navigator';

// import icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faCircle, faLocationDot, faCirclePlus, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart, faUser as farFaUser } from '@fortawesome/free-regular-svg-icons';

// add icons to library
library.add(fab, faHouse, faCircle, faLocationDot, faCirclePlus, faHeart, farFaHeart, faUser, farFaUser);

export default function App() {
  return (
    <Navigator />
  );
}