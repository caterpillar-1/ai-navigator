import { NextRequest, NextResponse } from "next/server";
import * as Utils from "@/utils/utils";

const reasoningServerAddr = "http://localhost:5000";

// export async function POST(req: NextRequest) {
//   console.log(`Received request: ${req}`);
//   
//   let ret = undefined;
//   await Utils.post(reasoningServerAddr + "/api/ask", {
//     text: req.body,        
//   }).then((res) => {
//     ret = new NextResponse(res.body, {
//       status: 200
//     })
//   }).catch((err) => {
//     ret = new NextResponse("Reasoning Server Error", {
//       status: 500
//     })
//   });
// 
//   return ret;
// }

export async function POST(req: NextRequest) {
  console.log(`Received request: ${req}`);
  
  let ret = new Response(JSON.stringify({ ans: "### Hello, this is AI speaking!" }), { status: 200 });

  return ret;
}
