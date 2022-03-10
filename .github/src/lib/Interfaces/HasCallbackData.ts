/**
 * Callback data interface.
 * 
 * @since 1.0.0
 */
 export default interface HasCallbackData {
    readonly method: string;
    readonly params: [];
    readonly addFormParam: boolean;
}