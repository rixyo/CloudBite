'use client';
import {MoveLeft} from 'lucide-react'
import { useRouter } from 'next/navigation';
interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
    const router = useRouter()
  return (
    <div>
        <div className='flex items-center gap-5'>
            <MoveLeft size={24}  className='cursor-pointer' onClick={()=>router.push('/admin-actions')} />
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
