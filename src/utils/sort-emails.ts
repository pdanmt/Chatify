export function sortEmailsByLenght(currentUserEmail: string, chatUserEmail: string) {
    if (currentUserEmail.length <= chatUserEmail.length) {
        return [currentUserEmail, chatUserEmail]
    } else {
        return [chatUserEmail, currentUserEmail]
    }
}