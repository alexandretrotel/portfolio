"use client";
import "client-only";

import { donations } from "@/data/core/footer";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Bitcoin, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="mx-auto border-t px-4 py-8 text-center">
      <div className="mx-auto flex flex-col gap-8">
        <p className="text-sm font-semibold">
          Made with ❤️ by Alexandre Trotel
        </p>

        <DonationsComponent />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alexandre Trotel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function DonationsComponent() {
  const [copiedBitcoin, setCopiedBitcoin] = useState(false);

  const copyToClipboard = (
    text: string,
    setCopied: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold">Support me</p>
        <p className="text-xs text-muted-foreground">
          If you like my work, you can support me by donating cryptocurrencies,
          it helps me a lot!
        </p>
      </div>

      <div className="mx-auto grid grid-cols-1 place-content-center place-items-center gap-2 sm:gap-4">
        {donations.map((donation, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="flex items-center justify-center"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(donation.address, setCopiedBitcoin)
                  }
                >
                  <Bitcoin size={16} />
                  <span className="md:hidden">
                    {donation.address.slice(0, 6)}...
                    {donation.address.slice(-6)}
                  </span>
                  <span className="hidden md:block">{donation.address}</span>
                  {copiedBitcoin ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Click to copy {donation.title} address
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
