"use client";

/* An <a> that asks for the visitor's email before navigating. */

import type { AnchorHTMLAttributes } from "react";
import { useEmailGate, type GateRequest } from "@/components/EmailGateProvider";

type GatedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  gate: GateRequest;
};

export default function GatedLink({ gate, href, onClick, children, ...rest }: GatedLinkProps) {
  const { requestGate } = useEmailGate();

  return (
    <a
      href={href ?? "#"}
      onClick={(e) => {
        // Let modified clicks (middle-click, cmd/ctrl-click) through natively.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        requestGate({ ...gate, href: href ?? gate.href });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
