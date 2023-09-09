import strings from "../localization";

export const Role = {
    USER: 1,
    MODERATOR: 2,
    ADMIN: 3
};

export const getRoleName = (role) => {
    let roleName = {
        [Role.USER]: strings.base.role.user,
        [Role.MODERATOR]: strings.base.role.moderator,
        [Role.ADMIN]: strings.base.role.admin,
    };
    return roleName[role] ?? role;
};

export function getRoleTypes() {
    return [
        {
            id: Role.USER,
            name: getRoleName(Role.USER)
        },
        {
            id: Role.MODERATOR,
            name: getRoleName(Role.MODERATOR)
        },
        {
            id: Role.ADMIN,
            name: getRoleName(Role.ADMIN)
        }
    ];
}