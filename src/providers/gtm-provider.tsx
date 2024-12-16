import { GoogleTagManager } from "@next/third-parties/google";

export default function GTMProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      {children}
    </>
  );
}
