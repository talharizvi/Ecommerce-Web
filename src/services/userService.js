import userData from '../assets/userData.json';

export function getUserByEmail(email) {
    return userData.find(user => user.email === email);
}