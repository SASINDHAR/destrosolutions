import { useEffect, useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { sitePath } from './site-path';
export default function SiteSearch({
  entries,
}: {
  entries: [string, [string, string]][];
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="search-launch"
          aria-label="Search the website"
        >
          <Search size={18} />
          <span>Search</span>
          <kbd>⌘ / Ctrl K</kbd>
        </DialogTrigger>
        <DialogContent className="site-search-dialog">
          <DialogHeader>
            <DialogTitle>Find your next step.</DialogTitle>
            <DialogDescription>
              Search the platform, capabilities, industries and contact pages.
            </DialogDescription>
          </DialogHeader>
          <Command className="site-search-command">
            <CommandInput
              placeholder="Try automotive, response or suppliers…"
              aria-label="Search website pages"
            />
            <CommandList>
              <CommandEmpty>
                No matching pages. Try “platform”, “industry” or “contact”.
              </CommandEmpty>
              <CommandGroup heading="Explore DestroSolutions">
                {entries.map(([path, [title, description]]) => (
                  <CommandItem
                    key={path}
                    value={title + ' ' + description + ' ' + path}
                    onSelect={() => {
                      setOpen(false);
                      window.location.assign(sitePath(path));
                    }}
                  >
                    <div>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </div>
                    <ArrowUpRight size={17} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <p className="search-hint">
            ↑ ↓ to navigate · Enter to open · Esc to close
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
