<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import FilterCheckbox from '$lib/comps/FilterCheckbox.svelte';
	import FilterSlider from '$lib/comps/FilterSlider.svelte';
	import Select from '$lib/comps/Select.svelte';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import { slide } from 'svelte/transition';
	import Card from '$lib/comps/Card.svelte';
	import { setCookie } from 'typescript-cookie';
	import { createLocale } from '$lib/i18n.js';
	import { goto, invalidateAll } from '$app/navigation';
	import { removeFalsy } from '$lib/helpers.js';

	const { data } = $props();

	// console.log(data.params);

	let showServices = $state(false);

	// let isFirstLoad = true;

	let filters = $state({
		params: {
			age: [data.params.min_age || 18, data.params.max_age || 50],
			weight: [data.params.min_weight || 40, data.params.max_weight || 100],
			height: [data.params.min_height || 150, data.params.max_height || 200],
			bust: [data.params.min_breast || 1, data.params.max_breast || 7]
		},
		prices: [data.params.min_price || 0, data.params.max_price || 15000],
		services: formatServices(data.services, data.params.service_ids),
		sort: data.params.sort_by || 'default'
	});

	// let filters = $state({
	// 	params: {
	// 		age: [18, 50],
	// 		weight: [40, 100],
	// 		height: [150, 200],
	// 		bust: [1, 7]
	// 	},
	// 	prices: [0, 15000],
	// 	services: formatServices(data.services),
	// 	sort: 'default'
	// });

	const servicesNamesMap: Record<number, string> = $derived(
		data.services.reduce((acc, e) => {
			acc[e.id] = e.name_localized;
			return acc;
		}, {} as any)
	);

	function formatServices(services: typeof data.services, active?: number[]) {
		return Object.fromEntries(
			services.sort((a, b) => a.order - b.order).map((e) => [e.id, active?.includes(e.id) || false])
		);
	}

	// function getRandomImage() {
	// 	const images = ['/1.jpg', '/2.jpeg', '/3.jpg', '/4.jpeg', '/5.jpeg', '/6.jpeg'];
	// 	return images[Math.floor(Math.random() * images.length)];
	// }

	// function getRandomName() {
	// 	const names = ['Nastya', 'Sveta', 'Anastasia', 'Natali', 'Olga'];
	// 	return names[Math.floor(Math.random() * names.length)];
	// }

	// function getRandomPrice() {
	// 	const prices = [1000, 2000, 3000, 4000, 5000];
	// 	return prices[Math.floor(Math.random() * prices.length)];
	// }

	$effect(() => {
		setCookie('lang', data.lang);
		console.log('change lang to:', data.lang);
	});

	// $effect(() => {
	// 	filters.services = formatServices(data.services);
	// });

	const t = $derived(createLocale(data.lang));

	function formatFilters(f: typeof filters) {
		return {
			...f,
			services: Object.entries(f.services)
				.filter((e) => e[1])
				.map((e) => +e[0])
		};
	}

	async function onFilterChange() {
		const formated = formatFilters(filters);

		const params = new URLSearchParams(
			removeFalsy({
				min_age: formated.params.age[0],
				max_age: formated.params.age[1],
				min_height: formated.params.height[0],
				max_height: formated.params.height[1],
				min_weight: formated.params.weight[0],
				max_weight: formated.params.weight[1],
				min_breast: formated.params.bust[0],
				max_breast: formated.params.bust[1],
				min_price: formated.prices[0],
				max_price: formated.prices[1],
				sort_by: formated.sort
				// skip: 0,
				// limit: 1000
			} as Record<string, any>)
		);

		formated.services.forEach((e) => {
			params.append('service_ids', e + '');
		});

		await goto('?' + params.toString(), {
			// invalidateAll: true,
			noScroll: true
		});

		await invalidateAll();
	}
</script>

<div id="filters" class="mx-auto mt-5 max-w-6xl px-5">
	<div class="rounded-md bg-white/10 p-5">
		<div class="flex gap-5 md:gap-10">
			<div id="sliders" class="flex w-full items-center gap-5 max-md:flex-col md:gap-10">
				<div class="flex w-full flex-col gap-5 text-white md:gap-10">
					<FilterSlider
						name={t('age')}
						bind:value={filters.params.age}
						min={18}
						max={50}
						onChange={onFilterChange}
					/>
					<FilterSlider
						name={t('weight')}
						bind:value={filters.params.weight}
						min={40}
						max={100}
						onChange={onFilterChange}
					/>
				</div>

				<div class="flex w-full flex-col gap-5 text-white md:gap-10">
					<FilterSlider
						name={t('height')}
						bind:value={filters.params.height}
						min={150}
						max={200}
						onChange={onFilterChange}
					/>
					<FilterSlider
						name={t('bust')}
						bind:value={filters.params.bust}
						min={1}
						max={7}
						step={0.5}
						onChange={onFilterChange}
					/>
				</div>
			</div>
		</div>

		<div id="price" class="mt-10">
			<FilterSlider
				name={t('price')}
				bind:value={filters.prices}
				min={1000}
				max={15000}
				step={500}
				onChange={onFilterChange}
			/>
		</div>

		<div>
			<div class="flex justify-center">
				<Button class="mt-4 w-full" variant="ghost" onclick={() => (showServices = !showServices)}>
					<span>{showServices ? t('hideServices') : t('showServices')}</span>
					{#if showServices}
						<ChevronUp />
					{:else}
						<ChevronDown />
					{/if}
				</Button>
			</div>

			{#if showServices}
				<div transition:slide class="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
					{#each Object.keys(filters.services) as item, i (i)}
						<FilterCheckbox
							title={servicesNamesMap[+item]}
							bind:value={filters.services[item]}
							onChange={onFilterChange}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<div id="content" class="mx-auto mt-5 max-w-6xl px-5">
	<div class="mb-5 flex justify-between gap-5 max-md:flex-col-reverse md:items-center">
		<p class="font-medium md:text-lg">
			{t('totalFound')}: <span class="font-bold"> {data.girls.length}</span>
		</p>

		<div class="flex gap-2">
			<!-- {#if Object.keys(data.params).length}
				<Button class="border border-pink-500 !bg-pink-900" href="/">Скинути фільтри</Button>
			{/if} -->
			<Select
				class={{
					trigger: '',
					content: ''
				}}
				onChange={onFilterChange}
				bind:value={filters.sort}
				options={[
					{ label: t('sortDefault'), value: 'default' },
					{ label: t('sortPriceUp'), value: 'price_up' },
					{ label: t('sortPriceDown'), value: 'price_down' },
					{ label: t('sortAgeUp'), value: 'age_up' },
					{ label: t('sortAgeDown'), value: 'age_down' },
					{ label: t('sortWeightUp'), value: 'weight_up' },
					{ label: t('sortWeightDown'), value: 'weight_down' },
					{ label: t('sortBustUp'), value: 'bust_up' },
					{ label: t('sortBustDown'), value: 'bust_down' }
				]}
			/>
		</div>
	</div>

	<div class="grid gap-4 md:grid-cols-4">
		{#each data.girls as item (item.id)}
			<Card {...item} />
		{/each}
	</div>
</div>
