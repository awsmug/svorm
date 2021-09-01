<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    let presets = [
            {
                'name': 'Form A',
                'img': 'assets/img/enon-form-1.svg',
                'data': [
                    {
                        'width': 2,
                        'height': 1,
                        'x': 0,
                        'y': 0
                    }
                ]
            },
            {
                'name': 'Form B',
                'img': 'assets/img/enon-form-2.svg',
                'data': [
                    {
                        'width': 2,
                        'height': 1,
                        'x': 0,
                        'y': 1
                    },
                    {
                        'width': 1,
                        'height': 2,
                        'x': 2,
                        'y': 0
                    }
                ]
            },
            {
                'name': 'Form C',
                'img': 'assets/img/enon-form-3.svg',
                'data': [
                    {
                        'width': 1,
                        'height': 1,
                        'x': 1,
                        'y': 0
                    },
                    {
                        'width': 3,
                        'height': 1,
                        'x': 0,
                        'y': 1
                    }
                ]
            },
            {
                'name': 'Form D',
                'img': 'assets/img/enon-form-4.svg',
                'data': [
                    {
                        'width': 1,
                        'height': 2,
                        'x': 0,
                        'y': 0
                    },
                    {
                        'width': 1,
                        'height': 1,
                        'x': 1,
                        'y': 1
                    },
                    ,
                    {
                        'width': 1,
                        'height': 2,
                        'x': 2,
                        'y': 0
                    }
                ]
            }
    ];

    const setPreset = ( e ) => {
        let key = e.target.dataset.id;
        let preset = presets[key];
        dispatch( 'setPreset', preset );
    }
</script>

<h3>Wählen Sie eine Form des Grundrisses</h3>

<div class="presets">
    {#each presets as preset, i }
        <div class="preset" on:click={setPreset} data-id={i}>
            <img src={preset.img} alt={preset.name} width="100" height="100" data-id={i} />
            <div class="preset-name" data-id={i}>{preset.name}</div>
        </div>
    {/each}
</div>

<style>
    .presets {
        display: flex;
    }
    .preset {
        padding: 0.5rem;
        margin: 0 0.5rem 0.5rem 0;
        background-color: lightgray;
        box-sizing: border-box !important;
        cursor: pointer;
        text-align: center;
        border: lightgray 1px solid;    
    }
    .preset:hover {
        background-color: darkgray;
    }
    .preset:active {
        background-color: white;
    }
    .preset-name {
        padding: 0.5rem 0.5rem 0 0.5rem;
    }
</style>

