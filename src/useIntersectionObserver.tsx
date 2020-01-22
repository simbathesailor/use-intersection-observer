import React from 'react';
import useRefCallback from './useRefCallback';

const initialState = {
  intersectionObj: {},
  observerInState: null,
  isVisible: false,
};

interface Iaction {
  type: string;
  data: any;
}
interface Window {
  IntersectionObserver: Function;
}
function useHotRefs(value: any): [React.MutableRefObject<any>] {
  const fnRef = React.useRef(value);

  React.useEffect(() => {
    fnRef.current = value;
  });

  return [fnRef];
}

function IntersectionObserverReducer(state: any, action: Iaction) {
  switch (action.type) {
    case 'SETINTERSECTIONOBJ': {
      return {
        ...state,
        intersectionObj: action.data,
      };
    }
    case 'SETOBSERVERHANDLE': {
      return {
        ...state,
        observerInState: action.data,
      };
    }
    case 'SET_VISIBILITY': {
      return {
        ...state,
        isVisible: action.data,
      };
    }
    case 'SPREAD_VALUES': {
      return {
        ...state,
        ...action.data,
      };
    }
  }
}

const checkFeasibility = () => {
  // let windowMY: IWindow = window;
  let MyWindow: Window = window;
  if (!MyWindow || !MyWindow.IntersectionObserver) {
    console.warn(
      'Intersection Observer is not supported in the current browser / environment'
    );
    return false;
  }
  return true;
};
interface IOptions {
  rootMargin?: string;
  threshold?: string;
  when?: boolean;
  callback?: Function;
  visibilityCondition?: (entry: IntersectionObserverEntry) => boolean;
}

type useIntersectionObserverReturn = [
  boolean,
  any,
  any,
  React.MutableRefObject<any>
];

/***
 * To use the the intersection Observer
 * visibiltyCondition call back can sent , which will be having access to
 * intersection entry object
 * Read https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * about various attributes provided by entries
 * Each entry describes an intersection change for one observed
 *  target element:
 *  entry.boundingClientRect
 *  entry.intersectionRatio
 *  entry.intersectionRect
 *  entry.isIntersecting
 *  entry.rootBounds
 *  entry.target
 *  entry.time
 */
const defaultVisibilityCondition = (
  entry: IntersectionObserverEntry,
  /* tslint:disable:no-unused-variable */
  observer: IntersectionObserver
) => {
  if (entry.intersectionRatio >= 1) {
    return true;
  }
  return false;
};

const defaultOptions = {
  rootMargin: '0px 0px 0px 0px',
  threshold: '0, 1',
  when: true,
  visibilityCondition: defaultVisibilityCondition,
};

// function useRefCallback(): [null | HTMLElement, Function] {
//   const [elem, setELem] = React.useState(null);
//   const elemCallbackRef: IRefFunctionCallback = React.useCallback(elem => {
//     setELem(elem);
//     elemCallbackRef.current = elem;
//   }, []);
//   return [elem, elemCallbackRef];
// }
function useIntersectionObserver(
  options: IOptions
): useIntersectionObserverReturn {
  const { rootMargin, threshold, when, callback, visibilityCondition } = {
    ...defaultOptions,
    ...options,
  };
  const [rootElemNew, rootCallbackRef] = useRefCallback();
  const [targetElement, targetElementCallback] = useRefCallback();

  const [state, dispatch] = React.useReducer(
    IntersectionObserverReducer,
    initialState
  );

  const { observerInState, isVisible } = state;

  const observerRef = React.useRef<any>(null);
  const callbackRef = React.useRef<any>(null);

  function callbackResolved(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ): any {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!observerInState) {
        dispatch({
          type: 'SETOBSERVERHANDLE',
          data: observer,
        });
      }
      let finalVisibilityFunction = defaultVisibilityCondition;
      if (visibilityCondition) {
        finalVisibilityFunction = visibilityCondition;
      }
      console.log('I will call the funnnnnnn');
      dispatch({
        type: 'SPREAD_VALUES',
        data: {
          intersectionObj: entry,
          isVisible: finalVisibilityFunction(entry, observerRef.current),
        },
      });
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
    });
  }
  const [newCallbackDefault] = useHotRefs(callbackResolved);

  /**
   * Setting callback Ref
   */
  React.useEffect(() => {
    if (!checkFeasibility) {
      return;
    }
    if (!callback) {
      let callbackDefault = newCallbackDefault.current;
      callbackRef.current = callbackDefault;
    } else {
      callbackRef.current = callback;
    }
  }, [callback, visibilityCondition, newCallbackDefault]);

  /**
   * unobserving intersectionobserver when "when" key is false
   */
  React.useEffect(() => {
    if (!checkFeasibility) {
      return;
    }
    if (!when) {
      if (observerRef.current && observerRef.current != null && targetElement) {
        observerRef.current.unobserve(targetElement);
        dispatch({
          type: 'SETOBSERVERHANDLE',
          data: null,
        });
      }
    }
  }, [observerRef, targetElement, when]);

  /**
   * Effect responsible for creating intersection observer and
   * registering the observer for specific element
   */
  // uwc-debug
  React.useEffect(() => {
    if (!checkFeasibility) {
      return;
    }
    const currentELem = targetElement;
    const currentRootElem = rootElemNew;
    if (when) {
      let observer = new IntersectionObserver(callbackRef.current, {
        root: currentRootElem || null,
        threshold: threshold.split(',').map(elem => parseFloat(elem)),
        rootMargin,
      });
      observerRef.current = observer;

      if (currentELem && observerRef.current) {
        observerRef.current.observe(currentELem);
      }
    }
    return () => {
      // if (currentELem && observerRef.current) {
      //   observerRef.current.unobserve(currentELem);
      // }
    };
  }, [targetElement, rootElemNew, rootMargin, when, callbackRef, threshold]);

  return [
    isVisible,
    targetElementCallback,
    rootCallbackRef,
    observerRef.current,
  ];
}

export { useIntersectionObserver };
