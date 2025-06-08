<script lang="ts">
	import TinySlider from 'svelte-tiny-slider';
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';

	interface Props {
		items: string[];
	}

	let { items }: Props = $props();

	let thumbnailsSlider: any = $state();
	let currentIndex = $state(0);
	let sliderWidth = $state(0);
</script>

<TinySlider bind:currentIndex bind:sliderWidth change={(index) => thumbnailsSlider.setIndex(index)}>
	{#each items as item, i (i)}
		<img
			src={item}
			alt=""
			style:width={`${sliderWidth}px`}
			class="aspect-square shrink-0 rounded-md object-cover"
			onerror={(e) => 'src' in e.currentTarget && (e.currentTarget.src = '/no_image.jpg')}
		/>
	{/each}

	{#snippet controls({ setIndex, currentIndex, reachedEnd })}
		<div class="thumbnails">
			<TinySlider bind:this={thumbnailsSlider}>
				{#snippet children({ sliderWidth })}
					{#each items as item, i (i)}
						<button
							class="thumbnail inset"
							class:active={i == currentIndex}
							style:width="calc((({sliderWidth}px - 2rem) / 5))"
							onclick={() => setIndex(i)}
							onfocus={() => setIndex(i)}
						>
							<img
								src={item}
								alt=""
								class="aspect-square object-cover"
								onerror={(e) => 'src' in e.currentTarget && (e.currentTarget.src = '/no_image.jpg')}
							/>
						</button>
					{/each}
				{/snippet}
			</TinySlider>

			{#if currentIndex > 0}
				<button
					class="
                        absolute top-1/2 -left-5 -translate-y-20 cursor-pointer
                        rounded-full bg-pink-700 p-2 hover:bg-pink-600
                    "
					onclick={() => setIndex(currentIndex - 1)}><ArrowLeft /></button
				>
			{/if}

			{#if !reachedEnd}
				<button
					class="
                        absolute top-1/2 -right-5 -translate-y-20 cursor-pointer
                        rounded-full bg-pink-700 p-2 hover:bg-pink-600
                    "
					onclick={() => setIndex(currentIndex + 1)}
				>
					<ArrowRight /></button
				>
			{/if}
		</div>
	{/snippet}
</TinySlider>

<style lang="postcss">
	.thumbnails :global(.slider-content) {
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem 0;
	}

	.thumbnail {
		padding: 0;
		margin: 0;
		border: 0;
		border-radius: 0.25rem;
		background: gray;
		overflow: hidden;
	}

	.thumbnail:hover {
		background: darkgray;
	}

	.thumbnail:hover img {
		filter: brightness(1.2);
	}

	.thumbnail.active:not(.inset) {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.thumbnail.active.inset {
		position: relative;
	}

	.thumbnail.active.inset::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 0.25rem;
		box-shadow: inset 0 0 0 2px white;
		z-index: 2;
		pointer-events: none;
	}

	.thumbnail img {
		display: block;
		width: 100%;
		height: auto;
	}
</style>
