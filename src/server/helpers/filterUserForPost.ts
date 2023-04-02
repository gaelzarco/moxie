import { type User } from '@clerk/nextjs/dist/api';

const filterUserForPost = (user: User) => {
    return {
        id: user.id,
        userName: user.username,
        firstName: user.firstName,
        profileImageURL: user.profileImageUrl,
    }
}

export default filterUserForPost