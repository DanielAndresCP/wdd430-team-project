import ReviewCard from "@/components/reviewCard";

const reviews = [
  {
    date: "01/01/2025",
    stars: 4,
    content: "some lorem ipsum dolor sit amet",
    user: "some user",
    productName: "wooden spoon",
  },
  {
    date: "01/01/2025",
    stars: 4,
    content: null,
    user: "some user",
    productName: "wooden spoon",
  },
  {
    date: "01/01/2025",
    stars: 3,
    content: null,
    user: "some user",
    productName: "wooden spoon",
  },
  {
    date: "01/01/2025",
    stars: 1,
    content: null,
    user: "some user",
    productName: "wooden spoon",
  },
  {
    date: "01/01/2025",
    stars: 0,
    content: "officialy the worst",
    user: "some user",
    productName: "wooden crocs",
  },
];

export default function Page() {
  return (
    <main>
      <h2 className="font-title text-2xl mb-6">Reviews to my products</h2>
      <div className="grid gap-6 justify-items-center sm:justify-items-normal grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
        {reviews.map((x, i) => (
          <ReviewCard
            key={i}
            date={x.date}
            productName={x.productName}
            stars={x.stars}
            user={x.user}
            content={x.content}
          />
        ))}
      </div>
    </main>
  );
}
