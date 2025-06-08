import { replaceState } from '$app/navigation';
import { page } from '$app/state';

export function updateSearchParam(key: string, value: string) {
	page.url.searchParams.set(key, value);
	replaceState(page.url, page.state);
}

export type RemoveFalsy<T> = {
	[K in keyof T as undefined extends T[K] ? K : K]: Exclude<T[K], undefined>;
};

export function removeFalsy<T extends object>(obj: T): RemoveFalsy<T> {
	const entries = Object.entries(obj).filter(([_, v]) => v?.length ?? v);
	return Object.fromEntries(entries) as RemoveFalsy<T>;
}
