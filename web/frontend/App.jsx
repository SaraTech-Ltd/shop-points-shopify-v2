import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from './store';
import Notification from './components/Notification';
import { AppBridgeProvider, GraphQLProvider, PolarisProvider } from './components';

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager('./pages/**/!(*.test.[jt]sx)*.([jt]sx)');

  return (
    <Provider store={store}>
      <BrowserRouter>
        <PolarisProvider>
          <AppBridgeProvider>
            <GraphQLProvider>
              <Routes pages={pages} />
              <Notification />
            </GraphQLProvider>
          </AppBridgeProvider>
        </PolarisProvider>
      </BrowserRouter>
    </Provider>
  );
}
