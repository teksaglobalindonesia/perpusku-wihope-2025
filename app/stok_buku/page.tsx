import { Cartsatu } from "@/components/custom/cart_stok_buku";

export default async function Page() {

    return (
        <>
            <Cartsatu items={[
                {
                    title: 'Mondo',
                    genre: 'Misteri',
                    penulis: 'Alan captos',
                    status: true
                },
                {
                    title: 'Red And White',
                    genre: 'Comedi',
                    penulis: 'Lisa laura',
                    status: false
                },
                {
                    title: 'The Crimes of Steamfield',
                    genre: 'Misteri',
                    penulis: 'Alan captos',
                    status: true
                },
                {
                    title: 'Liyue',
                    genre: 'Comedi',
                    penulis: 'Lisa laura',
                    status: false
                },
                {
                    title: 'The Crimes of Steamfield',
                    genre: 'Misteri',
                    penulis: 'Alan captos',
                    status: true
                },
                {
                    title: 'Red And White',
                    genre: 'Comedi',
                    penulis: 'Lisa laura',
                    status: false
                },
                {
                    title: 'Sumeru',
                    genre: 'Misteri',
                    penulis: 'Alan captos',
                    status: true
                },
                {
                    title: 'Red And White',
                    genre: 'Comedi',
                    penulis: 'Lisa laura',
                    status: false
                },
                {
                    title: 'The Crimes of Steamfield',
                    genre: 'Misteri',
                    penulis: 'Alan captos',
                    status: true
                },
                {
                    title: 'Natlan',
                    genre: 'Comedi',
                    penulis: 'Lisa laura',
                    status: false
                },
                {
                    title: 'The Crimes of Steamfield',
                    genre: 'Misteri',
                    penulis: 'Alan captos',
                    status: true
                },
                {
                    title: 'UI/UX',
                    genre: 'Comedi',
                    penulis: 'Lisa laura',
                    status: false
                },
            ]} />
        </>
    );
}