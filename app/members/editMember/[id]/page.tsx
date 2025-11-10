import { MEdit } from "@/components/custom/MEdit";

export default function page ({params} : {params: {id:string}}) {
  return (
    <>
    <MEdit id={params.id}/>
    </>
  )
}