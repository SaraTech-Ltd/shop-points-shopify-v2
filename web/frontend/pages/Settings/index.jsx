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
} from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import styled from 'styled-components';
import { Navbar, Switch } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings } from '../../store/actions/tires';

const Wrapper = styled.div`
	.Polaris-Page {
		padding-left: 0;
	}
`;

const PageSubHeading = styled.div`
	padding-bottom: 10px;
`;

export default function SettingsPage() {
	const settings = useSelector((state) => state.settings);
	const dispatch = useDispatch();
	const OnUpdateSettings = (baseKey, key) => (value) => {
		dispatch(updateSettings({ ...settings, [baseKey]: { ...settings[baseKey], [key]: value } }));
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
								</PageSubHeading>
								<Card title="App Settings">
									<Card.Section>
										<Grid>
											<Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}>
												<Switch
													value={settings.appSettings.pointSystem}
													onChange={OnUpdateSettings('appSettings', 'pointSystem')}
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
													value={settings.appSettings.pointSystemDisplay}
													onChange={OnUpdateSettings('appSettings', 'pointSystemDisplay')}
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
													value={settings.widgetSettings.enable}
													onChange={OnUpdateSettings('widgetSettings', 'enable')}
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
													onChange={OnUpdateSettings('widgetSettings', 'lang')}
													value={settings.widgetSettings.lang}
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
													value={settings.orders.isDraftOrder}
													onChange={OnUpdateSettings('orders', 'isDraftOrder')}
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
