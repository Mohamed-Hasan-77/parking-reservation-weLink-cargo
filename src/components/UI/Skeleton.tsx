export default function Skeleton() {
  return (
    <div className="card w-80 bg-base-100 shadow-md animate-pulse">
      <div className="card-body space-y-3">
        <div className="h-4 w-3/4 bg-base-300 rounded"></div>
        <div className="h-4 w-1/2 bg-base-300 rounded"></div>
        <div className="h-4 w-full bg-base-300 rounded"></div>
        <div className="h-10 w-24 bg-base-300 rounded mt-4"></div>
      </div>
    </div>
  );
}
