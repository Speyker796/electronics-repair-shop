import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center pt-16 min-h-screen bg-base-100">
      <div>
        <label class="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="emerald"
            class="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
      <h1 className="text-3xl font-bold mb-8">Welcome to my page!</h1>

      <div className="flex flex-wrap justify-center gap-4">
        <a href="/customer" className="btn btn-outline btn-primary text-lg">
          Show all customers
        </a>
        <a href="/device" className="btn btn-outline btn-primary text-lg">
          Show all devices
        </a>
        <a href="/order" className="btn btn-outline btn-primary text-lg">
          Show all orders
        </a>
      </div>
    </div>
  );
}

export default Home;
