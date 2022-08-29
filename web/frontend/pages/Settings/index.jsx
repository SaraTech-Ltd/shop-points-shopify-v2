import {
  Card,
  Page,
  Layout,
  TextContainer,
  Heading,
  Grid,
  TextStyle,
  Select,
  Banner,
  Stack,
  Button,
  ButtonGroup,
} from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import styled from 'styled-components';
import { Navbar, Switch } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, addNotification } from '../../store/actions';
import { useAppQuery, useAppMutation } from '../../hooks';
import { useEffect, useState } from 'react';
import { isEmpty, isEqual } from 'lodash';

const Wrapper = styled.div`
  .Polaris-Page {
    padding-left: 0;
  }
`;

const PageSubHeading = styled.div`
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function SettingsPage() {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [isTouched, setTouched] = useState(false);
  const [isDirty, setDirty] = useState(false);
  const [isUpdating, setUpdateState] = useState(false);
  const [postRequest] = useAppMutation();

  const OnUpdateSettings = (baseKey, key) => (value) => {
    setTouched(true);
    const prevSettings = settings[baseKey];
    dispatch(updateSettings({ key: baseKey, value: { ...prevSettings, [key]: value } }));
  };

  const {
    data: _settings,
    isLoading: loadingSettings,
    refetch: refetchSettings,
  } = useAppQuery({
    url: '/api/settings/all',
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log('setting loaded', data);
        dispatch(updateSettings(data));
      },
    },
  });

  useEffect(() => {
    if (isTouched) {
      if (!isEqual(settings, _settings)) {
        setDirty(true);
      } else {
        setDirty(false);
      }
    }
  }, [isTouched, settings]);

  const onSave = () => {
    const changes = {};
    Object.keys(settings).forEach((key) => {
      if (!isEqual(settings[key], _settings[key])) {
        // found changes
        console.log('settings:', settings[key], _settings[key]);
        changes[key] = settings[key];
      }
    });
    console.log('found changes', changes);
    if (!isEmpty(changes)) {
      onUpdate(changes);
    } else {
      setDirty(false);
      setTouched(false);
    }
  };

  const onUpdate = async (data) => {
    setUpdateState(true);
    await postRequest(
      { url: `/api/settings/update`, data: { settings: JSON.stringify(data) } },
      {
        onSuccess: async () => {
          setDirty(false);
          setTouched(false);
          setUpdateState(false);
          dispatch(addNotification({ message: 'Settings update successfull!' }));
          await refetchSettings();
        },
        onError: async (data, context) => {
          setUpdateState(false);
        },
      },
    );
  };

  const options = [
    { label: 'English', value: 'en' },
    { label: 'Japanies', value: 'jp' },
  ];

  console.log('default: ', settings);
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
                <PageSubHeading>
                  <Heading element="h1">Settings</Heading>
                  {isDirty && (
                    <ButtonGroup>
                      <Button>Cancel</Button>
                      <Button primary onClick={onSave} loading={isUpdating}>
                        Save
                      </Button>
                    </ButtonGroup>
                  )}
                </PageSubHeading>
                <Card title="App Settings">
                  <Card.Section>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
                        <Switch
                          value={settings.app_settings.pointSystem}
                          onChange={OnUpdateSettings('app_settings', 'pointSystem')}
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 11, sm: 11, md: 11, lg: 11, xl: 11 }}>
                        <TextContainer>
                          <Heading>Point System</Heading>
                          <TextStyle>This setting is disabled. Customer will not earn points via orders.</TextStyle>
                        </TextContainer>
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>

                  <Card.Section>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
                        <Switch
                          value={settings.app_settings.pointSystemDisplay}
                          onChange={OnUpdateSettings('app_settings', 'pointSystemDisplay')}
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 11, sm: 11, md: 11, lg: 11, xl: 11 }}>
                        <TextContainer>
                          <Heading>Point System Display</Heading>
                          <TextStyle>
                            This setting is disabled. Customers can earn points but cannot see and redeem points.
                          </TextStyle>
                        </TextContainer>
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>
                </Card>

                <Card title="Widget Settings">
                  <Card.Section>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
                        <Switch
                          value={settings.widget_settings.enable}
                          onChange={OnUpdateSettings('widget_settings', 'enable')}
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 11, sm: 11, md: 11, lg: 11, xl: 11 }}>
                        <TextContainer>
                          <Heading>Widget</Heading>
                          <TextStyle>This setting is enabled. Widget will be displayed everywhere.</TextStyle>
                        </TextContainer>
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>

                  <Card.Section>
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
                        <Select
                          label="Language"
                          options={options}
                          onChange={OnUpdateSettings('widget_settings', 'lang')}
                          value={settings.widget_settings.lang}
                        />
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>
                </Card>

                <Card title="Order Settings">
                  <Card.Section>
                    <Heading element="h3"> Point of Sale Orders </Heading>
                    <Banner>
                      <p>This feature is not available for your plan. Upgrade your plan here.</p>
                    </Banner>
                  </Card.Section>

                  <Card.Section>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
                        <Switch
                          value={settings.order_settings.draftOrder}
                          onChange={OnUpdateSettings('order_settings', 'draftOrder')}
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 11, sm: 11, md: 11, lg: 11, xl: 11 }}>
                        <TextContainer>
                          <Heading element="h3">Draft Orders</Heading>
                          <TextStyle>This setting is enabled. EasyPoints will process draft orders.</TextStyle>
                        </TextContainer>
                      </Grid.Cell>
                    </Grid>
                  </Card.Section>
                </Card>

                <Card title="Uninstall Assets">
                  <Card.Section>
                    <Stack spacing="loose" vertical>
                      <p>
                        Delete all the assets or code blocks within your themes that were inserted during the EasyPoints
                        installation and integration.
                      </p>
                      <Banner status="warning">
                        <p>
                          Please note that this should only be used if you're planning on uninstalling the EasyPoints
                          application as a whole.
                        </p>
                      </Banner>
                      <Stack distribution="trailing">
                        <Button>Uninstall</Button>
                      </Stack>
                    </Stack>
                  </Card.Section>
                </Card>
              </Layout.Section>
            </Layout>
          </Grid.Cell>
        </Grid>
      </Page>
    </Wrapper>
  );
}
