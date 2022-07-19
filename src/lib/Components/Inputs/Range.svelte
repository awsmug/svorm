<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Field from '../../Classes/Field';
	import Errors from '../Errors.svelte';
	import Help from '../Help.svelte';

	export let field: Field;

	$: field.autoValue();

	const dispatch = createEventDispatcher();
	const setValue = () => {
		field.validate();
		dispatch('update', field.fieldset.form);
	};

	field.addInputClass('form-range');
</script>

<label for={field.name}>{field.label} <Help {field} /></label>

<div class="input-group has-validation">
	<input
		type="range"
		id={field.name}
		class={field.getInputClasses()}
		bind:value={field.value}
		min={field.params.min}
		max={field.params.max}
		step={field.params.step}
		on:input={setValue}
	/>
	<Errors {field} />
</div>
