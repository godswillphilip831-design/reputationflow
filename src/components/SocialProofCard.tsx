"use client";

type Props = {
  businessName: string;
  reviewText: string;
  customerName?: string;
  rating?: number;
};

export default function SocialProofCard({
  businessName,
  reviewText,
  customerName = "Happy Customer",
  rating = 5,
}: Props) {
  return (
    <div
      id="social-proof-card"
      className="w-full max-w-[380px] rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "linear-gradient(145deg, #16181c 0%, #0a0a0a 100%)",
        border: "1px solid #2f3336",
      }}
    >
      {/* Top accent bar */}
      <div className="h-1.5 bg-[#1d9bf0]" />

      <div className="p-6">
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < rating ? "text-[#1d9bf0]" : "text-[#2f3336]"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review text */}
        <p className="text-[15px] leading-relaxed text-[#e7e9ea] mb-5">
          “{reviewText}”
        </p>

        {/* Customer + business */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold text-[#e7e9ea]">
              {customerName}
            </p>
            <p className="text-[12px] text-[#71767b]">Verified Review</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] font-bold text-[#1d9bf0]">
              {businessName}
            </p>
            <p className="text-[11px] text-[#71767b]">Google Review</p>
          </div>
        </div>
      </div>
    </div>
  );
}