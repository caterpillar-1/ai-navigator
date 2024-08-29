import { NextRequest, NextResponse } from "next/server";
import * as Utils from "@/utils/utils";

const reasoningServerAddr = "http://localhost:5000";

export async function POST(req: NextRequest) {
  let ret = undefined;
  await Utils.post(reasoningServerAddr + "/api/query", {
    text: (await req.json()).text,     
  }).then((res) => {
    ret = new NextResponse(JSON.stringify(res), {
      status: 200
    })
  }).catch((err) => {
    ret = new NextResponse("Reasoning Server Error", {
      status: 500
    })
  });

  return ret;
}
