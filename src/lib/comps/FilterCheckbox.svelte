<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	interface Props {
		title: string;
		value: boolean;
		class?: string;
		onChange?: (value: boolean) => void;
	}

	let { title, value = $bindable(), class: className, onChange }: Props = $props();
</script>

<label class={['flex items-center gap-2', className]}>
	<Checkbox bind:checked={value} onCheckedChange={() => onChange?.(value)} />
	<span>{title}</span>
</label>
