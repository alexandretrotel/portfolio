"use client";
import "client-only";

import { donations } from "@/data/footer";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Bitcoin, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const EthereumIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="text-center py-8 border-t max-w-5xl mx-auto">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <p className="font-semibold text-sm">
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
  const [copiedEthereum, setCopiedEthereum] = useState(false);

  const copyToClipboard = (
    text: string,
    setCopied: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-semibold text-sm">Support me</p>
        <p className="text-xs text-muted-foreground">
          If you like my work, you can support me by donating cryptocurrencies,
          it helps me a lot!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 place-content-center place-items-center mx-auto">
        {donations.map((donation, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="flex items-center justify-center"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      donation.address,
                      donation.type === "bitcoin"
                        ? setCopiedBitcoin
                        : setCopiedEthereum
                    )
                  }
                >
                  {donation.type === "bitcoin" ? (
                    <Bitcoin size={16} />
                  ) : donation.type === "ethereum" ? (
                    <EthereumIcon size={16} />
                  ) : null}
                  {donation.address.slice(0, 6)}...{donation.address.slice(-6)}
                  {donation.type === "bitcoin" ? (
                    copiedBitcoin ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )
                  ) : donation.type === "ethereum" ? (
                    copiedEthereum ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )
                  ) : null}
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
