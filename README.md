# use-imask
React hook that exposes [IMask](https://github.com/uNmAnNeR/imaskjs) object

## Usage

```typescript
const maskOptions = { mask: Number }; // make sure options don't change on each render (use constant or useMemo or ref)

function Example() {
  const [value, setValue] = useState("");

  const { ref } = useIMask(maskOptions, {
  // use onAccept callback instead of onChange to change value
    onAccept: e => { 
      setValue(e.target.value);
    },
  });

  return (
    <div style={{ padding: "10px" }}>
      <label>{label}</label>
      <input ref={ref} value={value} />
    </div>
  );
}
```

## Props
|name|type|description|
|---|---|---|
|options|\<M extends AnyMaskedOptions\>|mask options, when options change updateOptions function is called by the IMask object
|onAccept|(e: ChangeEvent\<E\>, mask: InputMask\<M\> \| undefined) => void|function called on IMask accept event
|onComplete|(e: ChangeEvent\<E\>, mask: InputMask\<M\> \| undefined) => void|function called on IMask complete event

## Return value

|name|type|description|
|---|---|---|
|ref|RefObject\<HTMLInputElement\|null\>|apply this to your input element
|maskRef|RefObject\<InputMask\<M\> \| undefined\>|ref with IMask object
