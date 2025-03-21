export const metadata = {
  title: "Style Demonstration",
};

export default function Page() {
  return (
    <div className="mx-auto w-3/4 py-4 prose max-w-none">
      <h1>This is the styling demonstration page</h1>
      <p>
        The default font for all text is Literata, but when a heading is inside
        a .prose element, the Playfair Display font family is used for the
        heading
      </p>
      <p>
        The @tailwindcss/typography plugin adds the .prose class (among others),
        that add a default font size for headings, makes lists display as such,
        etc.
      </p>
      <p>
        The .prose class is used on this page, but it is not mandatory. We will
        probably use it on the seller profile or other pages that will hold more text
      </p>
      <h1>This is an h1 on Playfair Display</h1>
      <h2>This is an h2 on Playfair Display</h2>
      <h3>This is an h3 on Playfair Display</h3>
      <h4>This is an h4 on Playfair Display</h4>
      <h5>This is an h5 on Playfair Display</h5>
      <h6>This is an h6 on Playfair Display</h6>
      <p>This is some body text on Literata</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
        eligendi magnam laudantium vitae quia rerum natus iure doloremque et
        quo. Deleniti magni minus facilis. Natus consequuntur nam enim
        necessitatibus ex!
      </p>
      <h2>Colors: </h2>
      <div className="grid grid-cols-4">
        <div className="h-8 bg-green-dark text-white">bg-green-dark</div>
        <div className="h-8 bg-green-mediun text-white">bg-green-mediun</div>
        <div className="h-8 bg-green-desaturated text-white">
          bg-green-desaturated
        </div>
        <div className="h-8 "></div>
        <div className="h-8 bg-terracota-dark text-white">
          bg-terracota-dark
        </div>
        <div className="h-8 bg-terracota-medium text-white">
          bg-terracota-medium
        </div>
        <div className="h-8 bg-terracota-light"> bg-terracota-light</div>
        <div className="h-8 bg-terracota-lighter"> bg-terracota-lighter</div>
      </div>
      <div className="grid grid-cols-4">
        <div className="h-8 text-green-dark">text-green-dark</div>
        <div className="h-8 text-green-mediun">text-green-mediun</div>
        <div className="h-8 text-green-desaturated">text-green-desaturated</div>
        <div className="h-8 "></div>
        <div className="h-8 text-terracota-dark">text-terracota-dark</div>
        <div className="h-8 text-terracota-medium">text-terracota-medium</div>
        <div className="h-8 text-terracota-light bg-stone-700">
          text-terracota-light
        </div>
        <div className="h-8 text-terracota-lighter bg-stone-700">
          text-terracota-lighter
        </div>
      </div>
    </div>
  );
}
