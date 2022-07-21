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
</script>

<div class="input-checkbox-field ">
	<label for={field.name}>
		<input
			type="checkbox"
			id={field.name}
			name={field.name}
			placeholder={field.placeholder}
			bind:checked={field.value}
			on:input={setValue}
			aria-describedby={field.help !== undefined ? field.name + '-help' : ''}
		/>
		{field.label}  <Help {field} />
	</label>
	<Errors {field} />
</div>
