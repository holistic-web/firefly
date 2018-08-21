
import Page from './Page';
import TokenHandler from './TokenHandler';

const routes = [
	{
		name: 'account.page',
		path: '/account',
		component: Page
	},
	{
		name: 'account.tokenHandler',
		path: '/token',
		component: TokenHandler
	}
];

export default routes;
