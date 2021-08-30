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

<div class="part">
    <div class="part-header">
        <div class="part-title">Gebäudeteil {key+1}</div><button on:click={deleteItem}>X</button>
    </div>
    <div class="part-inputs">
        <div class="part-input">
            <label for="width">Breite</label>
            <input type=number step=0.01 bind:value={canvasItem.width} /> m
        </div>
        <div class="part-input">
            <label for="height">Höhe</label>
            <input type=number step=0.01 bind:value={canvasItem.height} /> m
        </div>
        <div class="part-input">
            <label for="height">X</label>
            <input type=number step=0.01 bind:value={canvasItem.x} /> m
        </div>
        <div class="part-input">
            <label for="height">Y</label>
            <input type=number step=0.01 bind:value={canvasItem.y} /> m
        </div>
    </div>
</div>

<style>
    .part
    {
        background-color: grey;
        margin: 1rem 0;
    }
    .part .part-header
    {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: white;
        padding: 1rem;
    }
    .part .part-inputs
    {
        display: flex;        
    }
    .part .part-inputs .part-input
    {
        box-sizing: border-box;        
        padding: 0.5rem;
    }
    .part .part-inputs .part-input input 
    {
        width:90%;
    }
</style>