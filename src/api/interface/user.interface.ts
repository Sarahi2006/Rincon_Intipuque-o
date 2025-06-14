export interface User {
  _id: string,
  name: string,
  lastName: string,
  email: string,
  role: 'admin' | 'client'
}
