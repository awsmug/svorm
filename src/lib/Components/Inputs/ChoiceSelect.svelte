<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Field from '../../Classes/Field';
	import Help from '../Help.svelte';
	import Errors from '../Errors.svelte';
	import Prefix from '../Prefix.svelte';
	import Suffix from '../Suffix.svelte';

	export let field: Field;

	$: field.autoValue();

	const dispatch = createEventDispatcher();
	const setValue = () => {
		field.validate();
		dispatch('update', field.fieldset.form);
	};

	field.addInputClass('form-select');
</script>

<label for={field.name}>{field.label} <Help {field} /></label>

<div class="input-group has-validation">
	<Prefix {field} />
	<select
		id={field.name}
		class={field.getInputClasses()}
		name={field.name}
		bind:value={field.value}
		on:input={setValue}
		aria-describedby={field.help !== undefined ? field.name + '-help' : ''}
	>
		{#each field.choices as choice}
			<option value={choice.value}>{choice.label}</option>
		{/each}
	</select>
	<Suffix {field} />
	<Errors {field} />
</div>
