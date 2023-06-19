export const isEmptyField = (...args) => {


    for (let index = 0; index < args.length; index++) {
        const e = args[index];
        if (e == '')
            return 1
        else if (e == null)
            return 1
    }
    return 0;
};

export const hasNonEmptyField = (...fields) => {
    return fields.some(field => field !== "" && field !== null);
}