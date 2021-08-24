<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    export let key: number;
    export let width: number;
    export let height: number;
    export let length: number;
    export let horizontalOffset: number;
    export let verticalOffset: number;

    const dispatch = createEventDispatcher();

    const updatePart = () => {
        let partDimensions = { width, height, length, horizontalOffset, verticalOffset };
        dispatch( 'updatePart', partDimensions );
    }

    const deletePart = () => {
        dispatch('deletePart', key );
    }
</script>

<div class="part">
    <div class="part-header">
        <div class="part-title">Gebäudeteil {key+1}</div><button on:click={deletePart}>X</button>
    </div>
    <div class="part-inputs">
        <div class="part-input">
            <label for="width">Breite</label>
            <input type="text" bind:value={width} on:change={updatePart} /> m
        </div>
        <div class="part-input">
            <label for="height">Länge</label>
            <input type="text" bind:value={length} on:change={updatePart} /> m
        </div>
        <div class="part-input">
            <label for="height">Höhe</label>
            <input type="text" bind:value={height} on:change={updatePart} /> m
        </div>
        <div class="part-input">
            <label for="height">Horizontaler Versatz</label>
            <input type="text" bind:value={horizontalOffset} on:change={updatePart} /> m
        </div>
        <div class="part-input">
            <label for="height">Vertikaler Versatz</label>
            <input type="text" bind:value={verticalOffset} on:change={updatePart} /> m
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