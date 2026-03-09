import { useCallback, useState } from "react";

export function useDisclosure() {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return {
    open,
    onClose,
    onOpen,
    onToggle,
  };
}
