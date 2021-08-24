<script lang="ts">
    import type HasPartData from '../../../Interfaces/HasPartData';

    export let part: HasPartData;
    export let key: number;

    let width            = part.width;
    let length           = part.length;
    let horizontalOffset = part.horizontalOffset;
    let verticalOffset   = part.verticalOffset;    

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

<div class="part" style="transform: translate({horizontalOffset}px, {verticalOffset}px);width: {width}px; height: {length}px">{key +1}</div>

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