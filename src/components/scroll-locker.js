import { scrollLockState } from '@/store';
import { useRecoilValue } from 'recoil';
import { RemoveScroll } from 'react-remove-scroll';

export default function ScrollLocker({ children }) {
  const isScrollLocked = useRecoilValue(scrollLockState);

  return (
    <RemoveScroll
      enabled={isScrollLocked}
      removeScrollBar={false}
    >
      { children }
    </RemoveScroll>
  );
}
