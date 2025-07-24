'use client';
import { CardGambar } from './cardGambar';

export const BCard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 ">
        <CardGambar
          cardItems={[
            {
              imageSrc:
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              title: 'The Great Adventure',
              genre: 'Petualangan',
              author: 'John Explorer',
              stock: 5,
              buttons: ['edit', 'delete']
            },
            {
              imageSrc:
                'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              title: 'Science Fundamentals',
              genre: 'Sains',
              author: 'Dr. Amelia Watson',
              stock: 0,
              buttons: ['edit', 'delete']
            },
            {
              imageSrc:
                'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              title: 'Romantic Nights',
              genre: 'Romansa',
              author: 'Clara Lovegood',
              stock: 3,
              buttons: ['edit', 'delete']
            },
            {
              imageSrc:
                'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              title: 'Mystery of the Old House',
              genre: 'Misteri',
              author: 'Arthur Conan',
              stock: 7,
              buttons: ['edit', 'delete']
            },
            {
              imageSrc:
                'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
              title: 'Programming Basics',
              genre: 'Teknologi',
              author: 'Alan Turing',
              stock: 0,
              buttons: ['delete', 'edit']
            }
          ]}
          onEdit={(index) => console.log('Edit item', index)}
          onDelete={(index) => console.log('Delete item', index)}
        />
      </div>
      <div className="flex justify-center gap-2 mt-8">
        <button className="rounded-md border border-beige-300 bg-beige-100 px-3 py-1 font-vintage text-beige-700 shadow-inner hover:bg-beige-200">
          Prev
        </button>
        <button className="rounded-md border border-beige-400 bg-beige-300 px-3 py-1 font-vintage text-beige-800 shadow-inner">
          1
        </button>
        <button className="rounded-md border border-beige-300 bg-beige-100 px-3 py-1 font-vintage text-beige-700 shadow-inner hover:bg-beige-200">
          Next
        </button>
      </div>
    </div>
  );
};
