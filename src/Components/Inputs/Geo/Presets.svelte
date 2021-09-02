<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import type HasPresetData from '../../../Interfaces/HasPresetData';
    
    export let presetSelected: boolean;
    export let presets       : HasPresetData[];
    let        preset        : HasPresetData; 
    let        key           : number;

    const dispatch = createEventDispatcher();

    const setPreset = ( e ) => {
        key = e.target.dataset.id;
        preset = presets[key];
        presetSelected = true;

        dispatch( 'setPreset', preset );
    }

    const withoutPreset = () => {
        dispatch( 'setPreset', false );
    }
</script>



{#if ! presetSelected }
<h3>Wählen Sie eine Form des Grundrisses</h3>
<div class="presets">
    {#each presets as preset, i }
        <div class="preset" on:click={setPreset} data-id={i}>
            <img src={preset.img} alt={preset.name} width="100" height="100" data-id={i} />
            <div class="preset-name" data-id={i}>{preset.name}</div>
        </div>
    {/each}
    <div class="preset" on:click={withoutPreset}>
        <div class="preset-name">Benutzerdefiniert</div>
    </div>
</div>
{/if}

<style>
    .presets {
        display: flex;
    }
    .preset {
        padding: 0.5rem;
        margin: 0 0.5rem 0.5rem 0;
        background-color: lightgray;
        box-sizing: border-box !important;
        cursor: pointer;
        text-align: center;
        border: lightgray 1px solid;    
    }
    .preset:hover {
        background-color: darkgray;
    }
    .preset:active {
        background-color: white;
    }
    .preset-name {
        padding: 0.5rem 0.5rem 0 0.5rem;
    }
</style>

