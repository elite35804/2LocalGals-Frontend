import { useEffect, useRef } from "react";

async function usePerfectInterval(callback, interval) {
  const expectedTimeRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    // Initialize expected time
    expectedTimeRef.current = Date.now() + interval;

    async function tick() {
      const drift = Date.now() - expectedTimeRef.current;
      expectedTimeRef.current += interval;

      await callback();

      // Schedule the next tick, compensating for drift
      intervalIdRef.current = setTimeout(tick, Math.max(0, interval - drift));
    }

    // Start the interval
    intervalIdRef.current = setTimeout(async () => await tick(), interval);

    // Clear interval on component unmount
    return () => clearTimeout(intervalIdRef.current);
  }, [callback, interval]);
}

export default usePerfectInterval;
