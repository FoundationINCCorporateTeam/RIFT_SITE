import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the install script from the repository root
    const scriptPath = join(process.cwd(), 'install.sh');
    const script = readFileSync(scriptPath, 'utf-8');
    
    return new NextResponse(script, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    // If local file not found, return a redirect to GitHub
    return NextResponse.redirect(
      'https://raw.githubusercontent.com/FoundationINCCorporateTeam/RIFT/main/install.sh',
      { status: 302 }
    );
  }
}
