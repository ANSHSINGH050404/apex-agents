
import Image from "next/image";

interface LoadingStateProps {
  title?: string;
  description?: string;
  
}

export const EmptyState = ({ 
  title = "Loading ", 
  description = "This may take a moment...",
 
}: LoadingStateProps) => {
  
  return (
    <div className={`flex flex-col items-center justify-center `}>
      <Image src="/empty.svg" alt="Empty" width={240} height={240} />
      <div className="flex flex-col gap-y-3 max-w-md mx-auto text-center">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};