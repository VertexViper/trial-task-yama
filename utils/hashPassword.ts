import bcrypt from 'bcrypt';

export const hashedPassword = async (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = await bcrypt.hash(password, salt)
    return hashed
}

export const comparedPassword = async (password: string, dbPassword: string) => {
    const result = await bcrypt.compare(password, dbPassword)
    return result
}