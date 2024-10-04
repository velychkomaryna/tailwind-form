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

export function Button ({ children, fullWidth = false, ...props }) {
    return (
     <button
        type="button"
        className={`bg-white text-emerald-500 p-2 rounded-md border border-emerald-500 hover:bg-emerald-100 ${ fullWidth ? 'w-full' : ''}`}
        {...props}
        >
          {children}
        </button>
      );
    };
