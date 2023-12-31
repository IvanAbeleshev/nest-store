export class CreateUserDTO{
  email: string 
  password?: string | null
  img?: string | null
  role?: 'ADMIN' | 'USER'
}