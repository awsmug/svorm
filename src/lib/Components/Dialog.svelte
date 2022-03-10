<script lang="ts">
    import {fly, fade} from 'svelte/transition';
    import type HasDialogOptionData from "../Interfaces/HasDialogOptionData";

    export let text   : string;
    export let options: HasDialogOptionData[];
    export let width  : string = '400px';
    export let height : string = '250px';
    export let show   : boolean = false;
</script>

{#if show }
<div class="dialog-wrapper" in:fade>
    <div class="dialog" style="width: {width}; height: {height};" in:fly="{{ delay: 250, y: -500 }}">
        <div class="dialog-text">{text}</div>
        <div class="dialog-options">
        {#each options as option, i}
            <button on:click={option.callback}>{option.text}</button>
        {/each}
        </div>
    </div>
</div>
{/if}

<style>
    .dialog-wrapper
    {
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(0, 0, 0, 0.73);
    }
    .dialog
    {
        margin: auto;
        background-color: white;
        padding:2rem;
        box-sizing: border-box;
        border:black 1px solid;
        border-radius: 0 0 0.5rem 0.5rem;
    }
    .dialog-text
    {
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 1rem;
    }
    .dialog-options
    {
        display:flex;
        justify-content:space-between;
    }
    .dialog-options button
    {
        flex-grow: 1;
        margin: 0.25rem;
        padding: 0.5rem;
        cursor: pointer;
    }
</style>