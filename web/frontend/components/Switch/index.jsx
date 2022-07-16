import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const SwitchWrapper = styled.div`
	width: 44px;
	height: 24px;
	position: relative;
	border-radius: 20px;
	transition: border-color 1s ease-in 0s;
	box-sizing: border-box;
	background: rgb(228, 231, 235);
	${(props) =>
		props.enabled &&
		`
    background: rgb(0, 128, 96);
    transition: all 0.5s ease 0s, right 0s ease-out 0s;
  `}
`;

const EnableWrapper = styled.div`
	position: absolute;
	top: 2px;
	width: 20px;
	bottom: 2px;
	left: 2px;
	background-color: rgb(255, 255, 255);
	border-radius: 100%;
	box-shadow: rgb(0 0 0 / 20%) 0px 0px 1px 1px;
	cursor: pointer;
	transition: all 1s ease-in-out 0.2s;
	${(props) =>
		props.enabled &&
		`
    left: unset;
    right: 2px;
    transition: all 1s ease-in-out 0.2s;
  `}
`;

const Switch = ({ value: propsValue, onChange, ...props }) => {
	const [value, setValue] = useState(false);

	useEffect(() => {
		setValue(propsValue);
	}, []);

	const onChangeValue = useCallback(() => {
		onChange(!value);
		setValue(!value);
	}, [value]);

	return (
		<SwitchWrapper onClick={onChangeValue} {...props} {...(value ? { enabled: 'enabled' } : {})}>
			<EnableWrapper {...(value ? { enabled: 'enabled' } : {})} />
		</SwitchWrapper>
	);
};

export default Switch;
