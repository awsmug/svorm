import Text from '$lib/Components/Inputs/Text.svelte';
import Textarea from '$lib/Components/Inputs/Textarea.svelte';
import Range from '$lib/Components/Inputs/Range.svelte';
import Checkbox from '$lib/Components/Inputs/Checkbox.svelte';
import ChoiceSelect from '$lib/Components/Inputs/ChoiceSelect.svelte';
import ChoiceImage from '$lib/Components/Inputs/ChoiceImage.svelte';
import ChoiceRadio from '$lib/Components/Inputs/ChoiceRadio.svelte';

/**
 * Navigation class.
 * 
 * @since 1.0.0
 */
export default class Registration {
    private elements = [];

    /**
     * Constructor.
     * 
     * @since 1.0.0
     */
    constructor() {
        this.registerDefaults();
    }
    
    /**
     * Add element to register
     * 
     * @param name  Help data.
     * 
     * @since 1.0.0
     */
    public addElement( name: string, input ) {
        this.elements[ name ] = input;
    }

    /**
     * Get a specific element.
     * 
     * @param name Element name.
     * 
     * @returns Svelte component element object.
     * 
     * @since 1.0.0
     */
    public getElement( name ) {
        return this.elements[ name ];
    }

    /**
     * Register standard Elements.
     * 
     * @since 1.0.0
     */
    private registerDefaults() {
        this.addElement( 'text', Text );
        this.addElement( 'textarea', Textarea );
        this.addElement( 'range', Range );
        this.addElement( 'checkbox', Checkbox );
        this.addElement( 'choice-select', ChoiceSelect );
        this.addElement( 'choice-image', ChoiceImage );
        this.addElement( 'choice-radio', ChoiceRadio );
    }
}