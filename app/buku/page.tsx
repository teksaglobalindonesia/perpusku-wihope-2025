import { Buku } from "@/components/custom/buku";

export default async function Page() {
  
  return (
    <>
      <Buku items={[
              {
                title: 'The Crimes of Steamfield',
                genre: 'Misteri',
                penulis: 'Alan captos', 
                status: 0       
                
              },
              {
                title: 'Red And White',
                genre: 'Comedi',
                penulis: 'Lisa laura',
                status: 1        
              },
              {
                title: 'Red And White',
                genre: 'Comedi',
                penulis: 'Lisa laura',
                status: 0        
              },
              {
                title: 'Red And White',
                genre: 'Comedi',
                penulis: 'Lisa laura',
                status: 0       
              },
              {
                title: 'Red And White',
                genre: 'Comedi',
                penulis: 'Lisa laura',
                status: 2       
              },
              {
                title: 'Red And White',
                genre: 'Comedi',
                penulis: 'Lisa laura',
                status: 2        
              },
              {
                title: 'Red And White',
                genre: 'Comedi',
                penulis: 'Lisa laura',
                status: 1        
              },
            ]}/>
       </>
  );
}