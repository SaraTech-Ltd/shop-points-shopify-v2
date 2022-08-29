import { Modal, FormLayout, TextField, Heading, TextStyle, Grid, TextContainer } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import _, { isEqual } from 'lodash';
import { useDispatch } from 'react-redux';
import { tireFormValidate } from '../../utils/validate';
import { addNotification, addTire, updateTire } from '../../store/actions';
import { useAppMutation } from '../../hooks';

const newTire = { name: '', amount: 0, point: 0, campaignPoint: 0 };

const TireModal = ({ onClose, active, title, tire = {}, isEdit = false }) => {
  const dispatch = useDispatch();

  const [values, setValue] = useState({ ...newTire });
  const [errors, setError] = useState({});
  const [saving, setSaving] = useState(false);
  const [isDirty, setDirty] = useState(false);
  const [apiRequest] = useAppMutation();

  useEffect(() => {
    if (isEdit === true) {
      setValue({ ...tire });
    } else {
      setValue({ ...newTire });
    }
  }, [isEdit]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [active]);

  const onUpdateTire = () => {
    apiRequest(
      { url: `/api/tier/update/${tire.id}`, data: values, method: 'PUT' },
      {
        onSuccess: async (data) => {
          console.log('update: ', data);
          dispatch(updateTire(values));
          dispatch(addNotification({ message: 'Tier update successfull!' }));
          setSaving(false);
          setDirty(false);
          onClose();
        },
        onError: async (data, context) => {
          console.log('error: ', data, context);
          setSaving(false);
        },
      },
    );
  };

  const onCreateTire = () => {
    apiRequest(
      { url: `/api/tier/create`, data: values },
      {
        onSuccess: async ({ data }) => {
          console.log('created: ', data);
          dispatch(addTire(data.data));
          dispatch(addNotification({ message: 'Tier create successfull!' }));
          setSaving(false);
          onClose();
        },
        onError: async (data, context) => {
          console.log('tire create error: ', data, context);
          setSaving(false);
        },
      },
    );
  };

  const handleSave = useCallback(() => {
    const _errors = tireFormValidate(values);
    if (!_.isEmpty(_errors)) {
      setError(_errors);
    } else {
      setSaving(true);
      if (isEdit === true && isDirty) {
        onUpdateTire();
      } else {
        onCreateTire();
      }
    }
  });

  const handleFormChange = (name) => (value) => {
    const nextValue = { ...values, [name]: name === 'name' ? value : Number(value) };
    if (isEdit) {
      if (isEqual(tire, nextValue)) {
        setDirty(false);
      } else {
        setDirty(true);
      }
    }
    setValue(nextValue);
    if (errors[name]) {
      let _errors = { ...errors };
      delete _errors[name];
      setError(_errors);
    }
  };
  return (
    <Modal
      open={active}
      onClose={handleCancel}
      title={title}
      loading={saving}
      primaryAction={{
        content: 'Submit',
        onAction: handleSave,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleCancel,
        },
      ]}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Tire Name"
            type="text"
            name="name"
            error={errors?.name}
            value={values.name}
            selectTextOnFocus
            onChange={handleFormChange('name')}
            autoComplete="off"
          />
        </FormLayout>
      </Modal.Section>
      <Modal.Section>
        <FormLayout>
          <Heading>Point Rule</Heading>
          <FormLayout.Group>
            <TextField
              label="Currency Amount"
              type="number"
              name="amount"
              error={errors?.amount}
              value={values.amount}
              selectTextOnFocus
              onChange={handleFormChange('amount')}
              prefix="$"
              autoComplete="off"
            />
            <TextField
              label="Point Value"
              type="number"
              name="point"
              error={errors?.point}
              value={values.point}
              selectTextOnFocus
              onChange={handleFormChange('point')}
              autoComplete="off"
            />
          </FormLayout.Group>
          <TextStyle>
            Currency amount is the same for all point rules: tiers, point campaigns, and bonus points collections.
            Updating the currency amount will update all point rules.
          </TextStyle>
        </FormLayout>
      </Modal.Section>
      <Modal.Section>
        <FormLayout>
          <Heading>Campaign Settings</Heading>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
              <TextContainer>
                <p>Default point rule for this tier during campaigns.</p>
              </TextContainer>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
              <TextField
                label="Point Rule"
                type="number"
                name="campaignPoint"
                error={errors?.campaignPoint}
                value={values?.campaignPoint || 0}
                selectTextOnFocus
                onChange={handleFormChange('campaignPoint')}
                prefix={values.amount + '$'}
                autoComplete="off"
              />
            </Grid.Cell>
          </Grid>
          <TextStyle>
            Currency amount is the same for all point rules: tiers, point campaigns, and bonus points collections.
            Updating the currency amount will update all point rules.
          </TextStyle>
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default TireModal;
