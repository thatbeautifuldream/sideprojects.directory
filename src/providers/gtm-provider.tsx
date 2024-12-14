import { GoogleTagManager } from "@next/third-parties/google";

export default function GTMProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleTagManager gtmId={process.env.GTM_ID || ""} />
      {children}
    </>
  );
}
