import React from 'react';
import Navigator from './src/navigator/Navigator';

// import icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

// add icons to library
library.add(fab, faCircle);

import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}