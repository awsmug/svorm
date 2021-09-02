<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import {tweened} from 'svelte/motion';

    import type HasCanvasItemData from '../../../Interfaces/HasCanvasItemData';
    
    export let canvasItem: HasCanvasItemData;
    export let key: number;
    export let selectedItem: number;

    let element;
    let cssArray = [];
    let css: string;

    const dispatch = createEventDispatcher();

    const selectItem = () => {
        dispatch('selectItem', key );
    }

    let tweenedWidth  = tweened( canvasItem.width );
    let tweenedHeight = tweened( canvasItem.height );
    let tweenedX      = tweened( canvasItem.x );
    let tweenedY      = tweened( canvasItem.y );

    $: tweenedWidth.set( canvasItem.width );
    $: tweenedHeight.set( canvasItem.height );
    $: tweenedX.set( canvasItem.x );
    $: tweenedY.set( canvasItem.y );

    $: {
        if( selectedItem === key )
        {
            cssArray.push( 'selected' );
        } else {
            cssArray = cssArray.filter( ( value ) => {
                value !== 'selected';
            });
        }

        css = cssArray.join( ' ' );
    }
</script>

<div class="canvasItem {css}" style="width: {$tweenedWidth}px; height: {$tweenedHeight}px; transform: translate({$tweenedX}px, {$tweenedY}px);" bind:this={element} on:click={selectItem} >{key +1}</div>

<style>
    .canvasItem
    {
        background-color: orange;
        border: 2px solid #E5E7EB;
        box-sizing: border-box !important;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: 400;
        box-sizing: border-box;
        position: absolute; 
        cursor: pointer;
    }
    .canvasItem:hover
    {
        background-color: #FBBF24;
    }
    .canvasItem.selected
    {
        border: 2px dotted #E5E7EB;
        background-color: #FBBF24;
    }
    
</style>