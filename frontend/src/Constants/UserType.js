import strings from "../localization";

export const UserType = {
    INDIVIDUAL: 1,
    COMPANY: 2
};

export const getUserTypeName = (userType) => {
    let userTypeName = {
        [UserType.INDIVIDUAL]: strings.base.userType.individual,
        [UserType.COMPANY]: strings.base.userType.company
    };
    return userTypeName[userType] ?? userType;
};

export function getUserTypes() {
    return [
        {
            id: UserType.INDIVIDUAL,
            name: getUserTypeName(UserType.INDIVIDUAL)
        },
        {
            id: UserType.COMPANY,
            name: getUserTypeName(UserType.COMPANY)
        }
    ];
}