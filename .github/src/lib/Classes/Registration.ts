import Text from '$lib/Components/Inputs/Text.svelte';
import Textarea from '$lib/Components/Inputs/Textarea.svelte';
import Checkbox from '$lib/Components/Inputs/Checkbox.svelte';

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
        this.addElement( 'Checkbox', Checkbox );
    }
}