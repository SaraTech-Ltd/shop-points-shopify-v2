import { Toast, Frame } from '@shopify/polaris';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../store/actions';

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  const toggleActive = (notifcation) => {
    dispatch(removeNotification(notifcation.id));
  };

  if (notifications.length === 0) return null;

  return (
    <Frame>
      {notifications.map((notifiation) => (
        <Toast
          content={notifiation.message}
          error={notifiation.error || false}
          onDismiss={() => toggleActive(notifiation)}
          duration={5500}
        />
      ))}
    </Frame>
  );
};

export default Notification;
