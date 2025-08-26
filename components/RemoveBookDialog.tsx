"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RemoveBookDialogProps {
  title: string;
  onConfirm: () => Promise<void> | void;
  triggerLabel?: string;
}

const RemoveBookDialog = ({
  title,
  onConfirm,
  triggerLabel = "Remove From Library",
}: RemoveBookDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="cursor-pointer w-full"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {triggerLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove book?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove <strong>{title}</strong> from your
            library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleConfirm();
            }}
            disabled={loading}
          >
            {loading ? "Removing..." : "Confirm Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveBookDialog;
