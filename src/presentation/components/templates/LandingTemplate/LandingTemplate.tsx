import type { ReactNode } from "react";

import { Header } from "../../organisms/Header/Header";

interface LandingTemplateProps {
  children: ReactNode;
  footer?: ReactNode;
}

export function LandingTemplate({ children, footer }: LandingTemplateProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {footer}
    </>
  );
}
