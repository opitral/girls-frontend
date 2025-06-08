import { getJson } from '$lib/api';
import type { GirlsShortData, ServisesData } from '$lib/types.js';

export const load = async (e) => {
	const lang = e.cookies.get('lang') || 'uk';

	const servicesParams = new URLSearchParams();
	servicesParams.append('lang', lang);

	const girlsParams = new URLSearchParams(e.url.searchParams);
	girlsParams.append('lang', lang);

	console.log([servicesParams, girlsParams]);

	const services = await getJson(`services`, servicesParams.toString());
	const girls = await getJson(`girls`, girlsParams.toString());

	return {
		services: services as ServisesData,
		girls: girls as GirlsShortData
	};
};
