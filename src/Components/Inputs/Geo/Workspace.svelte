<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../../Classes/Field';

    import Help from '../../Help.svelte';
    import HelpIcon from '../../HelpIcon.svelte';
    import Errors from '../../Errors.svelte';

    import ViewportPart from './ViewportPart.svelte';
    import ControlPanelPart from './ControlPanelPart.svelte';   

    export let field: Field;

    $: field.autoValue();

    const dispatch = createEventDispatcher();
    const setValue = () => {
        dispatch( 'update', field.fieldset.form );
    }

    let showHelp = false;
    const toggleHelp = () => {
        showHelp = ! showHelp;
    }

    let parts: [];

    console.log( field.value );

    if( field.value === undefined )
    {
        parts = [
            {
                width: 10.0,
                length: 15.0,
                height: 2.5,
                horizontalOffset:0,
                verticalOffset:0
            },
            {
                width: 19.0,
                length: 7.0,
                height: 2.5,
                horizontalOffset:0,
                verticalOffset:8
            },
            {
                width: 10.0,
                length: 15.0,
                height: 2.5,
                horizontalOffset:0,
                verticalOffset:0
            }
        ];
    } else {

    }
</script>

<div class="viewport">
    <div class="viewport-content">
        {#each parts as part }
            <ViewportPart width={part.width} length={part.length} horizontalOffset={part.horizontalOffset} verticalOffset={part.verticalOffset}  />
        {/each}       
    </div>
</div>

<div class="control-panel">
    <div class="control-panel-menu">
        <button>Gebäudeteil hinzufügen</button>
    </div>
    <div class="parts">
        {#each parts as part }
            <ControlPanelPart bind:width={part.width} bind:length={part.length} bind:height={part.height} bind:horizontalOffset={part.horizontalOffset} bind:verticalOffset={part.verticalOffset}  />
        {/each}
    </div>
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
    .viewport .viewport-content
    {
        display: flex;
    }
</style>