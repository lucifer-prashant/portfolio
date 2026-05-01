"use client"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
      <style jsx>{`
        .page-transition {
          animation: pageSlideIn 0.25s ease-out both;
        }
        @keyframes pageSlideIn {
          from { transform: translateY(10px); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
