"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Store = {
  id: string;
  name: string;
};

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  item: Store;
}

export default function StoreSwitcher({
  className,
  item,
}: StoreSwitcherProps) {
  const [open, setOpen] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const activeStore = item;

  const onStoreChange = (store: Store) => {
    setOpen(false);
    router.push(`/restaurant/${store.id}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          {activeStore?.name || "Select a store"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Store">
              <CommandItem onSelect={() => onStoreChange(item)}>
                <Check className="mr-2 h-5 w-5 cursor-pointer" />
                {item?.name || "Select a store"}
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  router.push(`/${params.userId}/create-restaurant`);
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5 cursor-pointer" />
                Create a Restaurent
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
