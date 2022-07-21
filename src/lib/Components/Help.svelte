<script lang="ts">
	import tippy from 'sveltejs-tippy';
	import type Field from '../Classes/Field';

	export let field: Field;

	const cssClasses = ['field-help', 'bi'];
    let tooltip;

	if (field.help !== undefined) {
        tooltip = {
            content: field.help.content,
            allowHTML: true,
            placement: 'top'
        };

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
	<span id="field-{field.name}-help" class={cssClasses.join(' ')} use:tippy={tooltip}></span>
{/if}

<style>
    .field-help {
        cursor: pointer;
    }
</style>
