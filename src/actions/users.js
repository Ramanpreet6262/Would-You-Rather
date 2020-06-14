export const GetUser = 'GetUser';
export const AddAns = 'AddAns';
export const AddQ = 'AddQ';

export function getUsers(users) {
  return {
    type: GetUser,
    users
  };
}
