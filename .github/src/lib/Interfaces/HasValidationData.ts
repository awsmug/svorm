/**
 * Validation data interface.
 * 
 * @since 1.0.0
 */
export default interface HasValidationData {
    readonly values: [];
    readonly value: string;
    readonly type: string;    
    readonly error: string;    
}