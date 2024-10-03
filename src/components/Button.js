"use client"

export function ButtonSubmit ({ children, ...props }) {
    return (
      <button
        type="submit"
        className="w-full bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300"
        {...props}
      >
        {children}
      </button>
    );
  };

export function Button ({ children, ...props }) {
    return (
     <button
        type="button"
        className="w-full bg-white text-emerald-500 py-2 rounded-md border border-emerald-500 hover:bg-emerald-100"
        {...props}
        >
          {children}
        </button>
      );
    };
