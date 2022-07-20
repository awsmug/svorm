import type HasActionData from "$lib/Classes/Interfaces/HasActionData";
import type HasConditionData from "$lib/Classes/Interfaces/HasConditionData";
import type Form from "../Form";

/**
 * Field class.
 * 
 * @since 1.0.0
 */
export default class Trigger {
    /**
     * Constructor.
     * 
     * @param name Internal name for action.
     * @param trigger Trigger when action fires (change or submit).
     * @param conditions Conditions which have to be fullfilled to run actions after it was triggered.
     * @param actions Actions to be executed.
     * 
     * @since 1.0.0
     */
    public constructor(
        readonly form: Form, 
        readonly name: string, 
        readonly type: "change" | "submit",
        readonly conditions: HasConditionData[], 
        readonly actions: HasActionData[]
    ) {}

    /**
     * Get trigger type.
     * 
     * @returns Type of trigger.
     * 
     * @since 1.0.0
     */
    public getType(): "change" | "submit" {
        return this.type;
    }

    public run() {

    }
}