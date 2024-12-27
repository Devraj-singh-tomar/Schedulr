import React from "react";

export function Features() {
  return (
    <div className="py-24">
      <h1 className="text-center text-xl lg:text-4xl text-primary underline">
        Features
      </h1>
      <div className="max-w-2xl mx-auto lg:text-center mt-5 text-lg">
        <p className="font-semibold leading-7 text-gray-700">
          Schedule meetings faster
        </p>
        <p className="font-semibold leading-7 text-gray-700">Secure user</p>
        <p className="font-semibold leading-7 text-gray-700">
          Create, delete, edit and share your events
        </p>
        <p className="font-semibold leading-7 text-gray-700">
          Sync with your all calendars
        </p>
        <p className="font-semibold leading-7 text-gray-700">Easy to use</p>
      </div>
    </div>
  );
}
