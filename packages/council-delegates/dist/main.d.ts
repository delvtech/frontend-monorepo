export interface Delegate {
    address: string;
    commonwealthPostedFromAddress?: string;
    commonwealthCommentId?: number;
    commonwealthName?: string | null;
    name?: string;
    description?: string;
    /**
     * Twitter handle w/out the @ symbol, eg: "CharlieStLouis" (not "@CharlieStLouis")
     */
    twitterHandle?: string;
    /**
     * Timestamp of when the post was made
     */
    createdAt: string;
}
export const mainnetDelegates: Delegate[];
export const goerliDelegates: Delegate[];
export const testnetDelegates: Delegate[];

//# sourceMappingURL=main.d.ts.map
