import { Buku } from "@/components/custom/buku";
import { TOKEN,WIHOPE_NAME,BASE_URL} from "@/lib/constant";

export default async function Page() {
  
  const res = await fetch(
    `${BASE_URL}/api/book/list`,
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

  const dataBukus = await res.json();
  return <Buku items={dataBukus?.data ?? []} />;
}
  
