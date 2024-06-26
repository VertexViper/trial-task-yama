import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios'

export async function POST(req: NextRequest) {
    try {
        const { wallet, chain } = await req.json();
        let url = `https://api.mobula.io/api/1/wallet/portfolio?wallet=${wallet}&blockchains=${chain}&cache=true`
        const portfolio = await axios.get(url, {
            headers: {
                'Authorization': process.env.MOBULA_API_KEY,
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Getting portfolio successfully!',
            data: {
                portfolio: portfolio.data,
            }
        })
    } catch (e) {
        return NextResponse.json({
            success: false,
            message: 'Unable to catch portfolio',
            error: e
        })
    }
}