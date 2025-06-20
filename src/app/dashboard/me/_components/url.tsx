import { Button } from "@/components/ui/button";


export function UrlPreview() {
  return (
    <div className="flex items-center flex-1 p-2 text-gray-100">
        <form className="flex-1 flex flex-col"> 
        <div className="flex items-center justify-center w-full">
        <p>
            {process.env.NEXT_PUBLIC_HOST_URL}/creator/
        </p>
        <input
          type="text"
          className="flex-1 outline-none border h-9 border-gray-300 text-black rounded-md"
        />
        </div>

        <Button type="submit">
          Create URL
        </Button>
    </form>
    </div>
  );
}