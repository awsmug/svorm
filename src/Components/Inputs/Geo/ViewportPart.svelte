<script lang="ts">
    import type Part from '../../../Classes/Part';

    export let part: Part;
    export let key: number;

    let width            : number; 
    let length           : number;
    let verticalOffset   : number;
    let horizontalOffset : number;

    $: {
        width            = part.getSreenWidth();
        length           = part.getSreenLength();
        verticalOffset   = part.getSreenVerticalOffset();
        horizontalOffset = part.getSreenHorizontalOffset();
    }
</script>

<div class="part" style="width: {width}px; height: {length}px; transform: translate({horizontalOffset}px, {verticalOffset}px);">{key +1}</div>

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