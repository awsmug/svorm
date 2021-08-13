import type HasHelpData from '../Interfaces/HasHelpData';

/**
 * Help class.
 * 
 * @since 1.0.0
 */
export default class Help implements HasHelpData {
    readonly type    : string;
    readonly content : string;

    /**
     * Initializing help.
     * 
     * @param help  Help data.
     * 
     * @since 1.0.0
     */
     public constructor(
        help: HasHelpData,
    ){
        console.log( help );
        this.type    = help.type;
        this.content = help.content;
    }
}