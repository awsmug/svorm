import Text from '$lib/Components/Inputs/Text.svelte';
import Number from '$lib/Components/Inputs/Number.svelte';
import Textarea from '$lib/Components/Inputs/Textarea.svelte';
import Range from '$lib/Components/Inputs/Range.svelte';
import Checkbox from '$lib/Components/Inputs/Checkbox.svelte';
import ChoiceSelect from '$lib/Components/Inputs/ChoiceSelect.svelte';
import ChoiceImage from '$lib/Components/Inputs/ChoiceImage.svelte';
import ChoiceRadio from '$lib/Components/Inputs/ChoiceRadio.svelte';

export default class Registration {
    private elements = [];

    constructor() {
        this.registerDefaults();
    }
    
    public addElement( name, input ) {
        this.elements[ name ] = input;
    }

    public getElement( name ) {
        return this.elements[ name ];
    }

    private registerDefaults() {
        this.addElement( 'text', Text );
        this.addElement( 'textarea', Textarea );
        this.addElement( 'number', Number );
        this.addElement( 'range', Range );
        this.addElement( 'checkbox', Checkbox );
        this.addElement( 'choice-select', ChoiceSelect );
        this.addElement( 'choice-image', ChoiceImage );
        this.addElement( 'choice-radio', ChoiceRadio );
    }
}