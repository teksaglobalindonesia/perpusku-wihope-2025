import { Tah_pinjam } from "@/components/custom/peminjam_tambah";
import { TOKEN, WIHOPE_NAME, BASE_URL } from "@/lib/constant";

export default async function Page() {
  const [resBuku, resAnggota] = await Promise.all([
    fetch(`${BASE_URL}/api/book/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        'x-wihope-name': WIHOPE_NAME,
      },
      cache: 'no-store'
    }),
    fetch(`${BASE_URL}/api/member/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: TOKEN,
        'x-wihope-name': WIHOPE_NAME,
      },
      cache: 'no-store'
    })
  ]);

  const bukuJson = await resBuku.json();
  const anggotaJson = await resAnggota.json();

  const dataBuku = bukuJson?.data?.map((b: any) => ({
    ...b,
    type: "buku"
  })) ?? [];

  const dataAnggota = anggotaJson?.data?.map((a: any) => ({
    ...a,
    type: "anggota"
  })) ?? [];

  const combined = [...dataBuku, ...dataAnggota];

  return <Tah_pinjam items={combined} />;
}
