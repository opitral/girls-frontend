<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Portal } from 'bits-ui';

	interface Props {
		value: string;
		options: { label: string; value: string; extraLable?: string }[];
		class?:
			| string
			| {
					trigger?: string;
					content?: string;
			  };

		onChange?: (value: string) => void;
	}

	let { value = $bindable(), options, class: className, onChange }: Props = $props();

	const classTrigger = typeof className === 'string' ? className : className?.trigger;
	const classContent = typeof className === 'string' ? undefined : className?.content;
</script>

<Select.Root bind:value type="single" onValueChange={onChange}>
	<Select.Trigger class={['border-pink-500 !bg-pink-900 [&>svg]:!text-pink-100', classTrigger]}
		>{options.find((e) => e.value === value)?.label}</Select.Trigger
	>

	<Portal>
		<Select.Content
			class={['max-w-94 min-w-10 border-pink-500 bg-pink-900 text-white', classContent]}
		>
			{#each options as option, i (i)}
				<Select.Item
					value={option.value}
					class="hover:!bg-pink-700 data-[highlighted]:bg-pink-600 [&>span>svg]:!text-pink-500"
					>{option.label} {option.extraLable}</Select.Item
				>
			{/each}
		</Select.Content>
	</Portal>
</Select.Root>
