import React, { useEffect } from "react";
import IMask from "imask";
import { useIMask, UseIMaskReturnValue } from "../src";
import { render } from "@testing-library/react";
type MaskedDateOptions = IMask.MaskedDateOptions;
type AnyMaskedOptions = IMask.AnyMaskedOptions;

function TestComponent<T extends AnyMaskedOptions>({
  options,
  setValue,
}: {
  options: T;
  setValue: (value: UseIMaskReturnValue<T>) => void;
}) {
  const [ref, maskRef] = useIMask<T>(options);

  useEffect(() => {
    setValue([ref, maskRef]);
  }, [maskRef, ref, setValue]);

  return <input ref={ref} />;
}

describe("usIMask test", () => {
  it("should create mask ref on mount", () => {
    const options = { mask: Date };
    let result: UseIMaskReturnValue<MaskedDateOptions> | undefined = undefined;
    render(<TestComponent options={options} setValue={value => (result = value)} />);
    expect(result).toBeDefined();
    expect(((result as unknown) as UseIMaskReturnValue<MaskedDateOptions>)[1]).toBeDefined();
  });

  it("should update mask ref on option change", () => {
    const options = { mask: Date };
    let result: unknown;
    const { rerender } = render(<TestComponent options={options} setValue={value => (result = value)} />);
    const typedResult = result as UseIMaskReturnValue<MaskedDateOptions>;
    const oldRef = { ...typedResult[1].current };

    const otherOptions = { mask: /\d/ };
    rerender(<TestComponent options={otherOptions} setValue={value => (result = value)} />);
    expect(oldRef.masked?.mask).not.toEqual(typedResult[1].current?.masked.mask);
  });
});
