import searchRoutes from '../containers/Search';
import accountRoutes from '../containers/Account';

const routes = [
	...searchRoutes,
	...accountRoutes,
	{
		path: '/',
		redirect: '/listen'
	},
	{
		path: '*',
		redirect: '/'
	}
];

export default routes;
