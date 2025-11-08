'use client';
import { BASE_URL } from '@/lib/constant';
import { useState, useEffect } from 'react';
import { BackButton } from '@/components/customs/common/BackButton';
import { fetcher } from '@/lib/fetcher';
import { trim } from '@/lib/trim';

type BookFormTypeProps = {
  title: string;
  type: 'edit' | 'new';
  data?: any;
};

export const MemberForm = ({ title, type, data }: BookFormTypeProps) => {
  const [memberId, setMemberId] = useState<string>('');
  const [memberName, setMemberName] = useState<string>('');
  const [memberEmail, setMemberEmail] = useState<string>('');
  const [memberAddress, setMemberAdress] = useState<string>('');
  const [documentId, setDocumentId] = useState<string>('');
  const [error, setError] = useState<any>('');

  const handleInsertAndUpdateUserData = async () => {
    if (!trim([memberId, memberName, memberEmail, memberAddress])) {
      return setError('Tolong lengkapi form');
    }

    const requestBody = {
      id_member: memberId,
      name: memberName,
      email: memberEmail,
      address: memberAddress
    };

    const response = await fetcher({
      path: type == 'new' ? '/member/add' : '/member/edit',
      body: {
        documentId,
        data: requestBody
      },
      method: type == 'new' ? 'POST' : 'PATCH',
      pagination: {
        isActive: false
      }
    });

    console.log(response);

    if (response.status != 200) {
      setError('Gagal mengunggah data');
      return;
    }
    window.location.reload();
  };

  useEffect(() => {
    if (type === 'edit') {
      setMemberId(data?.id_member || '');
      setMemberName(data?.name || '');
      setMemberEmail(data?.email || '');
      setMemberAdress(data?.address || '');
      setDocumentId(data?.documentId || '');
    }
  }, [data]);
  return (
    <div className="mx-auto px-6 py-5 md:my-[50px] md:max-w-[80%]">
      <BackButton />
      <div
        className="mt-15 mx-auto
       w-full space-y-3 rounded-[20px] bg-neutral-silver p-[30px] sm:mt-auto md:w-[75%]"
      >
        <h1 className="py-2 text-2xl font-bold">{title}</h1>
        {error.trim() != '' && <p className="text-action-error">{error}</p>}
        <div>
          <label className="mb-1 block font-medium">Member Id</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3 py-1.5"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Name</label>
          <input
            type="text"
            className="w-full rounded-[5px] border-2 border-brand-primary px-3 py-1.5"
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
          onClick={handleInsertAndUpdateUserData}
        >
          {type == 'new' ? 'SIMPAN ANGGOTA' : 'SIMPAN PERUBAHAN'}
        </button>
      </div>
    </div>
  );
};
