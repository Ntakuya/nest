export const UserStatus = {
    pending: 'PENDING',
    activated: 'ACTIVATED',
    deactivated: 'DEACTIVATED',
    inviting: 'INVITING'
} as const 

export type UserStatus = typeof UserStatus[keyof typeof UserStatus]
