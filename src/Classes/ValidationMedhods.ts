/**
 * Validation methods
 * 
 * @since 1.0.0
 */
export default class ValidationMedhods {
    /**
     * Is value of tye string?
     * 
     * @param value Value which have to be checked.
     * @return boolean True if is of type string, false if not.
     * 
     * @since 1.0.0
     */
     static string( value: any ) {
        if ( typeof value === 'string' || value instanceof String ) {
            return true;
        }

        return false;
    }
    
    /**
     * Is value of tye string?
     * 
     * @param value Value which have to be checked.
     * @return boolean True if is of type string, false if not.
     * 
     * @since 1.0.0
     */
    static email( value: any ) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test( String(value).toLowerCase() );
    }

    /**
     * Is number not under min?
     * 
     * @param value Value which have to be checked.
     * @param min Max number.
     * 
     * @return boolean True if number not under min.
     * 
     * @since 1.0.0
     */
    static min( value: number, min: number ) {
        if( value === undefined ) return false;
        return ! ( value < min );
    }

    /**
     * Is number not over max?
     * 
     * @param value Value which have to be checked.
     * @param min Min number.
     * 
     * @return boolean True if number not over max.
     * 
     * @since 1.0.0
     */
    static max( value: number, max: number ) {
        if( value === undefined ) return false;
        return ! ( value > max );
    }

    /**
     * Is string not under min length?
     * 
     * @param value Value which have to be checked.
     * @param min Max number of chars.
     * 
     * @return boolean True if string length is not under min length.
     * 
     * @since 1.0.0
     */
    static minLength( value: string, min: number ) {
        if( value === undefined ) return false;        
        return ! ( value.length < min );
    }

    /**
     * Is string not over max length?
     * 
     * @param value Value which have to be checked.
     * @param min Max number of chars.
     * 
     * @return boolean True if string length is not over max length.
     * 
     * @since 1.0.0
     */
    static maxLength( value: string, max: number ) {
        if( value === undefined ) return false;
        return ! ( value.length > max );
    }

    /**
     * Is value empty?
     * 
     * @param value Value which have to be checked.
     * @return boolean True if is empty, false if not.
     * 
     * @since 1.0.0
     */
    static empty( value: any ) : boolean {
        if( value === undefined || value.trim() === '' ) {
            return true;
        }
        return false;
    }

    /**
     * Is value in array?
     * 
     * @param value Needle.
     * @param value Haystack.
     * @return boolean True if found, false if not.
     * 
     * @since 1.0.0
     */
    static inArray( value: any, values: any[] ) : boolean {
        return values.includes( value );
    }

    /**
     * Checks if value is checked
     * 
     * @param value Value of the field.
     * @return boolean True if is checked, false if not.
     * 
     * @since 1.0.0
     */
    static isChecked( value: any ) : boolean {
        return value == true ? true : false;
    }
}