<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Field from '../../Classes/Field';
	import Errors from '../Errors.svelte';
	import Help from '../Help.svelte';

	export let field: Field;

	$: field.autoValue();

	const dispatch = createEventDispatcher();
	const setValue = () => {
		dispatch('update', field.fieldset.form);
	};

	field.addInputClass('form-check-input');
</script>

{#if field.label !== undefined}
	<legend>{field.label} <Help {field} /></legend>
{/if}

{#each field.choices as choice, i}
	<div class="form-check">
		<input
			type="radio"
			class={field.getInputClasses()}
			id={field.name}
			bind:group={field.value}
			value={choice.value}
			on:change={setValue}
		/>
		<label class="form-check-label" for={field.name}>{choice.label}</label>
		{#if field.choices.length === i + 1}
			<Errors {field} />
		{/if}
	</div>
{/each}
