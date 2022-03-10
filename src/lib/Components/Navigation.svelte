<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type Navigation from "../Classes/Navigation";

    const dispatch = createEventDispatcher();

    export let navigation: Navigation;

    $: disabledPrev = ! navigation.hasPrevFieldset();
    $: disabledNext = ! navigation.hasNextFieldset();

    const navigate = ( direction: string ) => {
        switch ( direction ) {
            case 'prev': 
                navigation.prevFieldset();
                dispatch( 'navigate', navigation.form );
                break;
            case 'next':
                navigation.nextFieldset();                
                dispatch( 'navigate', navigation.form );
                break;
        }
    }
</script>

<nav>
    {#if ! disabledPrev }
    <button on:click={ () => navigate('prev') } disabled={disabledPrev}>Zurück</button>
    {/if}
    {#if ! disabledNext }    
    <button on:click={ () => navigate('next') } disabled={disabledNext}>Weiter</button>
    {/if}
</nav>