<script lang="ts">
    import { fade } from 'svelte/transition';

    import Canvas from '../../../Classes/Canvas';

    import CanvasComponent from './Canvas.svelte'
    import ControlPanelComponent from './ControlPanel.svelte';

    import type HasCanvasItemData from '../../../Interfaces/HasCanvasItemData';
    import type Field from '../../../Classes/Field';
    
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

</script>

<div class="geo-content" transition:fade>
    <CanvasComponent bind:canvas={canvas} />
    <ControlPanelComponent bind:canvas={canvas} on:deleteItem={deleteItem} on:newItem={newItem} />
</div>