// TODO: add more client side validation to input, and make profile picture a select from a specific list of avatars

export default function Page() {
  return (
    <main>
      <h2 className="font-title text-2xl">Account Settings</h2>
      <form action="" className="mt-5">
        <div className="flex flex-row gap-6 flex-wrap">
          <label className="w-full max-w-64">
            Display Name *
            <input
              type="text"
              name="displayName"
              className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
              required
            />
          </label>
          <label className="w-full max-w-64">
            Profile Picture *
            <input
              type="text"
              name="profilePicture"
              className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
              required
            />
          </label>
          <label className="w-full max-w-64">
            Email *
            <input
              type="email"
              name="email"
              className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="py-1 px-4 mt-5 rounded-full bg-green-dark text-white mr-3"
        >
          Save changes
        </button>
      </form>
      <form action="" className="mt-5">
        <div className="flex flex-row gap-4 mt-12 flex-wrap">
          <label className="w-full max-w-64">
            New password
            <input
              type="password"
              name="password"
              className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
            />
          </label>
          <label className="w-full max-w-64">
            Repeat new password
            <input
              type="password"
              name="password"
              className="block mt-1 px-3 py-1 w-full rounded-full bg-white shadow-lg outline-none"
            />
          </label>
        </div>
        <button
          type="submit"
          className="py-1 px-4 mt-5 rounded-full bg-green-dark text-white mr-3"
        >
          Change password
        </button>
      </form>
    </main>
  );
}
