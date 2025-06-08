const BASE = 'http://195.189.227.62:8080';

export async function getJson<T>(path: string, params?: string): Promise<T> {
	const response = await fetch(`${BASE}/${path}?${params}`);
	const data = await response.json();
	return data;
}
