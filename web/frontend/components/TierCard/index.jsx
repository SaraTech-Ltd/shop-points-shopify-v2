import { Card, Heading, Button, ButtonGroup, TextStyle, Stack, ResourceList } from '@shopify/polaris';
import styled from 'styled-components';

const TextRright = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const CardHeader = styled.div`
  padding-right: 22px;
  border-bottom: 1px solid var(--p-surface-hovered);
`;

const TierCard = ({ onTireModal, tires, onUpdate, onDelete, loading, deleting }) => {
  return (
    <Card sectioned>
      <CardHeader style={{ paddingBottom: '10px' }}>
        <Stack>
          <Stack.Item fill>
            <Heading>New Tier</Heading>
          </Stack.Item>
          <Stack.Item>
            <Button primary onClick={onTireModal}>
              Add
            </Button>
          </Stack.Item>
        </Stack>
      </CardHeader>

      <ResourceList
        resourceName={{ singular: 'update', plural: 'updates' }}
        items={tires}
        loading={loading}
        renderItem={(item) => {
          const { name, amount, point, campaignPoint } = item;
          return (
            <ResourceList.Item>
              <Stack distribution="fill">
                <Stack.Item>
                  <Heading>{name}</Heading>
                </Stack.Item>
                <Stack.Item>
                  <TextStyle>
                    ¥{amount}={point} point
                  </TextStyle>
                </Stack.Item>
                <Stack.Item fill>
                  <TextStyle>¥{campaignPoint || 0} Campaign point</TextStyle>
                </Stack.Item>
                <Stack.Item>
                  <TextRright>
                    <ButtonGroup style={{ justifyContent: 'end' }}>
                      <Button size="slim" onClick={onDelete(item)} loading={deleting === item.id}>
                        Delete
                      </Button>
                      <Button size="slim" primary onClick={onUpdate(item)}>
                        Edit
                      </Button>
                    </ButtonGroup>
                  </TextRright>
                </Stack.Item>
              </Stack>
            </ResourceList.Item>
          );
        }}
      />
    </Card>
  );
};

export default TierCard;
