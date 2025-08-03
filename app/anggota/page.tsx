import { Anggota } from "@/components/custom/anggota";
import { TOKEN,WIHOPE_NAME,BASE_URL} from "@/lib/constant";

export default async function Page() {

   const res = await fetch(
      `${BASE_URL}/api/member/list`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME,
        },
        cache: 'no-store'
      }
    );
  const resultJson = await res.json();
  return (
      <Anggota items={resultJson?.data} />
  );
}