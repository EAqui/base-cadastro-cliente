import * as bcrypt from 'bcrypt';

export async function isMatch(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
}