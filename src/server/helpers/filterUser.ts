import { type User } from '@clerk/nextjs/dist/api';

const filterUser = (user: User) => {
    return {
        id: user.id,
        userName: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageURL: user.profileImageUrl,
        createdAt: user.createdAt,
    }
}

export default filterUser