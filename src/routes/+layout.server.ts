export const load = async (e) => {
	return {
		lang: e.cookies.get('lang') || 'uk',
		params: {
			...Object.fromEntries([...e.url.searchParams.entries()].map(([k, v]) => [k, +v || v])),
			service_ids: e.url.searchParams.getAll('service_ids').map((e) => +e)
		} as {
			min_age: number;
			max_age: number;
			min_height: number;
			max_height: number;
			min_weight: number;
			max_weight: number;
			min_breast: number;
			max_breast: number;
			min_price: number;
			max_price: number;
			sort_by: string;
			service_ids: number[];
		}
	};
};
