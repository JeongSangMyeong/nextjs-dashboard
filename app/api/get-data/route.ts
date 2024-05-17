// app/api/get-data/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
    const colRef = collection(db, 'test');
    try {
        const querySnapshot = await getDocs(colRef);
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json({ data: documents });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
