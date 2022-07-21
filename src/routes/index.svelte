<script>
    import Svorm from "$lib/Svorm.svelte";
    import data from  "$lib/Examples/form-complex.json";
    import Range from "$lib/Components/Inputs/Range.svelte";
    
    let customElements = [
        {
            name: 'range',
            element: Range
        }
    ];
</script>

<Svorm {data} {customElements} />