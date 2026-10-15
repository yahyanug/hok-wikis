export function GameIcon({ name, className = "" }: Readonly<{ name: string; className?: string }>) {
  const paths: Record<string, string> = {
    FIGHTER: "m4 3 13 13m-2 3 4-4M3 4l1 4 12 12 4-4L8 4 3 3m17 1L7 17m-4-2 6 6M21 3l-5 1-4 4m-4 4-5 5 4 4 5-5",
    ASSASSIN: "M19 3c1 7-1 15-8 17-4 1-8-1-7-5 0-4 4-5 7-5 1-4 4-5 8-7ZM8 15c3 3 7-1 7-4",
    MAGE: "M12 2c-1 4-5 6-5 10a5 5 0 0 0 10 0c0-4-4-6-5-10Zm-7 17c4 3 10 3 14 0M8 23h8",
    MARKSMAN: "M4 4c12 0 16 4 16 16M4 4l16 16M4 20 20 4m-6 0h6v6M5 10l-2 9 9-2",
    TANK: "M12 2 3 6v6c0 5 6 9 9 10 3-1 9-5 9-10V6l-9-4Zm0 5v10",
    SUPPORT: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z",
    ALL: "M12 2v20M2 12h20M5 5l14 14M5 19 19 5",
    book: "M12 5v16M3 3c4-1 7 0 9 2 2-2 5-3 9-2v16c-4-1-7 0-9 2-2-2-5-3-9-2V3Z",
    warning: "m12 2 10 19H2L12 2Zm0 6v6m0 3v1",
    sun: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    game: "M7 6h10c3 0 5 10 4 12-1 2-4-2-5-3H8c-1 1-4 5-5 3C2 16 4 6 7 6Zm0 3v5m-2-2h4m6-1h1m2 2h1",
    lane: "M4 4h7M4 4v7m16 9h-7m7 0v-7M4 20 20 4m-7 0h7v7",
  };
  return <svg className={`game-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.lane} /></svg>;
}
