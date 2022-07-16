import { HomeMajor, FavoriteMajor, ClockMajor, SettingsMajor, WandMajor } from '@shopify/polaris-icons';

const NavbarRoutes = [
	{
		url: '/',
		title: 'Home',
		icon: HomeMajor,
	},
	{
		url: '/rules',
		title: 'Point Rules',
		icon: FavoriteMajor,
	},
	{
		url: '/history',
		title: 'History',
		icon: ClockMajor,
	},
	{
		url: '/settings',
		title: 'Settings',
		icon: SettingsMajor,
	},
	{
		url: '/tires',
		title: 'Tires',
		icon: WandMajor,
	},
];

export default NavbarRoutes;
