<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import type Part from '../../../Classes/Part';

    export let part: Part;
    export let key:  number;

    const dispatch = createEventDispatcher();

    const deletePart = () => {
        dispatch( 'deletePart', key );
    }
</script>

<div class="part">
    <div class="part-header">
        <div class="part-title">Gebäudeteil {key+1}</div><button on:click={deletePart}>X</button>
    </div>
    <div class="part-inputs">
        <div class="part-input">
            <label for="width">Breite</label>
            <input type=number step=0.01 bind:value={part.width} /> m
        </div>
        <div class="part-input">
            <label for="height">Länge</label>
            <input type=number step=0.01 bind:value={part.length} /> m
        </div>
        <div class="part-input">
            <label for="height">Gebäudehöhe</label>
            <input type=number step=0.01 bind:value={part.height} /> m
        </div>
        <div class="part-input">
            <label for="height">Horizontaler Versatz</label>
            <input type=number step=0.01 bind:value={part.horizontalOffset} /> m
        </div>
        <div class="part-input">
            <label for="height">Vertikaler Versatz</label>
            <input type=number step=0.01 bind:value={part.verticalOffset} /> m
        </div>
    </div>
</div>

<style>
    .part
    {
        background-color: grey;
        margin: 1rem;
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