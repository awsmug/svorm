<script lang="ts">
    import { tweened } from 'svelte/motion';

    export let width;
    export let length;
    export let horizontalOffset;
    export let verticalOffset;    

    $: { 
        width            = width * 20;
        length           = length * 20;
        horizontalOffset = horizontalOffset * 20;
        verticalOffset   = verticalOffset * 20;

        width            = Math.round( width );
        length           = Math.round( length );
        horizontalOffset = Math.round( horizontalOffset );
        verticalOffset   = Math.round( verticalOffset );
    }

</script>

<div class="part" style="transform: translate({horizontalOffset}px, {verticalOffset}px);width: {width}px; height: {length}px">1</div>

<style>
    .part
    {
        background-color: orange;
        border: 0.1rem solid black;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: 400;
        box-sizing: border-box;    
    }
</style>