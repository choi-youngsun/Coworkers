import SecessionIcon from 'public/icons/secession.svg';
import { Modal } from '@components/@shared/Modal';
import { useModal } from '@hooks/useModal';
import AlertIcon from 'public/icons/alert.svg';
import Button from '@components/@shared/Button';
import { useUserDelete } from '@hooks/mysetting/useUserDelete';

export default function RemoveAccount() {
  const { isOpen, openModal, closeModal } = useModal();

  const mutation = useUserDelete();

  const handleUserDelete = () => {
    mutation.mutate();
    closeModal();
  };

  return (
    <>
      <button onClick={openModal} className="flex items-center gap-2">
        <SecessionIcon className="ml-6" />
        <span className="text-lg-medium text-status-danger">회원 탈퇴하기</span>
      </button>

      <Modal
        isOpen={isOpen}
        isXButton={false}
        onClose={closeModal}
        array="column"
        padding="default"
        bgColor="primary"
        fontSize="16"
        fontArray="center"
        gap="40"
      >
        {/* 모달의 하위 요소에 독립적인 스타일을 적용할 수 있습니다 */}
        {/* Modal.Wrapper로 헤더와 콘텐츠의 간격을 설정할 수 있습니다 */}
        <Modal.Wrapper array="column">
          <Modal.Header fontColor="primary">
            <div className="flex flex-col items-center justify-center gap-4">
              <AlertIcon />
              <span className="mb-2 text-lg-medium text-text-primary">
                회원 탈퇴를 진행하시겠어요?
              </span>
            </div>
          </Modal.Header>
          <Modal.Content fontColor="secondary" fontSize="14" fontArray="left">
            <div className="flex flex-col items-center justify-center text-md-medium text-text-secondary">
              <p>그룹장으로 있는 그룹은 자동으로 삭제되고,</p>
              <p>모든 그룹에서 나가집니다.</p>
            </div>
          </Modal.Content>
        </Modal.Wrapper>
        <Modal.Footer>
          {/* 공통 버튼 적용 전 */}
          <div className="flex items-center justify-center gap-2">
            <Button
              bgColor="white"
              fontColor="gray"
              fontSize="16"
              width={136}
              height={48}
              border="gray"
              onClick={closeModal}
            >
              닫기
            </Button>
            <Button
              bgColor="red"
              width={136}
              height={48}
              onClick={handleUserDelete}
              className="bg-amber-400 text-red-50"
            >
              회원 탈퇴
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
