import { Frame, Loading } from '@shopify/polaris';

const Loader = ({ load = false }) => {
  if (load === false) return;
  <Frame>
    <Loading />
  </Frame>;
};

export default Loader;
