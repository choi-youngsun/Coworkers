import { useModal } from '@hooks/useModal';
import Image from 'next/image';
import GetUserDetailModal from './GetUserDetailModal';
import ExileDropdown from './ExileDropdown';
import ExileUserModal from './ExileUserModal';

export interface MemberProps {
  role: string;
  userImage: string | null;
  userEmail: string;
  userName: string;
}

export default function MemberBox({
  userName,
  userEmail,
  userImage,
  role,
}: MemberProps) {
  const { isOpen, onOpen, onClose } = useModal();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOpenModal,
    onClose: deleteCloseModal,
  } = useModal();
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
  };

  const handleExileClick = () => {
    deleteOpenModal();
  };
  return (
    <>
      <div
        onClick={onOpen}
        className="flex h-[68px] cursor-pointer items-center justify-between gap-[10px] rounded-[16px] bg-background-secondary px-[24px] hover:brightness-110 active:brightness-105 md:h-[73px] xl:w-[384px]"
      >
        <div className="grid grid-cols-[30px_1fr] grid-rows-2 items-center md:grid-cols-[40px_1fr] md:grid-rows-2 md:gap-[5px]">
          <div className="relative my-auto h-[24px] w-[24px] md:col-span-1 md:row-span-2 md:row-start-1 md:mb-[3px] md:h-[34px] md:w-[34px]">
            <Image
              src={userImage || '/icons/profile_large.svg'}
              alt="프로필 사진"
              fill
            />
          </div>

          <div className="ml-[4px] flex items-center gap-[2px] overflow-hidden text-ellipsis whitespace-nowrap text-md-medium md:col-start-2 md:row-start-1 md:ml-0">
            {role === 'ADMIN' && (
              <Image
                src="/images/crown.png"
                alt="왕관 이미지"
                width={15}
                height={15}
              />
            )}
            {userName}
          </div>
          <p className="col-span-2 row-start-2 overflow-hidden text-ellipsis whitespace-nowrap text-xs-regular text-text-secondary">
            {userEmail}
          </p>
        </div>
        <div onClick={handleDropdownClick}>
          <ExileDropdown onSelect={handleExileClick} />
        </div>
      </div>
      <GetUserDetailModal
        isOpen={isOpen}
        onClose={onClose}
        name={userName}
        email={userEmail}
        img={userImage}
        role={role}
      />
      <ExileUserModal
        isOpen={deleteIsOpen}
        onClose={deleteCloseModal}
        memberName={userName}
      />
    </>
  );
}
