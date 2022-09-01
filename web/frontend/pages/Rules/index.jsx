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
  ButtonGroup,
  Stack,
  ResourceList,
} from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import styled from 'styled-components';
import { Navbar, TireModal } from '../../components';
import { updateTireSettings, fetchTiers, addNotification, deleteTire } from '../../store/actions';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppQuery } from '../../hooks';
import { useEffect } from 'react';
import SaveBar from '../../components/SaveBar';
import { isEmpty, isEqual } from 'lodash';
import { useAppMutation } from '../../hooks';
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
const TextRright = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export default function RulesPage() {
  const [isTireModal, setTireModal] = useState(false);
  const [selectedTire, setSelectedTire] = useState(null);

  const [isTouched, setTouched] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [postRequest] = useAppMutation();

  const [isDirty, setDirty] = useState(false);
  const { default: defaultTire, tires, rules } = useSelector((state) => state.tires);

  const dispatch = useDispatch();

  const {
    data: rulesData,
    refetch: refetchRules,
    isLoading: isLoadingRules,
    isRefetching: isRefetchingRules,
  } = useAppQuery({
    url: '/api/rules/all',
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log('loaded', data);
        dispatch(updateTireSettings({ ...data.rules }));
      },
    },
  });

  const {
    refetch: refetchTiers,
    isLoading: isLoadingTiers,
    isRefetching: isRefetchinTiers,
  } = useAppQuery({
    url: '/api/tier/all',
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log('load tiers', data);
        dispatch(fetchTiers(data));
      },
    },
  });

  useEffect(() => {
    if (isTouched) {
      if (!isEqual(rules, rulesData.rules)) {
        setDirty(true);
      } else {
        setDirty(false);
      }
    }
  }, [rules, isTouched]);

  const onChangeRulesSettings = (key) => (value) => {
    if (isEmpty(value)) return;
    dispatch(updateTireSettings({ [key]: Number(value) }));
    setTouched(true);
  };

  const onTireModal = (message) => {
    setTireModal(!isTireModal);
    setSelectedTire(null);
  };

  const onEditDefaultTire = () => {
    setSelectedTire({ ...defaultTire });
    setTireModal(!isTireModal);
  };

  const onUpdate = (tire) => () => {
    setSelectedTire({ ...tire });
    setTireModal(!isTireModal);
  };

  const onDelete = (tire) => async () => {
    setDeleting(true);
    await postRequest(
      { url: `/api/tier/delete/${tire.id}`, method: 'DELETE' },
      {
        onSuccess: async () => {
          dispatch(deleteTire(tire.id));
          setDeleting(false);
          dispatch(addNotification({ message: 'Tire delete successfull!' }));
        },
        onError: async (data, context) => {
          setDeleting(false);
        },
      },
    );
  };

  const onSave = async () => {
    // porform server side action
    setFetching(true);
    await postRequest(
      { url: '/api/rules/update', data: { ...rules } },
      {
        onSuccess: async () => {
          setFetching(false);
          setDirty(false);
          setTouched(false);
          await refetchRules();
        },
        onError: async (data, context) => {
          setFetching(false);
        },
      },
    );
  };

  const onDiscard = () => {
    setDirty(false);
    setTouched(false);
    dispatch(updateTireSettings({ ...data.rules }));
  };

  const { expireMonth, fulfillmentDelay, redemptionAmount, redemptionPoint } = rules;
  console.log('tires: ', tires);
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
                  <Heading element="h1">Rules</Heading>
                  <PageSubHeading>
                    <p>Define the settings for how points are earned and maintained.</p>
                  </PageSubHeading>
                </TextContainer>
                <Card sectioned title="Redemption">
                  <FlexSpaceBetween>
                    <TextContainer>
                      Customers can discount <Tag>¥{redemptionAmount}</Tag> for every
                      <TextStyle styled={'strong'}> {redemptionPoint} point</TextStyle> redeemed.
                    </TextContainer>
                  </FlexSpaceBetween>
                </Card>
                <Card sectioned title="Fulfillment Delay">
                  <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                      <TextContainer>
                        <p>
                          Define the duration of the delay between the fulfillment of the order and the allocation of
                          the points.
                        </p>
                      </TextContainer>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                      <TextField
                        type="number"
                        value={fulfillmentDelay}
                        onChange={onChangeRulesSettings('fulfillmentDelay')}
                        suffix={'days'}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                  </Grid>
                </Card>

                <Card sectioned title="Expiration">
                  <Grid>
                    <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                      <TextContainer>
                        <p>
                          Define the duration of the delay between the last time a customer earned points and the
                          expiration of their points.
                        </p>
                        <TextStyle variation="subdued">
                          This setting can be left blank to prevent points from expiring.
                        </TextStyle>
                      </TextContainer>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
                      <TextField
                        type="number"
                        value={expireMonth}
                        onChange={onChangeRulesSettings('expireMonth')}
                        suffix={'months'}
                        autoComplete="off"
                      />
                    </Grid.Cell>
                  </Grid>
                </Card>

                <TextContainer>
                  <Heading element="h1">Tiers</Heading>
                  <PageSubHeading>
                    <TextStyle variation="subdued">
                      Define the settings for how points are earned and maintained.
                    </TextStyle>
                  </PageSubHeading>
                </TextContainer>

                <Card sectioned title="Default">
                  <FlexSpaceBetween>
                    <TextContainer>
                      <Heading>
                        ¥{defaultTire?.amount || 1} = {defaultTire?.point || 1} point
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

                <TierCard
                  onTireModal={onTireModal}
                  tires={tires}
                  loading={isLoadingTiers}
                  deleting={deleting}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
                {isDirty && <SaveBar onSaveAction={onSave} onDiscardAction={onDiscard} loading={fetching} />}
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
