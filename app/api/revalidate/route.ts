import { NextRequest } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
 
export async function POST(request: NextRequest) {

    const secretToken = request.nextUrl.searchParams.get('token');
    const pageSlug = request.nextUrl.searchParams.get('page_slug');
    const tag = request.nextUrl.searchParams.get('tag');
    
    if ( secretToken !== process.env.WP_SECRET_TOKEN) {
        return Response.json({ message: 'Invalid secret' }, { status: 401 })
    }
    
    if ( !pageSlug && !tag ) {
        return Response.json({ message: 'Missing params' }, { status: 400 })
    }

    if ( pageSlug ) {
        revalidatePath( pageSlug );
    }
    
    if ( tag ) {
        revalidateTag( tag );
    }
    
    return Response.json({ revalidated: true, now: Date.now() })
}