import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'placeholder_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_key_secret',
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: "receipt_order_" + Math.random().toString(36).substring(7),
    };

    const order = await instance.orders.create(options);
    
    return NextResponse.json({ success: true, order });
  } catch (error: unknown) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
