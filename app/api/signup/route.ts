import { NextRequest, NextResponse } from 'next/server';
import { hashedPassword } from '@/utils/hashPassword';
import { prisma } from '@/prisma';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: 'User already exists'
            })
        }
        const hash = await hashedPassword(password);
        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: hash
            },
        });
        return NextResponse.json({
            success: true,
            message: 'Your account is created successfully!',
            data: newUser
        })
    } catch (e) {
        return NextResponse.json({
            success: false,
            message: 'Unable to create account',
            error: e
        })
    }
}