import {
	Card,
	Page,
	Layout,
	TextContainer,
	Heading,
	Grid,
	DataTable,
	Pagination,
	Badge,
	Tag,
	TextStyle,
	TextField,
	Stack,
} from '@shopify/polaris';
import { TitleBar } from '@shopify/app-bridge-react';
import styled from 'styled-components';
import { Navbar } from '../../components';
import { useState, useCallback } from 'react';

const Wrapper = styled.div`
	.Polaris-Page {
		padding-left: 0;
	}
`;

const PageSubHeading = styled.div`
	padding-bottom: 10px;
`;

const PaginationWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
`;

export default function HistoryPage() {
	const [sortedRows, setSortedRows] = useState(null);
	const data = [
		[
			'#4341',
			'20/02/2022',
			875.0,
			122,
			[<Badge status="success">Credited</Badge>],
			<Badge status="critical">Manual Point Adjustment</Badge>,
		],
		[
			'#4331',
			'15/02/2022',
			22.0,
			20,
			[<Badge status="success">Credited</Badge>],
			<Badge status="critical">Birthday</Badge>,
		],
		[
			'#4231',
			'10/02/2022',
			222.0,
			10,
			[<Badge>Uncredited</Badge>],
			<Badge progress="incomplete" status="warning">
				unfulfielled
			</Badge>,
		],
	];
	const rows = sortedRows ? sortedRows : data;

	const handleSort = useCallback((index, direction) => setSortedRows(sortCurrency(rows, index, direction)), [rows]);

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
									<Heading element="h1">Order History</Heading>
								</PageSubHeading>
								<Card>
									<DataTable
										columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text', 'text']}
										headings={['Order', 'Date', 'Amount', 'Point', 'Status', 'Fulfillment Status']}
										rows={rows}
										sortable={[false, false, true, true, false, false]}
										defaultSortDirection="descending"
										initialSortColumnIndex={3}
										onSort={handleSort}
									/>
									<PaginationWrapper>
										<Pagination
											label="Results"
											hasPrevious
											onPrevious={() => {
												console.log('Previous');
											}}
											hasNext
											onNext={() => {
												console.log('Next');
											}}
										/>
									</PaginationWrapper>
								</Card>
							</Layout.Section>
						</Layout>
					</Grid.Cell>
				</Grid>
			</Page>
		</Wrapper>
	);
}
