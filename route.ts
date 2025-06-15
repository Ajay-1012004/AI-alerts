import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing text input' }, { status: 400 });
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const userAgent = process.env.NEXT_PUBLIC_USER_AGENT;

    const requestId = uuidv4();
    
    const response = await fetch(apiUrl!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token!,
        'User-Agent': userAgent!,
      },
      body: JSON.stringify({
        infoId: requestId,
        aiFunctionNameOrId: 'asst_nerby_info_v1_test',
        isGZipped: false,
        inTextOrGzipBase64: text.trim(),
        fileNameOrExtension: '.txt',
        indexForSearch: true,
        indexFields: [],
        preserveDataForQuery: true,
        aiReparse: false,
        nlpReParse: false,
        returnParseInfo: false,
        returnFullHtml: false,
        returnFullText: false,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('API Error:', result);
      return NextResponse.json({
        error: result?.err?.errMsg || 'External API Error',
        statusCode: response.status,
        responseData: result,
      }, { status: 500 });
    }

    if (!result?.res?.info || typeof result.res.info !== 'object') {
      console.error('Invalid API structure:', result);
      return NextResponse.json({
        error: 'No valid info extracted from API response.',
        responseData: result,
      }, { status: 422 });
    }

    return NextResponse.json(result.res.info);

  } catch (err: any) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Server Error', details: err.message }, { status: 500 });
  }
}

