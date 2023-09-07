import React from 'react';
import Navigator from './navigator/Navigator';

// import icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons';

// add icons to library
library.add(fab, faCircle);

export default function App() {

  return (
    <Navigator />
  );
}