import BukuList from "@/components/custom/buku/buku";

export default async function BukuPage() {
  const response = await fetch(
    'https://cms-perpusku.widhimp.my.id/api/book/list',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 41f0305043bf00843f3bc3c04d2201b51347f1bd98a0500248ec9b411fa0ad2dfb49563c46395439627e931db897841ca95f756f34ea8fe229f33641e45123732c362be24550a849bb67379afef4f1b0f9c5a30746cfbaa82825f3f9e9d4b62c14892afd3f520c614e6269404210184628530738a3037e0e246d0bc2cf655e75',
      },
      cache: 'no-store',
    }
  );

  const json = await response.json();
  const data = json.data;

  return (
    <main className="px-6 py-8">
      <BukuList data={data} />
    </main>
  );
}
