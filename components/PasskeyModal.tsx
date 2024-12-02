/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";
import { X } from "lucide-react";

const PASSKEY_LENGTH = 6;
const LOCAL_STORAGE_KEY = "accessKey";

export const PasskeyModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();



  const [state, setState] = useState({
    isOpen: false,
    passkey: "",
    error: "",
    isLoading: false,
  });

  const getEncryptedKey = () => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(LOCAL_STORAGE_KEY);
  };

  useEffect(() => {
    const validateExistingAccess = () => {
      const encryptedKey = getEncryptedKey();
      if (encryptedKey) {
        const accessKey = decryptKey(encryptedKey);
        const isValidKey =
          accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY?.toString();

        if (isValidKey) {
          setState((prev) => ({ ...prev, isOpen: false }));
          router.push("/admin");
          return;
        }
      }

      // If we reach here, either there's no key or it's invalid
      if (searchParams.get("admin") === "true") {
        setState((prev) => ({ ...prev, isOpen: true }));
      }
    };

    validateExistingAccess();
  }, [searchParams, router]);

  const handleClose = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
    router.push("/"); // Remove the admin parameter
  };

  const validatePasskey = (passkey: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        const encryptedKey = encryptKey(passkey);
        localStorage.setItem(LOCAL_STORAGE_KEY, encryptedKey);
        setState((prev) => ({ ...prev, isOpen: false }));
        router.push("/admin");
      } else {
        setState((prev) => ({
          ...prev,
          error: "Invalid passkey. Please try again.",
          passkey: "", // Clear input on error
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "An error occurred. Please try again.",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handlePasskeyChange = (value: string) => {
    setState((prev) => ({
      ...prev,
      passkey: value,
      error: "", // Clear error when user types
    }));

    // Auto-submit when all digits are entered
    if (value.length === PASSKEY_LENGTH) {
      validatePasskey(value);
    }
  };
  return (
    <AlertDialog
      open={state.isOpen}
      onOpenChange={(open) => setState((prev) => ({ ...prev, isOpen: open }))}
    >
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            <span>Admin Access Verification</span>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-white cursor-pointer" />
            </button>
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div role="form" aria-label="Passkey input form">
          <InputOTP
            maxLength={PASSKEY_LENGTH}
            value={state.passkey}
            onChange={handlePasskeyChange}
            disabled={state.isLoading}
          >
            <InputOTPGroup className="shad-otp">
              {[...Array(PASSKEY_LENGTH)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="shad-otp-slot"
                  aria-label={`Passkey digit ${index + 1}`}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {state.error && (
            <p
              className="shad-error text-14-regular mt-4 flex justify-center "
              role="alert"
            >
              {state.error}
            </p>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
