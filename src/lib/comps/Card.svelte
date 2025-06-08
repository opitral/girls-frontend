<script lang="ts">
	import { page } from '$app/state';
	import { createLocale } from '$lib/i18n';
	import BadgeCheck from '@lucide/svelte/icons/badge-check';

	interface Props {
		id: number;
		main_photo: string | null;
		name: string;
		is_verified: boolean;
		age: number;
		height: number;
		weight: number;
		min_price: number | null;
	}

	let { id, main_photo, name, is_verified, age, height, weight, min_price }: Props = $props();

	const t = $derived(createLocale(page.data.lang));
</script>

<a href="/{id}" id="card" class="relative overflow-hidden rounded-md">
	<div class="absolute top-0 flex w-full justify-between pt-2">
		<div class="rounded-r-sm bg-pink-900/50 p-1 px-3 shadow-md">
			<span class="font-semibold text-white">{name}</span>
		</div>
		{#if is_verified}
			<div class="rounded-l-sm bg-pink-900/50 p-1 px-3 shadow-md">
				<BadgeCheck class="text-white" />
				<!-- {:else}
				<BadgeX class="text-gray-600" /> -->
			</div>
		{/if}
	</div>

	<img
		src={main_photo || '/no_image.jpg'}
		alt=""
		class="aspect-square w-full object-cover"
		onerror={(e) => 'src' in e.currentTarget && (e.currentTarget.src = '/no_image.jpg')}
	/>

	<div class=" bg-pink-800/20 p-2">
		<div class="flex justify-evenly gap-1">
			{#snippet item(prop: string, value: number)}
				<p class="flex grow justify-center gap-1 rounded-sm bg-white/10 py-1 text-sm">
					<span>{prop} </span>
					<span class="font-semibold"> {value}</span>
				</p>
			{/snippet}

			{@render item(`${t('age')}:`, age)}
			{@render item(`${t('height')}:`, height)}
			{@render item(`${t('weight')}:`, weight)}
		</div>

		<div class="mt-2 flex justify-center rounded-sm bg-white/10 py-1 text-lg font-semibold">
			<p>{t('from')} {min_price} {t('uah')}</p>
		</div>
	</div>
</a>
