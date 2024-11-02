import { useAtom } from "jotai";
import { countAtom } from "../stores/counter";

export default function ClientCounter({ increment = true }) {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div className="mt-4">
      <p className="text-lg text-slate-200">
        Client-side count {increment ? "in" : "de"}crementor
      </p>
      <button
        type="button"
        className="btn btn-info btn-outline"
        onClick={() => {
          setCount((c) => (increment ? c + 1 : c - 1));
        }}
      >
        {count} {increment ? " ++" : " --"}
      </button>
    </div>
  );
}
