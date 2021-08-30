<script lang="ts">
    import type HasCanvasItemData from '../../../Interfaces/HasCanvasItemData';

    export let canvasItem: HasCanvasItemData;
    export let key: number;

    let element;
</script>

<div class="canvasItem" style="width: {canvasItem.width}px; height: {canvasItem.height}px; transform: translate({canvasItem.x}px, {canvasItem.y}px);" bind:this={element} >{key +1}</div>

<style>
    .canvasItem
    {
        background-color: orange;
        border: 0.1rem solid black;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: 400;
        box-sizing: border-box;
        position: absolute; 
    }
</style>