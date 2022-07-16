import styled from 'styled-components';
import { Link, Icon } from '@shopify/polaris';
import { useLocation } from 'react-router-dom';
import NavbarRoutes from './NavbarRoutes';
import './navbar-style.css';

const NavbarWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	background: var(--p-surface);
	box-shadow: var(--p-shadow-card);
	outline: var(--p-border-width-1) solid transparent;
	height: 100vh;

	a.Polaris-Link {
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding-top: 15px;
		padding-bottom: 15px;
		color: var(--p-text);
		width: 100%;
		&:last-child {
			border: none;
		}
	}
`;
const NavLinkEl = styled.div`
	position: relative;
	width: 100%;
	&:hover {
		background: var(--p-surface-hovered);
	}
	&.active {
		background: var(--p-surface-hovered);
		border-top: 1px solid var(--p-surface-neutral-hovered);
	}
`;

const Navlink = ({ url, title, icon, pathName, ...props }) => {
	const activeClass = url === pathName ? 'active' : '';
	return (
		<NavLinkEl className={activeClass}>
			<Link url={url} color="base" {...props}>
				<Icon source={icon} color="base" width={30} />
				<span>{title}</span>
			</Link>
		</NavLinkEl>
	);
};

const Navbar = () => {
	const location = useLocation();
	return (
		<NavbarWrapper>
			{NavbarRoutes.map((route, index) => (
				<Navlink key={index} pathName={location.pathname} {...route} />
			))}
		</NavbarWrapper>
	);
};

export default Navbar;
