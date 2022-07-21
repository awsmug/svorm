<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Field from '../../Classes/Field';
	import Errors from '../Errors.svelte';
	import Help from '../Help.svelte';

	export let field: Field;

	const dispatch = createEventDispatcher();
	const setValue = () => {
		field.validate();
		dispatch('update', field.fieldset.form);
	};

	field.addInputClass('form-check-input');
</script>

{#if field.label !== undefined}
	<p>{field.label} <Help {field} /></p>
{/if}

{#each field.choices as choice, i}
	<div class="form-check">
		<input
			type="radio"
			class={field.getInputClasses()}
			id={field.name}
			bind:group={field.value}
			value={choice.value}
			on:input={setValue}
		/>
		<label class="form-check-label" for={field.name}>{choice.label}</label>
		{#if field.choices.length === i + 1}
			<Errors {field} />
		{/if}
	</div>
{/each}
