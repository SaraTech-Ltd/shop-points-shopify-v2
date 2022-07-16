import { Modal, FormLayout, TextField, Heading, TextStyle, Grid, TextContainer } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { tireFormValidate } from '../../utils/validate';
import { addTire, updateTire } from '../../store/actions/tires';

const newTire = { name: '', currencyAmount: 0, pointValue: 0, pointRule: 0 };

const TireModal = ({ onClose, active, title, tire = {}, isEdit = false }) => {
	const dispatch = useDispatch();

	const [values, setValue] = useState({ ...newTire });
	const [errors, setError] = useState({});

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

	const handleSave = useCallback(() => {
		const _errors = tireFormValidate(values);
		if (!_.isEmpty(_errors)) {
			setError(_errors);
		} else {
			if (isEdit === true) {
				dispatch(updateTire(values));
			} else {
				dispatch(addTire({ ...values, id: _.random(10000000, 99999999) }));
			}
			onClose();
		}
	});

	const handleFormChange = (name) => (value) => {
		setValue({ ...values, [name]: value });
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
							name="currencyAmount"
							error={errors?.currencyAmount}
							value={values.currencyAmount}
							selectTextOnFocus
							onChange={handleFormChange('currencyAmount')}
							prefix="$"
							autoComplete="off"
						/>
						<TextField
							label="Point Value"
							type="number"
							name="pointValue"
							error={errors?.pointValue}
							value={values.pointValue}
							selectTextOnFocus
							onChange={handleFormChange('pointValue')}
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
								name="pointRule"
								error={errors?.pointRule}
								value={values.pointRule}
								selectTextOnFocus
								onChange={handleFormChange('pointRule')}
								prefix={values.currencyAmount + '$'}
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
