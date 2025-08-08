'use client';
import { BASE_URL } from '@/lib/constant';
import { useState, useEffect } from 'react';
import { BackButton } from '@/components/customs/common/BackButton';

type BookFormTypeProps = {
  title: string;
  type: 'edit' | 'new';
  data?: any;
};

export const MemberForm = ({ title, type, data }: BookFormTypeProps) => {
  const [memberPh, setMemberPh] = useState<string>('');
  const [memberName, setMemberName] = useState<string>('');
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [memberAddress, setMemberAdress] = useState<string>('');

  useEffect(() => {
    if (type === 'edit') {
      setMemberPh(data?.id_member || '');
      setMemberName(data?.name || '');
      setMemberEmail(data?.email || '');
      setMemberAdress(data?.address || '');
    }
  }, [data]);
  return (
    <div className="mx-auto my-[50px] max-w-[80%] px-6 py-5">
      <BackButton />
      <div className="mx-auto w-[75%] space-y-3 rounded-[20px] bg-neutral-silver p-[30px] ">
        <h1 className="py-2 text-2xl font-bold">{title}</h1>
        <div>
          <label className="mb-1 block font-medium">Member Id</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={memberPh}
            onChange={(e) => setMemberPh(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Name</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Email</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Adress</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3  py-1.5"
            value={memberAddress}
            onChange={(e) => setMemberAdress(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-green-500 py-2 text-white transition hover:bg-green-600"
        >
          SIMPAN BUKU
        </button>
      </div>
    </div>
  );
};
