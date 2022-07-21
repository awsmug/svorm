<script lang="ts">
	import type Field from '../Classes/Field';

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
	<div id="field-{field.name}-help" class={cssClasses.join(' ')}>
		<span class="tooltiptext">{@html field.help.content}</span>
	</div>
{/if}

<style>
	.field-help {
		cursor: pointer;
		position: relative;
		display: inline-block;
	}

	.field-help .tooltiptext {
		visibility: hidden;
		width: 250px;
		bottom: 100%;
		left: 50%;
		margin-left: -125px;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 10px;
		border-radius: 6px;
		position: absolute;
		z-index: 1;
	}

	.field-help .tooltiptext::after {
		content: " ";
		position: absolute;
		top: 100%; /* At the bottom of the tooltip */
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: black transparent transparent transparent;
	}

	.field-help:hover .tooltiptext {
		visibility: visible;
	}
</style>
