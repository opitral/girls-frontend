<script lang="ts">
	import Slider from '$lib/components/ui/slider/slider.svelte';

	interface Props {
		name: string;
		value: number[];
		min: number;
		max: number;
		step?: number;
		onChange?: (value: number[]) => void;
	}

	let { name, value = $bindable(), min, max, step, onChange }: Props = $props();
</script>

<label>
	<div class="mb-2 flex justify-between">
		<span>{name}</span>
		<span>{value.join(' - ')}</span>
	</div>
	<Slider
		onValueCommit={(e) => {
			onChange?.(e);
			// console.log(777, e);
		}}
		bind:value
		type="multiple"
		{min}
		{max}
		{step}
		class={['[&_[data-slot="slider-thumb"]]:!bg-pink-900']}
	/>
</label>
