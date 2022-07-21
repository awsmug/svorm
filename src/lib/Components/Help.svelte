<script lang="ts">
    import type Field from '../Classes/Field';
    export let field: Field;

    let cssClasses = ['field-help', 'bi'];

    if( field.help !== undefined ) {
        let type = field.help.type !== undefined ? field.help.type: 'info';

        switch(type) {
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
    <span id="field-{field.name}-help" class={cssClasses.join(' ')} data-bs-toggle="tooltip" data-bs-html="true" title={field.help.content}></span>
{/if}