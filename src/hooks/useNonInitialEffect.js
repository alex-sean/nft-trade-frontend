import { useEffect, useRef } from "react";

export const useNonInitialEffect = (effect, deps, initialDeps) => {
	const initialRender = useRef(true);

	useEffect(() => {
		let effectReturns = () => {};

        if (initialRender.current) {
            for (let i in deps) {
                if (deps[i] !== initialDeps[i]) {
                    initialRender.current = false;
                    break;
                }
            }
		}

        if (!initialRender.current) {
			effectReturns = effect();
		}

		if (effectReturns && typeof effectReturns === "function") {
			return effectReturns;
		}
	}, deps);
};