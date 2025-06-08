import { getJson } from '$lib/api';
import type { GirlFullData } from '$lib/types.js';

export const load = async (e) => {
	const lang = e.cookies.get('lang') || 'uk';

	console.log(3232, lang);

	const data = await getJson<GirlFullData>(`girls/${e.params.id}`, `lang=${lang}`);

	return data;
};
