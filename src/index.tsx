import { createRoot } from 'react-dom/client';
import App from './App';
import Providers from './providers';

import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './i18n/config';
import 'swiper/css';
import './index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <Providers>
    <App />
  </Providers>,
);
