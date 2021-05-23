type LoadingProps = { background: string };

export function Loading({ background }: LoadingProps) {
  return (
    <div className="loading" data-testid="loading">
      <span style={{ background }}></span>
      <span style={{ background }}></span>
      <span style={{ background }}></span>
      <span style={{ background }}></span>
    </div>
  );
}
