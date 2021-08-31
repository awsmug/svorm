<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type HasCanvasItemData from '../../../Interfaces/HasCanvasItemData';

    export let canvasItem: HasCanvasItemData;
    export let key:  number;

    const dispatch = createEventDispatcher();

    const deleteItem = () => {
        dispatch( 'deleteItem', key );
    }
</script>

<div class="canvas-item">
    <div class="canvas-item-header">
        <div class="canvas-item-title" role="definition">Gebäudeteil {key+1}</div><button class="button-alert" on:click={deleteItem}>X</button>
    </div>
    <div class="canvas-item-inputs">
        <div class="canvas-item-input">
            <label for="width">Breite</label>
            <input type=number step=0.01 bind:value={canvasItem.width} /> m
        </div>
        <div class="canvas-item-input">
            <label for="height">Höhe</label>
            <input type=number step=0.01 bind:value={canvasItem.height} /> m
        </div>
        <div class="canvas-item-input">
            <label for="height">X</label>
            <input type=number step=0.01 bind:value={canvasItem.x} /> m
        </div>
        <div class="canvas-item-input">
            <label for="height">Y</label>
            <input type=number step=0.01 bind:value={canvasItem.y} /> m
        </div>
    </div>
</div>

<style>
    .button-alert 
    {
        width: 1.5rem;
        height: 1.5rem;
        padding: 0.1rem;
    }
    .canvas-item
    {
        border-bottom: 1px solid lightgray;
        font-size: small;
    }
    .canvas-item .canvas-item-header
    {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0.5rem;
    }
    .canvas-item .canvas-item-header .canvas-item-title
    {
        font-size:medium;
        font-weight: 700;
    }
    .canvas-item .canvas-item-inputs
    {
        display: flex;        
    }
    .canvas-item .canvas-item-inputs .canvas-item-input
    {
        box-sizing: border-box;        
        padding: 0.5rem;
    }
    .canvas-item .canvas-item-inputs .canvas-item-input input 
    {
        width:50%;
    }
</style>