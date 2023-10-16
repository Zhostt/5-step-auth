export type inputData = {
    [key:string]:string,
    surname: string,
    name: string,
    patronym: string,
    birthday: string,
    country: string,
    email: string,
};

export type StateKey = 'IdentityConfirm' | 'ConditionsList' | 'AwaitCheck';