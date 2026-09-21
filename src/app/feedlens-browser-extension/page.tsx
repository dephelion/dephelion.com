import Moved, { movedMetadata } from '@/components/Moved';
import { UFEED_PATH } from '@/lib/ufeed';

export const metadata = movedMetadata;

/** The extension's name before uFeed; kept so links from before the rename still land. */
export default function OldNamePage() {
  return <Moved to={`${UFEED_PATH}`} />;
}
