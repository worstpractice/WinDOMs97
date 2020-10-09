export const focusListener = () => {
  const channel = new BroadcastChannel("focus");

  const tx = (message: string) => {
    channel.postMessage(message);
  };

  const rx = (rxHandler: (message: string) => void) => {
    const inner = ({ data }: MessageEvent) => {
      return rxHandler(data);
    };

    channel.onmessage = inner;
  };

  return { tx, rx } as const;
};
