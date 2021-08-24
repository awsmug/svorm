<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type Field from '../../../Classes/Field';

    import Help from '../../Help.svelte';
    import HelpIcon from '../../HelpIcon.svelte';
    import Errors from '../../Errors.svelte';

    import ViewportParts from './ViewportParts.svelte';
    import type HasPartData from '../../../Interfaces/HasPartData';
import ControlPanelParts from './ControlPanelParts.svelte';

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

    let parts: HasPartData[] = [];
    let count: number = 0;

    if( field.value === undefined )
    {
        parts = [
            {
                width: 10.0,
                length: 10.0,
                height: 2.5,
                horizontalOffset:0,
                verticalOffset:0
            }
        ];
    } else {

    }

    const addPart = () => {
        let part = {
            width: 10.0,
            length: 10.0,
            height: 2.5,
            horizontalOffset:0,
            verticalOffset:0
        };
        parts = [...parts, part ];
    };

    const deletePart = ( e ) => {
        let keyDelete = e.detail;

        let partsFiltered = [];
        for ( let key in parts ) {
            
            if( key != keyDelete )
            {
                partsFiltered.push( parts[key] );
            }
        }

        parts = [ ...partsFiltered ];
    };

    const updatePart = ( e ) => {
        let keyUpdate      = e.detail.key;
        let partDimensions = e.detail.partDimensions;

        for ( let key in parts ) {
            
            if( key == keyUpdate )
            {
                
            }
        }  
    }
</script>

<div class="viewport">
    <ViewportParts bind:parts={parts} />
</div>

<div class="control-panel">
    <div class="control-panel-menu">
        <button on:click={addPart}>+ Gebäudeteil hinzufügen</button>
    </div>
    <ControlPanelParts bind:parts={parts} on:deletePart={deletePart} on:updatePart={updatePart} />
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