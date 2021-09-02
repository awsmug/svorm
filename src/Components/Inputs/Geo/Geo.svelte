<script lang="ts">
    import { fade } from 'svelte/transition';

    import Canvas from '../../../Classes/Canvas';
    import type HasCanvasItemData from '../../../Interfaces/HasCanvasItemData';
    import type Field from '../../../Classes/Field';

    import PresetsComponent from './Presets.svelte';
    import ControlPanelComponent from './ControlPanel.svelte';
    import CanvasComponent from './Canvas.svelte';
    
    export let field: Field;
    let preset;

    let canvas = new Canvas( true );

    let canvasItems: HasCanvasItemData[] = field.value;
    let selectedItem: number = -1;
    
    if ( field.value !== undefined )
    {
        canvasItems.forEach( ( canvasItem ) => {
            canvas.addItem( canvasItem );
        });
    }
    
    const newItem = () => {
        canvas.addItem({
            'width': 1,
            'height': 1,
            'x': canvas.getItemsWidth(),
            'y': 0
        })

        canvas.items = canvas.items;
    };

    const deleteItem = ( e ) => {
        canvas.deleteItem( e.detail );
        canvas.items = canvas.items;
    }

    const setPreset = ( e ) => {
        preset = e.detail;
        canvas = new Canvas( true );
        
        preset.data.forEach( canvasItem => {
            canvas.addItem( canvasItem );
        });
        canvas.render();
    }

    $: {
        field.value = canvas.items;
    }

</script>

<PresetsComponent on:setPreset={setPreset} />

{#if preset !== undefined}
    <div class="geo-content" in:fade>
        <CanvasComponent bind:canvas bind:selectedItem />
        <ControlPanelComponent bind:canvas bind:selectedItem on:deleteItem={deleteItem} on:newItem={newItem} />
    </div>
{/if}