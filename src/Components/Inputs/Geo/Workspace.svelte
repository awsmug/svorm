<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../../Classes/Field';

    import ViewportParts from './ViewportParts.svelte';
    import ControlPanelParts from './ControlPanelParts.svelte';
    import Parts from '../../../Classes/Parts';

    export let field: Field;
    let parts: Parts = new Parts();

    $: {
        field.autoValue();
    }

    const newPart = () => {
        parts.new();
        parts = parts;
    };

    const deletePart = ( e ) => {
        parts.delete( e.detail );
        parts = parts;
    };
</script>

<div class="viewport">
    <ViewportParts bind:parts={parts} />
</div>

<div class="control-panel">
    <div class="control-panel-menu">
        <button on:click={newPart}>Gebäudeteil hinzufügen</button>
    </div>
    <ControlPanelParts bind:parts={parts} on:deletePart={deletePart} />
</div>

<style>
    .viewport
    {
        display: flex;
        padding: 1rem;
        background-color: lightgray;
        box-sizing: border-box;
        height: 30rem;        
        
    }
    .control-panel
    {
        background-color: darkgray;
        padding: 1rem;
    }
    .control-panel button
    {
        padding: 0.5rem;
    }
</style>