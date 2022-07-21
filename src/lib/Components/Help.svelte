<script lang="ts">
    import Tooltip from "sv-bootstrap-tooltip";
	import type Field from '../Classes/Field';

    let boundElement;

	export let field: Field;

	const cssClasses = ['field-help', 'bi'];

	if (field.help !== undefined) {

		let type = field.help.type !== undefined ? field.help.type : 'info';

		switch (type) {
			case 'question':
				cssClasses.push('bi-question-square-fill');
				break;
			case 'info':
				cssClasses.push('bi-info-square-fill');
				break;
		}
	}
</script>

{#if field.help !== undefined}
	<span id="field-{field.name}-help" class={cssClasses.join(' ')} bind:this={boundElement}></span>
    <Tooltip triggerElement={boundElement}>{@html field.help.content}</Tooltip>
{/if}

<style>
    .field-help {
        cursor: pointer;
    }
</style>
