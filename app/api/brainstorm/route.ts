import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") ?? "";

  // Generate dummy data
  const examples = Array.from({ length: 18 }).map((_, idx) => {
    const score = Math.random() * 0.5 + 0.5; // 0.5 - 1
    return {
      id: crypto.randomUUID(),
      name: `Sample Business ${idx + 1}`,
      address: `${idx + 10}03 Main St, Cincinnati, OH 98${idx}60`,
      description: `This is a mock description for the idea "${query}". It outlines a fictional but plausible scenario to demonstrate the UI layout.`,
      askingPrice: Math.round(100000 + Math.random() * 900000),
      cashFlow: Math.round(50000 + Math.random() * 500000),
      score,
    };
  });

  return NextResponse.json(examples);
} 