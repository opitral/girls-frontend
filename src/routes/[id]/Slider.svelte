<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { EmblaCarouselType } from 'embla-carousel';

	interface Props {
		items: string[];
	}

	let { items }: Props = $props();

	let mainEmbla: EmblaCarouselType | undefined = $state(undefined);
	let thumbEmbla: EmblaCarouselType | undefined = $state(undefined);

	function scrollTo(index: number) {
		mainEmbla?.scrollTo(index);
	}

	let showImage = $state('');
</script>

<!-- Main slider -->
<Carousel.Root
	setApi={(api) => (mainEmbla = api)}
	class="mx-auto mb-4 w-full max-w-2xl"
	opts={{ loop: true }}
>
	<Carousel.Content>
		{#each items as src}
			<Carousel.Item class="flex justify-center" onclick={() => (showImage = src)}>
				<img {src} alt="Main" class="aspect-square rounded-lg object-cover" />
			</Carousel.Item>
		{/each}
	</Carousel.Content>

	<Carousel.Previous class="-left-5 max-md:hidden" variant="default" />
	<Carousel.Next class="-right-5 max-md:hidden" variant="default" />
</Carousel.Root>

<!-- Thumbnail slider -->
<Carousel.Root
	setApi={(api) => (thumbEmbla = api)}
	class="mx-auto w-full max-w-2xl"
	opts={{ containScroll: 'keepSnaps', dragFree: true }}
>
	<Carousel.Content>
		{#each items as src, i}
			<Carousel.Item onclick={() => scrollTo(i)} class="basis-1/4 cursor-pointer px-1">
				<img
					{src}
					alt="Thumb"
					class="max-h-24 w-full rounded border-2 object-cover transition-all hover:border-white"
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
</Carousel.Root>

<Dialog.Root open={!!showImage} onOpenChange={() => (showImage = '')}>
	<Dialog.Content class="max-h-[90vh] p-0" onclick={() => (showImage = '')}>
		<img src={showImage} alt="Main" class=" h-full rounded-lg object-cover" />
	</Dialog.Content>
</Dialog.Root>
