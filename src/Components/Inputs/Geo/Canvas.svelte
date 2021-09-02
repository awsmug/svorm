<script lang="ts">
    import type Canvas from '../../../Classes/Canvas';
    import CanvasItemComponent from './CanvasItem.svelte';

    export let canvas: Canvas;
    export let selectedItem:  number;
    let        wrapperWidth:  number;
    let        wrapperHeight: number;    

    const selectItem = ( e ) => {
        selectedItem = e.detail;
    }

    const resetCanvas = () => {
        alert('yo');
    }

    $:{
        if( wrapperWidth !== undefined && wrapperHeight !== undefined )
        {
            canvas.setWrapperSize( wrapperWidth, wrapperHeight );
        }
    }
</script>

<div class="canvas-border">
    <svg class="reset-canvas" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" on:click={resetCanvas}>
        <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
    </svg>
    <div class="canvas-wrapper" bind:clientHeight={wrapperHeight} bind:clientWidth={wrapperWidth}>
        <div class="canvas" style="height: {canvas.getHeight()}; width:{canvas.getWidth()}">
            {#each canvas.renderItems as canvasItem, i }
                <CanvasItemComponent bind:canvasItem={canvasItem} key={i} bind:selectedItem on:selectItem={selectItem} />
            {/each}
        </div>
    </div>
</div>

<style>
    .canvas-border
    {
        padding:1rem;
        background-color: lightgray;
    }
    .reset-canvas
    {
        width: 30px;
        cursor: pointer;
        color: red;
    }
    .canvas-wrapper
    {
        height: 600;
        overflow: hidden;
    }
    .canvas-wrapper .canvas
    {
        margin:auto;
        background-color: lightgray;        
        overflow: hidden;
    }
</style>