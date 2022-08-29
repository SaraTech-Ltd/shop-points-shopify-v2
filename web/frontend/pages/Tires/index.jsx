import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  Grid,
  Button,
  TextStyle,
  TextField,
  Select,
  Spinner,
} from '@shopify/polaris';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { TitleBar } from '@shopify/app-bridge-react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Navbar, TireModal } from '../../components';
import { fetchTiers, addNotification, deleteTire, updateSettings, fetchSettings } from '../../store/actions';
import { useAppQuery, useAppMutation } from '../../hooks';
import TierCard from '../../components/TierCard';

const Wrapper = styled.div`
  .Polaris-Page {
    padding-left: 0;
  }
`;

const FlexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--p-surface-hovered);
  padding: 1rem;
  border-radius: 10px;
`;

const PageSubHeading = styled.div`
  padding-bottom: 10px;
`;

const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'Octobar', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

const monthLists = new Array(12).fill(0).map((i, n) => ({ label: `${++n} month${n > 1 ? 's' : ''}`, value: n }));

export default function TiresPage() {
  const [isTireModal, setTireModal] = useState(false);
  const [selectedTire, setSelectedTire] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const dispatch = useDispatch();
  const [postRequest] = useAppMutation();
  const [updatedSettings, setUpdateSettings] = useState({});

  const {
    tires: { default: defaultTire, tires },
    settings,
  } = useSelector((state) => state);

  const { isLoading: isLoadingTiers } = useAppQuery({
    url: '/api/tier/all',
    reactQueryOptions: {
      onSuccess: (data) => {
        dispatch(fetchTiers(data));
      },
    },
  });

  const { isLoading: loadingSettings } = useAppQuery({
    url: '/api/settings/all',
    reactQueryOptions: {
      onSuccess: (data) => {
        dispatch(fetchSettings(data));
      },
    },
  });

  const onTireModal = () => {
    setTireModal(!isTireModal);
    setSelectedTire(null);
  };

  const onEditDefaultTire = (event) => {
    event.preventDefault();
    setSelectedTire(defaultTire);
    setTireModal(!isTireModal);
  };

  const onStartDateChange = (baseKey, key) => (value) => {
    console.log('base: ', baseKey, key, value);
    const prevSettings = settings[baseKey];
    setUpdateSettings({ [key]: { ...prevSettings, [key]: value } });
    dispatch(updateSettings({ baseKey: { ...prevSettings, [key]: value } }));
  };

  const updateTireSettings = (baseKey, key) => (value) => {
    console.log('updateTireSettings: ', baseKey, key, value);
    const prevSettings = settings[baseKey];
    setUpdateSettings({ [key]: { ...prevSettings, [key]: value } });
    dispatch(updateSettings({ baseKey: { ...prevSettings, [key]: value } }));
  };

  const onUpdate = (tire) => () => {
    setSelectedTire({ ...tire });
    setTireModal(!isTireModal);
  };

  const onDelete = (tire) => async () => {
    setDeleting(tire.id);
    await postRequest(
      { url: `/api/tier/delete/${tire.id}`, method: 'DELETE' },
      {
        onSuccess: async () => {
          dispatch(deleteTire(tire.id));
          setDeleting(null);
          dispatch(addNotification({ message: 'Tire delete successfull!' }));
        },
        onError: async (data, context) => {
          setDeleting(null);
        },
      },
    );
  };

  return (
    <Wrapper>
      <Page fullWidth>
        <TitleBar primaryAction={null} />
        <Grid>
          <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
            <Navbar />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 11, sm: 11, md: 11, lg: 11, xl: 11 }}>
            <Layout fullWidth>
              <Layout.Section>
                <TextContainer>
                  <Heading element="h1">Tires</Heading>
                  <PageSubHeading>
                    <p>
                      Tiers allow you to reward your most loyal customers with different point payout rates. Customize
                      the entry requirements and bonuses for each tier.
                    </p>
                  </PageSubHeading>
                </TextContainer>
                <Card sectioned title="Tier System Settings">
                  <Card.Section>
                    <TextContainer>
                      <p>We will add chart later on!</p>
                    </TextContainer>
                  </Card.Section>
                  <Card.Section>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                        <TextContainer>
                          <Heading>Start Date</Heading>
                          <p>
                            Set the starting month of your tier system. On the 1st of this month your tier system will
                            activate.
                          </p>
                        </TextContainer>
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 3, md: 3, lg: 3, xl: 3 }}>
                        {loadingSettings && <Spinner accessibilityLabel="load-default-settings" size="large" />}
                        {!loadingSettings && (
                          <Select
                            options={months}
                            onChange={onStartDateChange('tiers', 'startMonth')}
                            value={settings?.tiers?.startMonth}
                          />
                        )}
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 3, md: 3, lg: 3, xl: 3 }}>
                        {!loadingSettings && (
                          <TextField
                            type="number"
                            value={settings?.tiers?.startYear}
                            onChange={onStartDateChange('tiers', 'startYear')}
                            autoComplete="off"
                          />
                        )}
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>
                  <Card.Section>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                        <TextContainer>
                          <Heading>Activity Window</Heading>
                          <p>Defines the duration over which order totals are summed for ranking up.</p>
                        </TextContainer>
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                        {loadingSettings && <Spinner accessibilityLabel="load-default-settings" size="large" />}
                        {!loadingSettings && (
                          <Select
                            options={monthLists}
                            onChange={updateTireSettings('tiers', 'activityWindow')}
                            value={settings?.tiers?.activityWindow}
                          />
                        )}
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>

                  <Card.Section>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                        <TextContainer>
                          <Heading>Rank Up Period</Heading>
                          <p>Defines how much time will elapse between checking which tier your customers belong to.</p>
                        </TextContainer>
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                        {loadingSettings && <Spinner accessibilityLabel="load-default-settings" size="large" />}
                        {!loadingSettings && (
                          <Select
                            options={monthLists}
                            onChange={updateTireSettings('tiers', 'period')}
                            value={settings?.tiers?.period}
                          />
                        )}
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>
                </Card>

                <Card sectioned title="Default">
                  {isLoadingTiers && <Spinner accessibilityLabel="load-default-tier" size="large" />}
                  {!isLoadingTiers && (
                    <FlexSpaceBetween>
                      <TextContainer>
                        <Heading>
                          ¥{defaultTire?.amount || 100} = {defaultTire?.point || 1} point
                        </Heading>
                        <TextStyle variation="subdued">
                          This is the default tier. Since all customers must belong in a tier, there are no entry
                          requirements.
                        </TextStyle>
                      </TextContainer>
                      <Button primary onClick={onEditDefaultTire}>
                        Edit
                      </Button>
                    </FlexSpaceBetween>
                  )}
                </Card>

                <TierCard
                  onTireModal={onTireModal}
                  tires={tires}
                  loading={isLoadingTiers}
                  deleting={deleting}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              </Layout.Section>
            </Layout>
          </Grid.Cell>
        </Grid>
      </Page>
      <TireModal
        title={selectedTire ? 'Edit Tier' : 'Add Tier'}
        onClose={onTireModal}
        active={isTireModal}
        tire={selectedTire}
        isEdit={selectedTire !== null}
      />
    </Wrapper>
  );
}
