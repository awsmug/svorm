<script lang="ts">
    import {tweened} from 'svelte/motion';

    import type HasCanvasItemData from '../../../Interfaces/HasCanvasItemData';
    
    export let canvasItem: HasCanvasItemData;
    export let key: number;

    let element;

    let tweenedWidth  = tweened( canvasItem.width );
    let tweenedHeight = tweened( canvasItem.height );
    let tweenedX      = tweened( canvasItem.x );
    let tweenedY      = tweened( canvasItem.y );

    $: tweenedWidth.set( canvasItem.width );
    $: tweenedHeight.set( canvasItem.height );
    $: tweenedX.set( canvasItem.x );
    $: tweenedY.set( canvasItem.y );

    $: console.log( tweenedWidth );

</script>

<div class="canvasItem" style="width: {$tweenedWidth}px; height: {$tweenedHeight}px; transform: translate({$tweenedX}px, {$tweenedY}px);" bind:this={element}>{key +1}</div>

<style>
    div.canvasItem
    {
        background-color: orange;
        border: 2px solid darkgray;
        box-sizing: border-box !important;
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