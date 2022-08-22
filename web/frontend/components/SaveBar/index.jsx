import { Frame, ContextualSaveBar } from '@shopify/polaris';

const SaveBar = ({ message = 'Unsaved changes', onSaveAction, onDiscardAction, loading }) => {
  return (
    <Frame>
      <ContextualSaveBar
        alignContentFlush
        message={message}
        saveAction={{
          loading: loading,
          onAction: onSaveAction,
        }}
        discardAction={{
          onAction: onDiscardAction,
        }}
      />
    </Frame>
  );
};

export default SaveBar;
