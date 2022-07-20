/**
 * Dialog option data interface.
 * 
 * @since 1.0.0
 */
 export default interface HasDialogOptionData {
    readonly text: string;
    readonly callback: ( e ) => void;
}