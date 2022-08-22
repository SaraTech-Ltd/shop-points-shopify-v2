import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  Grid,
  Button,
  Tag,
  TextStyle,
  TextField,
  Select,
  Stack,
  ResourceList,
} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { TitleBar } from '@shopify/app-bridge-react';
import styled from 'styled-components';
import { Navbar, TireModal } from '../../components';
import { fetchTiers } from '../../store/actions';

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

const CardHeader = styled.div`
  padding-right: 22px;
  border-bottom: 1px solid var(--p-surface-hovered);
`;

const PageSubHeading = styled.div`
  padding-bottom: 10px;
`;

const TextRright = styled.div`
  width: 100%;
  text-align: right;
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
  const { default: defaultTire, tires, startDate, activityWindow, pickupPeriod } = useSelector((state) => state.tires);

  const {
    refetch: refetchTiers,
    isLoading: isLoadingTiers,
    isRefetching: isRefetchinTiers,
  } = useAppQuery({
    url: '/api/tier/all',
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log('load tiers on tier page', data);
        dispatch(fetchTiers(data));
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
  };

  const updateTireSettings = (key) => (value) => {
    console.log('updateTireSettings: ', key, value);
  };

  const onUpdate = (tire) => () => {
    setSelectedTire({ ...tire });
    setTireModal(!isTireModal);
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
                        <Select
                          options={months}
                          onChange={onStartDateChange('startDate', 'month')}
                          value={startDate.month}
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 3, md: 3, lg: 3, xl: 3 }}>
                        <TextField
                          type="number"
                          value={startDate.year}
                          onChange={onStartDateChange('startDate', 'year')}
                          autoComplete="off"
                        />
                      </Grid.Cell>
                    </Grid>
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
                      <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                        <Select
                          options={monthLists}
                          onChange={updateTireSettings('startDate')}
                          value={activityWindow}
                        />
                      </Grid.Cell>
                    </Grid>
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
                      <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                        <Select
                          options={monthLists}
                          onChange={updateTireSettings('pickupPeriod')}
                          value={pickupPeriod}
                        />
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>
                </Card>

                <Card sectioned title="Default">
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
                </Card>

                <Card sectioned>
                  <CardHeader>
                    <Stack>
                      <Stack.Item fill>
                        <Heading>New Tier</Heading>
                      </Stack.Item>
                      <Stack.Item>
                        <Button primary onClick={onTireModal}>
                          Create
                        </Button>
                      </Stack.Item>
                    </Stack>
                  </CardHeader>

                  <ResourceList
                    resourceName={{ singular: 'update', plural: 'updates' }}
                    items={tires}
                    renderItem={(item) => {
                      const { name, amount, point, campaignPoint = 0 } = item;
                      return (
                        <ResourceList.Item>
                          <Stack distribution="fill">
                            <Stack.Item>
                              <Heading>{name}</Heading>
                            </Stack.Item>
                            <Stack.Item>
                              <TextStyle>
                                ¥{amount} = {point} point
                              </TextStyle>
                            </Stack.Item>
                            <Stack.Item fill>
                              <TextStyle>¥{campaignPoint} Point Rule</TextStyle>
                            </Stack.Item>
                            <Stack.Item>
                              <TextRright>
                                <Button primary onClick={onUpdate(item)}>
                                  Edit
                                </Button>
                              </TextRright>
                            </Stack.Item>
                          </Stack>
                        </ResourceList.Item>
                      );
                    }}
                  />
                </Card>
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
