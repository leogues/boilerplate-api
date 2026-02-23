function elapsedSeconds(startTime: number): number {
  return (performance.now() - startTime) / 1_000;
}

export { elapsedSeconds };
