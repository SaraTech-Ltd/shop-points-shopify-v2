import { Card, Page, Layout, Stack, Link, TextStyle, Heading, ResourceList, Grid, Badge } from '@shopify/polaris';
import { useState } from 'react';
import { TitleBar } from '@shopify/app-bridge-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { gql } from 'graphql-request';
import { useAppQuery, useShopifyQuery } from '../hooks';
import { getTires } from '../store/selectors/tires';
import { trophyImage } from '../assets';
import './homepage.css';
import { ProductsCard, Navbar } from '../components';
import { useEffect } from 'react';

const Wrapper = styled.div`
  .Polaris-Page {
    padding-left: 0;
  }
`;

const PageSubHeading = styled.div`
  padding-bottom: 10px;
`;

const productQuery = gql`
  {
    shop {
      id
      name
      email
    }
  }
`;

const HomePage = () => {
  const tires = useSelector(getTires);
  const [isLoading, setIsLoading] = useState(true);
  const [shopDetails, setShop] = useState(null);

  const shopData = useShopifyQuery({
    key: 'shop',
    query: productQuery,
  });
  console.log('found: ', shopData);

  const {
    data,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: '/api/shopify/shop',
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  console.log('shop: ', data);
  console.log('loading: ', isLoading);

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
                  <Heading>Dashboard</Heading>
                </PageSubHeading>
                <Card sectioned>
                  <Stack wrap={false} spacing="loose" distribution="fillEvenly" alignment="center">
                    <Stack.Item>
                      <Heading>Active Customer</Heading>
                      <TextStyle variation="strong">400</TextStyle>
                    </Stack.Item>
                    <Stack.Item>
                      <Heading>Active Points</Heading>
                      <TextStyle variation="strong">400</TextStyle>
                    </Stack.Item>
                    <Stack.Item>
                      <Heading>Points Collected</Heading>
                      <TextStyle variation="strong">400</TextStyle>
                    </Stack.Item>
                    <Stack.Item>
                      <Heading>Active Redeemed</Heading>
                      <TextStyle variation="strong">400</TextStyle>
                    </Stack.Item>
                  </Stack>
                </Card>
                <Card title="Active Campaigns" sectioned>
                  <ResourceList
                    resourceName={{ singular: 'campaign', plural: 'campaigns' }}
                    items={[
                      {
                        id: 1,
                        name: '3X Point Campaign',
                        date: '03/06/2022',
                        status: 'active',
                      },
                      {
                        id: 2,
                        name: '3XX Point Campaign',
                        date: '03/06/2022',
                        status: 'active',
                      },
                    ]}
                    renderItem={(item) => {
                      const { name, date, status, id } = item;
                      return (
                        <ResourceList.Item url={`campaigns/${id}`}>
                          <Stack>
                            <Stack.Item>
                              <Heading>{name}</Heading>
                            </Stack.Item>
                            <Stack.Item fill>
                              <TextStyle variation="subdued">{date}</TextStyle>
                            </Stack.Item>
                            <Stack.Item>
                              <Badge status="success">{status}</Badge>
                            </Stack.Item>
                          </Stack>
                        </ResourceList.Item>
                      );
                    }}
                  />
                </Card>

                <Card title="Latest Update" sectioned>
                  <ResourceList
                    resourceName={{ singular: 'update', plural: 'updates' }}
                    items={[
                      {
                        url: '/',
                        name: 'New Year Holiday Notice',
                        date: '03/06/2022',
                      },
                      {
                        url: '/',
                        name: 'New Control Panel Notice',
                        date: '03/07/2022',
                      },
                      {
                        url: '/',
                        name: 'Mailer Feature Announcement',
                        date: '22/07/2022',
                      },
                    ]}
                    renderItem={(item) => {
                      const { name, date, url } = item;
                      return (
                        <ResourceList.Item>
                          <Stack>
                            <Stack.Item>
                              <TextStyle variation="subdued">{date}</TextStyle>
                            </Stack.Item>
                            <Stack.Item fill>
                              <Heading>{name}</Heading>
                            </Stack.Item>
                            <Stack.Item>
                              <Link url={url}>Details</Link>
                            </Stack.Item>
                          </Stack>
                        </ResourceList.Item>
                      );
                    }}
                  />
                </Card>
              </Layout.Section>
              {/* <Layout.Section>
                <ProductsCard />
              </Layout.Section> */}
            </Layout>
          </Grid.Cell>
        </Grid>
      </Page>
    </Wrapper>
  );
};

export default HomePage;
