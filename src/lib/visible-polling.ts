export interface VisiblePollingOptions {
  poll: (signal: AbortSignal) => Promise<void>;
  intervalMs: number;
  eventName?: string;
  documentRef?: Pick<Document, 'visibilityState' | 'addEventListener' | 'removeEventListener'>;
  windowRef?: Pick<Window, 'addEventListener' | 'removeEventListener'>;
  setIntervalFn?: typeof setInterval;
  clearIntervalFn?: typeof clearInterval;
}

export function startVisiblePolling({
  poll,
  intervalMs,
  eventName,
  documentRef = document,
  windowRef = window,
  setIntervalFn = setInterval,
  clearIntervalFn = clearInterval,
}: VisiblePollingOptions): () => void {
  let disposed = false;
  let inFlight = false;
  let controller: AbortController | null = null;

  const run = async () => {
    if (disposed || inFlight || documentRef.visibilityState === 'hidden') return;

    inFlight = true;
    controller = new AbortController();
    try {
      await poll(controller.signal);
    } finally {
      inFlight = false;
      controller = null;
    }
  };

  const onVisibilityChange = () => {
    if (documentRef.visibilityState === 'visible') void run();
  };
  const onMutation = () => void run();

  void run();
  const interval = setIntervalFn(() => void run(), intervalMs);
  documentRef.addEventListener('visibilitychange', onVisibilityChange);
  if (eventName) windowRef.addEventListener(eventName, onMutation);

  return () => {
    disposed = true;
    clearIntervalFn(interval);
    documentRef.removeEventListener('visibilitychange', onVisibilityChange);
    if (eventName) windowRef.removeEventListener(eventName, onMutation);
    controller?.abort();
  };
}
