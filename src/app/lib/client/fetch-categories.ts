export async function fetchCategories() {
    try {
      const res = await fetch("/api/categories", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch categories");
      return (await res.json()).categories;
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
      return [];
    }
  }
  