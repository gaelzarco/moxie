import { type User } from '@clerk/nextjs/dist/api';

const filterUserForReply = (user: User) => {
    return {
        id: user.id,
        firstName: user.firstName,
    }
}

export default filterUserForReply