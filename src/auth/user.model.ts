export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    otp?: string;
    otpExpiration?: Date;
    role: 'user' | 'admin' | 'moderator';
    status: 'active' | 'inactive';
}
