import IMask, { InputMask, MaskElement } from "imask";
import AnyMaskedOptions = IMask.AnyMaskedOptions;
import { ChangeEvent, RefObject, useEffect, useRef } from "react";

export type UseIMaskReturnValue<M extends AnyMaskedOptions, E extends HTMLElement | MaskElement = HTMLInputElement> = {
  /**
   * apply this to input you want to mask
   */
  ref: RefObject<E>;
  /**
   * ref with IMask object
   */
  maskRef?: RefObject<InputMask<M> | undefined>;
};

export type IMaskHandlers<M extends AnyMaskedOptions, E extends HTMLElement | MaskElement = HTMLInputElement> = {
  onAccept?: (e: ChangeEvent<E>, mask: InputMask<M> | undefined) => void;
  onComplete?: (e: ChangeEvent<E>, mask: InputMask<M> | undefined) => void;
};

export function useIMask<M extends AnyMaskedOptions, E extends HTMLElement | MaskElement = HTMLInputElement>(
  options: M,
  { onAccept, onComplete }: IMaskHandlers<M, E> = {}
): UseIMaskReturnValue<M, E> {
  const ref = useRef<E>(null);
  const maskRef = useRef<InputMask<M> | undefined>();
  const acceptRef = useRef(onAccept);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    acceptRef.current = onAccept;
  }, [onAccept]);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (ref.current) {
      if (maskRef.current) {
        maskRef.current?.updateOptions(options);
      } else {
        maskRef.current = IMask(ref.current, options);
      }
    }
  }, [options]);

  useEffect(() => {
    if (maskRef.current && acceptRef.current) {
      maskRef.current.on("accept", (e: ChangeEvent<E>) => acceptRef.current?.(e, maskRef.current));
    }
  }, []);

  useEffect(() => {
    if (maskRef.current && completeRef.current) {
      maskRef.current?.on("complete", (e: ChangeEvent<E>) => completeRef.current?.(e, maskRef.current));
    }
  }, []);

  useEffect(() => {
    return () => {
      maskRef.current?.destroy();
    };
  }, []);

  return { ref, maskRef };
}
