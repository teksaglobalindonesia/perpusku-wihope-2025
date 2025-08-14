'use client';
import {Card} from '@/components/custom/card';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BASE_URL, TOKEN, WIHOPE_NAME } from '@/lib/constant';

interface Loan {
  documentId: string;
  member: { name: string };
  book: { title: string };
  loan_date: string;
  return_date: string;
}

export const AddReturnForm = () => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [actualReturnDate, setActualReturnDate] = useState<string>('');
  const [loanData, setLoanData] = useState<Loan[]>([]);
  const [message, setMessage] = useState<string>('');

  // Fetch daftar peminjaman
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/loan/list`, {
          headers: {
            Authorization: TOKEN,
            'x-wihope-name': WIHOPE_NAME
          },
          cache: 'no-store'
        });

        if (!res.ok) throw new Error('Gagal muat data peminjaman');

        const json = await res.json();
        setLoanData(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  const handleSelectLoan = (index: number) => {
    const loan = loanData[index];
    if (!loan) return;
    setSelectedLoan(loan);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!selectedLoan || !actualReturnDate) {
      setMessage('Pilih peminjaman dan isi tanggal pengembalian.');
      return;
    }

    const payload = {
      data: {
        loan: selectedLoan.documentId,
        actual_return_date: actualReturnDate
      }
    };

    try {
      const res = await fetch(`${BASE_URL}/api/return/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: TOKEN,
          'x-wihope-name': WIHOPE_NAME
        },
        body: JSON.stringify(payload),
        cache: 'no-store'
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Pengembalian berhasil dicatat.');
        setSelectedLoan(null);
        setActualReturnDate('');
      } else {
        setMessage(`Gagal: ${result.message || 'Terjadi kesalahan.'}`);
      }
    } catch (error) {
      setMessage('Terjadi kesalahan saat mengirim data.');
      console.error('Error submitting return:', error);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg border border-vintage-brown/20 bg-vintage-pparchment p-6 shadow-sm">
      <h1 className="border-b border-vintage-brown/30 pb-2 font-vintage text-3xl font-semibold text-vintage-ink">
        Catat Pengembalian Buku
      </h1>

      {message && (
        <div
          className={`rounded p-3 text-sm ${
            message.includes('berhasil')
              ? 'border border-green-200 bg-green-50 text-green-700'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-flow-row grid-cols-2 gap-4 rounded-xl border border-vintage-brown/30 bg-beige-200 p-5 shadow-inner"
      >
        {/* Pilih Peminjaman */}
        <div className="flex flex-col gap-2">
          <Label className="font-vintage font-medium text-vintage-ink/80">
            Peminjaman
          </Label>
          <Dialog>
            <DialogTrigger asChild>
              <Input
                type="text"
                value={
                  selectedLoan
                    ? `${selectedLoan.book.title} - ${selectedLoan.member.name}`
                    : ''
                }
                readOnly
                placeholder={
                  loanData.length ? 'Pilih peminjaman..' : 'Memuat data...'
                }
                className="h-8 cursor-pointer rounded-md text-center focus:outline-vintage-parchment"
              />
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-vintage">
                  Pilih Peminjaman
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Card
                  cardItems={loanData.map((loan) => ({
                    title: loan.book.title,
                    peminjam: loan.member.name,
                    peminjaman: new Date(loan.loan_date).toLocaleDateString(
                      'id-ID'
                    ),
                    pengembalian: new Date(loan.return_date).toLocaleDateString(
                      'id-ID'
                    ),
                    label: 'dipinjam', // asumsi semua belum dikembalikan
                    showButton: false
                  }))}
                  selectMode={true}
                  onSelect={handleSelectLoan}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tanggal Pengembalian Sebenarnya */}
        <div className="flex flex-col gap-2">
          <Label className="font-vintage font-medium text-vintage-ink/80">
            Tanggal Pengembalian
          </Label>
          <Input
            type="date"
            value={actualReturnDate}
            onChange={(e) => setActualReturnDate(e.target.value)}
            className="h-8 rounded-md text-center focus:outline-vintage-terracotta"
            required
          />
        </div>
      </form>

      <Button
        type="submit"
        onClick={handleSubmit}
        className="w-48 self-start rounded-md border border-vintage-terracotta bg-vintage-terracotta px-4 py-2 font-vintage text-sm font-medium text-beige-50 shadow-md transition-all duration-200 hover:bg-vintage-terracotta/90 focus:outline-none focus:ring-2 focus:ring-vintage-terracotta/50 focus:ring-offset-1 active:translate-y-0.5"
      >
        <span className="drop-shadow-sm">Tambah Pengembalian</span>
      </Button>
    </div>
  );
};
