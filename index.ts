export interface BooleanizeOptions {
    startingWith: string[];
}
const DEFAULT_PREFIXES = ["is", "has", "are", "can", "should"];

export const booleanize = (opts: BooleanizeOptions = { startingWith: DEFAULT_PREFIXES }) => {
    return (req: any, res: any, next: any) => {
        const keys = Object.keys(req.query);
        keys.forEach(key => {
            const found = opts.startingWith.find(prefix => key.startsWith(prefix));
            if (found && found.charAt(found.length).toUpperCase() === found.charAt(found.length)) {
                const val = req.query[key];
                req.query[key] = checkVal(val);
            }
        });
        next();
    };
};

const checkVal = (val: unknown): unknown => {
    const isTrueValid = val === 'true' || val == 1;
    const isFalseValid = val === 'false' || val == 0 || val == -1;
    const isValid = isTrueValid || isFalseValid;
    if (!isValid) {
        return val;
    }
    return isTrueValid;
};
