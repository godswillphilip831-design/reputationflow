import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    console.error("Feedback notification received invalid JSON");
    return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { businessId, rating, message, customerName } =
    typeof payload === "object" && payload !== null
      ? (payload as Record<string, unknown>)
      : {};
  if (
    typeof businessId !== "string" ||
    typeof rating !== "number" ||
    !Number.isFinite(rating) ||
    typeof message !== "string" ||
    typeof customerName !== "string"
  ) {
    console.error("Feedback notification received invalid fields");
    return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ success: true, skipped: true });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Feedback notification is missing Supabase server credentials");
    return Response.json({ success: false, error: "Notification service unavailable" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id, name, user_id")
    .eq("id", businessId)
    .single();

  if (businessError || !business) {
    console.error("Feedback notification could not load business", businessError);
    return Response.json({ error: "Could not find business" }, { status: 404 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", business.user_id)
    .maybeSingle();

  const ownerEmail = profile?.email?.trim();
  if (profileError || !ownerEmail) {
    console.error("Feedback notification could not load business owner email", profileError);
    return Response.json({ error: "Could not find owner email" }, { status: 404 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error: sendError } = await resend.emails.send({
    from: "ReputationFlow <onboarding@resend.dev>",
    to: ownerEmail,
    subject: `New private feedback (${rating} stars) — ${business.name}`,
    text: [
      `Rating: ${rating}/5`,
      `Customer name: ${customerName || "Not provided"}`,
      `Message: ${message}`,
      "",
      "View it in your dashboard: https://reputationflow-zrpt.vercel.app/dashboard",
    ].join("\n"),
  });

  if (sendError) {
    console.error("Feedback notification email failed", sendError);
    return Response.json({ error: sendError.message }, { status: 502 });
  }

  return Response.json({ success: true });
}