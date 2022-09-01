import { Modal, FormLayout, TextField, Heading, TextStyle, Grid, TextContainer } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import { getHours, format, addDays } from 'date-fns';
import _, { isEqual } from 'lodash';
import { useDispatch } from 'react-redux';
import { campaignFormValidate } from '../../utils/validate';
import { addNotification, addTire, updateTire } from '../../store/actions';
import { useAppMutation } from '../../hooks';
import styled from 'styled-components';

const FieldGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getDateFormat = (date) => ({
  hours: format(date, 'HH'),
  period: format(date, 'A'),
  dateFormat: format(date, 'yyyy/MM/dd'),
});

const CampaignModal = ({
  onClose,
  active,
  title,
  campaign = {},
  rules = { redemptionAmount: 100 },
  isEdit = false,
}) => {
  const dispatch = useDispatch();

  const startAt = new Date();
  const endAt = addDays(startAt, 1);

  const newCampaign = {
    name: '',
    startAt,
    endAt,
    startDate: getDateFormat(startAt),
    endDate: getDateFormat(startAt),
    point: 0,
  };

  const [values, setValue] = useState({ ...newCampaign });
  const [errors, setError] = useState({});
  const [saving, setSaving] = useState(false);
  const [isDirty, setDirty] = useState(false);
  const [apiRequest] = useAppMutation();

  useEffect(() => {
    if (isEdit === true) {
      setValue({ ...campaign });
    } else {
      setValue({ ...newCampaign });
    }
  }, [isEdit]);

  const handleCancel = useCallback(() => {
    onClose();
  }, [active]);

  const onUpdate = () => {
    apiRequest(
      { url: `/api/campaign/update/${campaign.id}`, data: values, method: 'PUT' },
      {
        onSuccess: async (data) => {
          console.log('campaign update: ', data);
          dispatch(updateTire(values));
          dispatch(addNotification({ message: 'Campaign update successfull!' }));
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

  const onCreate = () => {
    apiRequest(
      { url: `/api/campaign/create`, data: values },
      {
        onSuccess: async ({ data }) => {
          console.log('created: ', data);
          dispatch(addTire(data.data));
          dispatch(addNotification({ message: 'Campaign create successfull!' }));
          setSaving(false);
          onClose();
        },
        onError: async (data, context) => {
          console.log('campaign create error: ', data, context);
          setSaving(false);
        },
      },
    );
  };

  const handleSave = useCallback(() => {
    const _errors = campaignFormValidate(values);
    if (!_.isEmpty(_errors)) {
      setError(_errors);
    } else {
      setSaving(true);
      if (isEdit === true && isDirty) {
        onUpdate();
      } else {
        onCreate();
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

  const handleDateChange = (baseKey, key) => (value) => {
    const nextValue = { ...values, [baseKey]: { ...values[baseKey], [key]: value } };
    setValue(nextValue);
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
            label="Campaign Name"
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
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>Calendar</Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
              <Stack spacing="loose" vertical>
                <Stack.Item>
                  <FieldGrid>
                    <TextField
                      label="Start at"
                      name="dateFormat"
                      value={values?.startDate.dateFormat || 0}
                      selectTextOnFocus
                      onChange={handleDateChange('startDate', 'dateFormat')}
                      autoComplete="off"
                    />
                  </FieldGrid>
                </Stack.Item>
                <Stack.Item>
                  <Button>Uninstall</Button>
                </Stack.Item>
              </Stack>
            </Grid.Cell>
          </Grid>
        </FormLayout>
      </Modal.Section>
      <Modal.Section>
        <FormLayout>
          <Heading>Point Rules</Heading>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
              <TextContainer>
                <p>Default</p>
              </TextContainer>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
              <TextField
                label=""
                type="number"
                name="point"
                error={errors?.point}
                value={values?.point || 0}
                selectTextOnFocus
                onChange={handleFormChange('point')}
                prefix={rules.redemptionAmount + '$'}
                autoComplete="off"
              />
            </Grid.Cell>
          </Grid>
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default CampaignModal;
