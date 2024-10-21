import Button from '@components/@shared/Button';
import { Modal } from '@components/@shared/Modal';
import Image from 'next/image';

interface DeleteTeamModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function DeleteTeamModal({
  isOpen,
  closeModal,
}: DeleteTeamModalProps) {
  const handleDeleteClick = () => {
    console.log('팀 정보 삭제 완료!');
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      isXButton
      onClose={closeModal}
      array="column"
      padding="default"
      bgColor="primary"
      fontSize="16"
      fontArray="center"
      gap="40"
    >
      <Modal.Wrapper array="column">
        <Modal.Header
          fontColor="primary"
          className="flex flex-col items-center gap-[16px]"
        >
          <Image
            src="/icons/alert.svg"
            alt="경고 아이콘"
            width={24}
            height={24}
          />
          팀을 삭제하시겠어요?
        </Modal.Header>
        <Modal.Content fontColor="secondary" fontSize="14" fontArray="center">
          <p className="mt-[20px]">
            팀과 관련된 모든 정보가 사라집니다. 정말로 삭제하시겠습니까?
          </p>
        </Modal.Content>
      </Modal.Wrapper>
      <Modal.Footer>
        <div className="flex gap-[8px]">
          <Button
            size="full"
            bgColor="white"
            fontColor="gray"
            onClick={closeModal}
          >
            취소
          </Button>
          <Button size="full" bgColor="red" onClick={handleDeleteClick}>
            삭제
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
