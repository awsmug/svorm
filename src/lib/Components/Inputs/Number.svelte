<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type Field from '../../Classes/Field';
	import Errors from '../Errors.svelte';
	import Help from '../Help.svelte';
	import Prefix from '../Prefix.svelte';
	import Suffix from '../Suffix.svelte';

	export let field: Field;

	$: field.autoValue();

	let value;

	if (field.value !== undefined) {
		value = field.value;
	}

	const dispatch = createEventDispatcher();
	const setValue = () => {
		value = value.replace(',', '.');

		if (isNaN(value)) {
			alert('Fehlerhafte Eingabe. Bitte geben Sie eine Zahl ein.');
			return;
		}

		if (value !== undefined) {
			value = parseFloat(value.replace(',', '.'));

			field.value = value;
			value = value.toLocaleString('de-DE');
		}

		dispatch('update', field.fieldset.form);
	};

	field.addInputClass('form-control');
</script>

<label for={field.name}>{field.label}</label>

<div class="input-group">
	<Prefix {field} />
	<input
		type="text"
		id={field.name}
		class={field.getInputClasses()}
		placeholder={field.placeholder}
		bind:value
		on:blur={setValue}
		aria-describedby={field.help !== undefined ? field.name + '-help' : ''}
	/>
	<Suffix {field} />
	<Errors {field} />
</div>

<Help {field} />
