// app/api/add-data/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
    const { name, department, position, tel } = await request.json();

    try {
        const docRef = await addDoc(collection(db, 'test'), {
            name,
            department,
            position,
            tel,
        });
        return NextResponse.json({ id: docRef.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
