import loadable from './../../../Common/utiles/loadable';
import Loading from './../../../Common/Components/AppLoading';

export default loadable(() => import('./index'), Loading);
