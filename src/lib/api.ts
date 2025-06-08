const BASE = 'http://195.189.227.62:8080';

export async function getJson<T>(path: string, params?: string): Promise<T> {
	const url = `${BASE}/${path}?${params}`;
	console.log('start getting', url);
	const response = await fetch(url);
	console.log('end getting', url);
	const data = await response.json();
	return data;
}
