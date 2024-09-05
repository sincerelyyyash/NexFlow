

import { ModeToggle } from './theme-toggle';

function Navbar() {
  return (
    <div className="flex flex-row justify-between items-center px-4 py-2 w-full">
      <div className="text-xl md:text-3xl font-bold flex flex-row items-center gap-2">
        <span className="hidden sm:inline">NexFlow</span>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
