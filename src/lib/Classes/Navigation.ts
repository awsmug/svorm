import type Fieldset from "./Fieldset";
import type Form from "./Form";

/**
 * Navigation class.
 * 
 * @since 1.0.0
 */
export default class Navigation {
    readonly form            : Form;
    private  currentFieldset : Fieldset;
    private  recentFieldsets : string[] = [];   
    private  lastAction      : string;

    /**
     * Initializing navigation.
     * 
     * @param form  Form object.
     * @param start Name of start fieldset.
     * 
     * @since 1.0.0
     */
    public constructor( form: Form, startFieldset: string ) {
        this.form = form;
        this.setCurrentFieldset( startFieldset );
    }

    /**
     * Get last action.
     * 
     * @return Last action (prev or next).
     * 
     * @since 1.0.0
     */
    public getLastAction() : string {
        return this.lastAction;
    }

    /**
     * Set current fieldset.
     * 
     * @param name Name of fieldset.
     * 
     * @since 1.0.0
     */
    public setCurrentFieldset( name: string ) : Navigation {
        let currentFieldset = this.form.getFieldset( name );

        if ( currentFieldset === undefined ) {
            throw new Error( 'Cant set current fieldset to "' + name + '". Fieldset name does not exist.' );
        } else {
            this.currentFieldset = currentFieldset;
        }

        return this;
    }

    /**
     * Get current fieldset.
     * 
     * @return Current fieldset.
     * 
     * @since 1.0.0
     */
    public getCurrentFieldset() : Fieldset {
        return this.currentFieldset;
    }

    /**
     * Set previous fieldset.
     * 
     * @return Navigation object.
     * 
     * @since 1.0.0
     */
    public prevFieldset() : Navigation {
        if ( ! this.hasPrevFieldset() ) {
            return this;
        }
        this.lastAction = 'prev';

        this.setCurrentFieldset( this.recentFieldsets.pop() );

        return this;
    }
    
    /**
     * Set next fieldset.
     * 
     * @return Navigation object.
     * 
     * @since 1.0.0
     */
    public nextFieldset() : Navigation {
        this.currentFieldset.validate();

        if ( this.currentFieldset.hasValidationErrors() ) {
            return this;
        }
        
        let nextFieldset = this.getNextFieldset();
        

        if ( nextFieldset !== undefined ) {
            this.recentFieldsets.push( this.currentFieldset.name );
            this.lastAction = 'next';     
            
            this.setCurrentFieldset( nextFieldset.name );

            return this;
        }

        throw new Error('No next fieldset not found.');
    }

    /**
     * Is there a previous fieldset?
     * 
     * @return True if there is a previous fieldset, false if not.
     * 
     * @since 1.0.0
     */
    public hasPrevFieldset() : boolean {
        return this.recentFieldsets.length > 0
    }

    /**
     * Is there a next fieldset?
     * 
     * @return True if there is a previous fieldset, false if not.
     * 
     * @since 1.0.0
     */
    public hasNextFieldset() : boolean {
        if ( this.currentFieldset.nextFieldset !== undefined ) {
            return true;
        }

        let nextFieldset = this.getNextFieldset();
        if ( nextFieldset !== undefined ) {
            return true;
        }

        return false;
    }

    /**
     * Returns the next fieldset.
     * 
     * @return Next fieldset object.
     * 
     * @since 1.0.0
     */
    public getNextFieldset() : Fieldset {
        if ( this.currentFieldset.nextFieldset !== undefined ) {
            return this.form.getFieldset( this.currentFieldset.nextFieldset );
        }

        let nextFieldsets = this.getPossibleNextFieldsets();
        let nextFieldset: Fieldset;

        if ( nextFieldsets.length === 0 ) {
            return nextFieldset;
        }

        nextFieldsets.forEach( ( fieldset: Fieldset ) => {
            if ( fieldset.conditionsFullfilled() && nextFieldset === undefined ) {
                nextFieldset = fieldset;
            }
        });
        
        return nextFieldset;
    }

    /**
     * Returns the previous fieldset.
     * 
     * @return Previous fieldset object.
     * 
     * @since 1.0.0
     */
    public getPrevFieldset() : Fieldset {
        if ( ! this.hasPrevFieldset() ) {
            throw Error( 'There is no previous fieldset');
        }

        let preFieldsetName = this.recentFieldsets[ this.recentFieldsets.length -1 ];
        return this.form.getFieldset( preFieldsetName );    
    }

    /**
     * Returns a possible fieldsets. 
     * 
     * Possible fieldsets are all fieldsets which containing a prevFieldset, containing the current fieldset.
     * 
     * @return An array of Fieldsets.
     * 
     * @since 1.0.0
     */
    private getPossibleNextFieldsets() : Fieldset[] {
        let nextFieldsets = this.form.fieldsets.filter( ( fieldset: Fieldset ) => {
            return fieldset.prevFieldset === this.currentFieldset.name;
        });

        return nextFieldsets;
    }
}