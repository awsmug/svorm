/**
 * Field class.
 * 
 * @since 1.0.0
 */
 export default abstract class CSSElement {
    /**
     * Classes.
     * 
     * @type string[]
     * 
     * @since 1.0.0
     */
    private classes: string[] = [];

    /**
     * Add Class.
     * 
     * @param string Name of css class to add.
     * 
     * @since 1.0.0
     */
    public addClass(name: string) {
        if( this.classes.indexOf(name) !== -1) {
            return;
        }

        this.classes.push(name);
    }

    /**
     * Remove Class.
     * 
     * @param string Name of css class to remove.
     * 
     * @since 1.0.0
     */
    public removeClass(name: string) {
        this.classes = this.classes.filter( className => className !== name );
    }

    /**
     * Get CSS Classes.
     * 
     * @return String of CSS classes.
     * 
     * @since 1.0.0
     */
    public getClasses(): string {
        return this.classes.join(' ');
    }
 }