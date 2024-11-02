import { useAtom } from "jotai";
import { countAtom } from "@stores/counter";

export default function ClientCounter({ increment = true }) {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div className="mt-4">
      <p className="text-lg text-slate-200">
        Client-side count {increment ? "in" : "de"}crementor
      </p>

      <div className="flex flex-row justify-start align-middle">
        <div className="p-2 text-lg text-info font-bold">{count}</div>
        <button
          type="button"
          className="btn btn-info btn-outline"
          onClick={() => {
            setCount((c) => (increment ? c + 1 : c - 1));
            // NOTE: works in this scenario, count is not 'frozen' in the closure..!?
            // setCount(increment ? count + 1 : count - 1);
          }}
        >
          {increment ? "+" : " -"}
        </button>
      </div>
    </div>
  );
}
