<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { createLocale } from '$lib/i18n';
	// import { Check, Verified, X } from '@lucide/svelte';
	import Check from '@lucide/svelte/icons/check';
	import Verified from '@lucide/svelte/icons/verified';
	import X from '@lucide/svelte/icons/x';
	import Slider from './Slider.svelte';

	// const items = ['/1.jpg', '/2.jpeg', '/3.jpg', '/4.jpeg', '/5.jpeg', '/6.jpeg'];

	let { data } = $props();

	console.log(data);

	let showNumber = $state(false);

	const t = $derived(createLocale(data.lang));

	function getHourKey(hours: number) {
		const lastTwo = hours % 100;
		const lastOne = hours % 10;

		if (lastTwo >= 11 && lastTwo <= 14) return 'hoursMany';
		if (lastOne === 1) return 'hoursOne';
		if (lastOne >= 2 && lastOne <= 4) return 'hoursFew';
		return 'hoursMany';
	}

	// const includedServices = $derived(data.services.filter((e) => !e.additional_cost));
	// const additionalServices = $derived(data.services.filter((e) => e.additional_cost));
</script>

<div>
	<div class="mx-auto mt-5 max-w-6xl px-5">
		<!-- <a href="/" class="mb-5 flex w-fit items-center gap-2 text-lg font-semibold">
			<ArrowLeft />
			{t('toMain')}
		</a> -->

		<div class="flex gap-10 max-md:flex-col">
			<div class="relative shrink-0 md:w-1/2">
				<Slider items={data.photos.map((e) => e.file_url)} />
			</div>

			<div class="grow">
				<div class="flex items-center justify-between">
					<h1 class="flex items-center gap-1 text-2xl font-semibold">
						{data.name}
						{#if data.is_verified}
							<Verified class="mt-1 text-pink-500" />
						{/if}
					</h1>
					<!-- <a href="tel:{data.phone}">{data.phone}</a> -->
					<Button
						href={showNumber ? `tel:${data.phone}` : undefined}
						onclick={() => (showNumber = true)}
						variant="outline"
						class="!font-['Chivo_Mono'] text-lg"
					>
						{#if showNumber}
							{data.phone}
						{:else}
							{data.phone.slice(0, 4)}{'*'.repeat(7)}{data.phone.slice(6, 8)}
						{/if}
					</Button>
				</div>

				<div class="mt-5 flex divide-x rounded-md bg-white/10">
					<div class="params_main">
						<h2>{t('age')}</h2>
						<p>{data.age}</p>
					</div>
					<div class="params_main">
						<h2>{t('height')}</h2>
						<p>{data.height} cm.</p>
					</div>
					<div class="params_main">
						<h2>{t('weight')}</h2>
						<p>{data.weight} kg.</p>
					</div>
					<div class="params_main">
						<h2>{t('bustSize')}</h2>
						<p>{data.breast_size} ({data.breast_type_localized})</p>
					</div>
				</div>

				<div class="mt-2 flex flex-wrap gap-2">
					{#snippet chip(text: string)}
						<div class="rounded-sm bg-white/10 px-3 py-2 text-sm font-semibold text-white/75">
							{text}
						</div>
					{/snippet}

					{#if data.has_piercing}
						{@render chip(t('hasPiercing'))}
					{/if}
					{#if data.has_tattoo}
						{@render chip(t('hasTattoo'))}
					{/if}
					{#if data.hair_color_localized}
						{@render chip(data.hair_color_localized)}
					{/if}
					{#if data.ethnicity_localized}
						{@render chip(data.ethnicity_localized)}
					{/if}
					{#if data.body_type_localized}
						{@render chip(data.body_type_localized)}
					{/if}
				</div>

				<p class="mt-5 text-lg font-semibold">{t('prices')}</p>

				<div class="mt-2 flex divide-x rounded-md bg-white/10">
					{#each data.prices as item}
						<div class="params_main">
							<h2>
								{#if item.hours == 8}
									{t('night')}
								{:else}
									{item.hours} {t(getHourKey(item.hours))}
								{/if}
							</h2>

							{#if item.old_cost}
								<p>{item.current_cost} {t('uah')}</p>
								<p class="text-xs line-through opacity-60">{item.old_cost} {t('uah')}</p>
							{:else}
								<p>{item.current_cost} {t('uah')}</p>
							{/if}
						</div>
					{/each}
				</div>

				{#if data.description_localized}
					<!-- <p class="mt-5 text-lg font-semibold">{t('description')}</p> -->
					<p class="mt-2 text-sm">{data.description_localized}</p>
				{/if}

				<!-- <p class="mt-2 text-sm">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas nisl ut eleifend
					fringilla. Donec lectus nisl, rutrum id leo quis, porttitor consectetur turpis.
					Pellentesque ultrices nisi vestibulum felis rutrum fermentum. Suspendisse potenti. Ut at
					vestibulum lorem, at sollicitudin nulla. Donec pellentesque viverra magna vulputate
					ullamcorper. Integer mauris nisl, gravida a consequat at, consectetur vitae neque. Vivamus
					at auctor nibh. Mauris nec libero neque.
				</p> -->

				{#if data.services.length}
					<p class="mt-5 text-lg font-semibold">{t('services')}</p>

					<table class="mt-2 w-full overflow-hidden rounded-md outline outline-white/20">
						<thead>
							<tr class="bg-white/10 *:px-2 *:py-3 max-md:text-xs">
								<th class="border-b border-white/20 text-left">{t('service')}</th>
								<th class="border-b border-white/20 text-center">{t('included')}</th>
								<th class="border-b border-white/20 text-center">{t('extra')}</th>
							</tr>
						</thead>
						<tbody>
							{#each data.services as item}
								<!-- {@const test = Math.random() > 0.5} -->

								<tr class="border-t border-white/10">
									<td class="border-r border-white/10 px-3 py-2 text-left">{item.name_localized}</td
									>
									<td class=" h-full border-r border-white/10 px-3 py-2">
										{#if !item.additional_cost}
											<Check class="mx-auto" />
										{:else}
											<X class="mx-auto opacity-50" />
										{/if}
										<!-- {#if !test}
											<Check class="mx-auto" />
										{:else}
											<X class="mx-auto opacity-50" />
										{/if} -->
									</td>
									<td
										class="md px-3 py-2 text-center font-semibold whitespace-nowrap max-md:text-sm"
									>
										{#if item.additional_cost}
											{item.additional_cost}
											{t('uah')}
										{:else}
											<X class="mx-auto opacity-50" />
										{/if}
										<!-- {#if test}
											{item.additional_cost}
											{t('uah')}
										{:else}
											<X class="mx-auto opacity-50" />
										{/if} -->
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}

				<!-- {#if includedServices.length}
					<p class="mt-5 text-lg font-semibold">{t('includedServices')}</p>

					<div class="mt-2 flex flex-wrap gap-2">
						{#each includedServices as item}
							<div class="flex divide-x rounded-sm bg-white/10">
								<div class="params_main !px-3 !py-2">
									<p>{item.name_localized}</p>
								</div>
							</div>{/each}
					</div>
				{/if}

				{#if additionalServices.length}
					<p class="mt-5 text-lg font-semibold">{t('additionalServices')}</p>

					<div class="mt-2 flex flex-wrap gap-2">
						{#each additionalServices as item}
							<div class="flex divide-x rounded-sm bg-white/10">
								<div class="params_main !px-3 !py-2">
									<p>{item.name_localized}</p>
								</div>
								<div class="params_main !px-3 !py-2">
									<p>{item.additional_cost} {t('uah')}</p>
								</div>
							</div>
						{/each}
					</div>
				{/if} -->
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "../../app.css";

	.params_main {
		@apply flex grow flex-col items-center justify-center max-md:py-2 md:p-5;
	}
	.params_main h2 {
		@apply text-xs font-semibold opacity-60 md:text-sm;
	}

	.params_main p {
		@apply max-md:text-sm;
	}
</style>
