<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    export let width;
    export let height;
    export let length;
    export let horizontalOffset;
    export let verticalOffset;

    const dispatch = createEventDispatcher();

    const setValue = () => {
        let partDimensions = { width, height, length, horizontalOffset, verticalOffset };
        dispatch( 'updatePart', partDimensions );
    }
</script>

<div class="part">
    <div class="part-header">
        <div class="part-title">Gebäudeteil 1</div><button role="">X</button>
    </div>
    <div class="part-inputs">
        <div class="part-input">
            <label for="width">Breite</label>
            <input type="text" bind:value={width} /> m
        </div>
        <div class="part-input">
            <label for="height">Länge</label>
            <input type="text" bind:value={length} /> m
        </div>
        <div class="part-input">
            <label for="height">Höhe</label>
            <input type="text" bind:value={height} /> m
        </div>
        <div class="part-input">
            <label for="height">Horizontaler Versatz</label>
            <input type="text" bind:value={horizontalOffset} /> m
        </div>
        <div class="part-input">
            <label for="height">Vertikaler Versatz</label>
            <input type="text" bind:value={verticalOffset} /> m
        </div>
    </div>
</div>

<style>
    .part
    {
        background-color: grey;
        margin: 1rem;
    }
    .part-header
    {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: white;
        padding: 1rem;
    }
    .part-inputs
    {
        display: flex;        
    }
    .part-input
    {
        box-sizing: border-box;        
        padding: 0.5rem;
    }
    .part-input input 
    {
        width:90%;
    }
</style>