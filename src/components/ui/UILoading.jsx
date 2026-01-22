"use client";

import Loading from "./loading";

const UILoading = ({ children, loading = false }) => {
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loading />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default UILoading;
