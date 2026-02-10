"use client";
function error({ error, reset }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

export default error;
