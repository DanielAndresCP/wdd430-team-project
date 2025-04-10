// TODO: add more client side validation to input

// TODO: add fetch here
const allCategories = [
  { displayName: "Woodworking", id: "woodworking" },
  { displayName: "Furniture", id: "furniture" },
  { displayName: "Metalworking", id: "metalworking" },
];

// TODO: add fetch here
const creatorCategories = [{ displayName: "Metalworking", id: "metalworking" }];

export default function Page() {
  return (
    <main>
      <h2 className="font-title text-2xl">Seller Profile Settings</h2>
      <form action="" className="mt-5">
        <div className="flex flex-col gap-6">
          <label className="w-full max-w-none">
            Short Biography *
            <textarea
              name="shortBio"
              className="block mt-1 px-3 py-2 w-full rounded-t-2xl rounded-l-2xl bg-white shadow-lg outline-none"
              rows={3}
            ></textarea>
          </label>
          <label className="w-full max-w-none">
            Full Biography *
            <textarea
              name="fullBio"
              className="block mt-1 px-3 py-2 w-full rounded-t-2xl rounded-l-2xl bg-white shadow-lg outline-none"
              rows={10}
            ></textarea>
          </label>
          <fieldset>
            <legend>Specialties *</legend>
            {allCategories.map((x, i) => (
              <label key={i} className="block">
                <input
                  type="checkbox"
                  name="specialties"
                  className="mr-2"
                  defaultChecked={creatorCategories.some(
                    (px) => px.id === x.id
                  )}
                />
                {x.displayName}
              </label>
            ))}
          </fieldset>
        </div>
        <button
          type="submit"
          className="py-1 px-4 mt-5 rounded-full bg-green-dark text-white mr-3"
        >
          Save changes
        </button>
      </form>
    </main>
  );
}
