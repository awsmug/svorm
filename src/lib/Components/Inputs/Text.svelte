<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Field from '../../Classes/Field';
	import Errors from '../Errors.svelte';
	import Help from '../Help.svelte';
	import Prefix from '../Prefix.svelte';
	import Suffix from '../Suffix.svelte';

	export let field: Field;

	const dispatch = createEventDispatcher();
	const setValue = () => {
		field.validate();
		dispatch('update', field.fieldset.form);
	};

	field.addInputClass('form-control');
</script>

<label for={field.name}>{field.label} <Help {field} /></label>

<div class="input-group has-validation">
	<Prefix {field} />
	<input
		type="text"
		id={field.name}
		class={field.getInputClasses()}
		placeholder={field.placeholder}
		bind:value={field.value}
		on:input={setValue}
		aria-describedby={field.help !== undefined ? field.name + '-help' : ''}
	/>
	<Suffix {field} />
	<Errors {field} />
</div>
