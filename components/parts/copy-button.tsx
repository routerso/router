"use client";

import React from "react";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

type CopyButtonProps = {
  text: string;
};

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Button
      className="absolute right-2 top-2"
      size="icon"
      variant="secondary"
      onClick={handleCopy}
    >
      <span className="sr-only">Copy</span>
      <Copy size="16" />
    </Button>
  );
};

export default CopyButton;
