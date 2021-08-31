<script lang="ts">
    import { fade } from 'svelte/transition';

    import Canvas from '../../../Classes/Canvas';

    import CanvasComponent from './Canvas.svelte'
    import ControlPanelComponent from './ControlPanel.svelte';

    import type HasCanvasItemData from '../../../Interfaces/HasCanvasItemData';
    import type Field from '../../../Classes/Field';
    import Presets from './Presets.svelte';
import CanvasItem from './CanvasItem.svelte';
    
    export let field: Field;

    let canvasItems: HasCanvasItemData[] = [
        {
            width: 1,
            height: 1,
            x: 0,
            y: 0
        }
    ];

    let canvas = new Canvas( true );

    canvasItems.forEach( ( canvasItem ) => {
        canvas.addItem( canvasItem );
    });

    $: {
        field.autoValue();
    }

    const newItem = () => {
        canvas.addItem({
            'width': 1,
            'height': 1,
            'x': canvas.getItemsWidth(),
            'y': 0
        })

        canvas.origItems = canvas.origItems;
    };

    const deleteItem = ( e ) => {
        canvas.deleteItem( e.detail );
        canvas.origItems = canvas.origItems;
    }

    const setPreset = ( e ) => {
        let preset = e.detail;

        canvas = new Canvas( true );
        
        preset.data.forEach( canvasItem => {
            console.log( canvasItem );
            canvas.addItem( canvasItem );
        });
        canvas.render();
    }

</script>

<Presets on:setPreset={setPreset} />

<div class="geo-content" in:fade>
    <CanvasComponent bind:canvas={canvas} />
    <ControlPanelComponent bind:canvas={canvas} on:deleteItem={deleteItem} on:newItem={newItem} />
</div>