import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function POST(req: NextRequest) {
    try {
        const { email, wallet } = await req.json();

        const updatedUser = await prisma.user.update({
            where: {
              email: email, 
            },
            data: {
              wallet: wallet, 
            },
          });
        return NextResponse.json({
            success: true,
            message: 'Your account is updated successfully!',
            data: updatedUser
        })
    } catch (e) {
        return NextResponse.json({
            success: false,
            message: 'Unable to create account',
            error: e
        })
    }
}