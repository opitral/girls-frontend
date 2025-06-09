<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Select from '$lib/comps/Select.svelte';
	import { setCookie } from 'typescript-cookie';
	import '../app.css';
	import { invalidateAll } from '$app/navigation';

	let { children, data } = $props();

	// $effect(() => {
	// 	setCookie('lang', data.lang);
	// 	console.log('change lang to:', data.lang);
	// });
</script>

<div class="flex h-full flex-col">
	<header class="mx-auto mt-5 w-full max-w-6xl px-5">
		<div class="flex items-center justify-between">
			<a href="/" class="cursor-pointer select-none">
				<img src="/logo.svg" alt="" class="h-16 md:h-20" />
			</a>

			<div class="flex gap-2">
				<Button
					href="https://t.me/PutankaBot"
					target="_blank"
					class="
                    border border-pink-500 bg-pink-900 text-white hover:bg-white hover:text-black [&:not(:hover)>img]:invert"
				>
					<img src="/tg.svg" alt="" class="size-5 transition-all" />
					<span class="max-md:hidden">Telegram Bot</span>
				</Button>

				<Select
					onChange={async (lang) => {
						setCookie('lang', lang);
						invalidateAll();
						console.log('change lang to:', lang);
					}}
					class={{
						trigger: 'w-16',
						content: ''
					}}
					value={data.lang}
					options={[
						{ label: '🇺🇦', value: 'uk', extraLable: 'Українська' },
						{ label: '🇷🇺', value: 'ru', extraLable: 'Русский' },
						{ label: '🇬🇧', value: 'en', extraLable: 'English' }
					]}
				/>
			</div>
		</div>
	</header>

	<main class="grow">
		{@render children()}
	</main>

	<footer class="mt-10 bg-pink-950/50">
		<div
			class="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 max-md:flex-col md:py-10"
		>
			<a href="/" class="cursor-pointer select-none">
				<img src="/logo.svg" alt="" class="h-20" />
			</a>

			<div class="text-sm opacity-75">
				<p>Copyright © {new Date().getFullYear()} | All rights reserved</p>
			</div>

			<div class="flex flex-wrap items-end gap-2 text-sm underline max-md:mt-5 md:flex-col">
				<a href="tel:+38012345689">+38012345689</a>
				<a href="mailto:mail@gmail.com">mail@gmail.com</a>
				<a href="https://t.me/@telegram">@telegram</a>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html, body) {
		height: 100%;
	}

	:global(body) {
		background-image: url(/bg.svg);
		background-size: cover;
		background-color: #1f0314;
	}
</style>
