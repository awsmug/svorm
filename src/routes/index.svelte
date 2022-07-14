<script>
    import { onMount } from 'svelte'

    import Svorm from "$lib/Svorm.svelte";
    import data from  "$lib/Examples/form-complex.json";
    import Range from "$lib/Components/Inputs/Range.svelte";
    
    let customElements = [
        {
            name: 'range',
            element: Range
        }
    ];

    onMount(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    });
</script>

<Svorm {data} {customElements} />