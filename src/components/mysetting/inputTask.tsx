import ProfileEditIcon from 'public/icons/profile_edit.svg';
import { useEffect, useRef, useState } from 'react';
import { useUserData } from '@hooks/mysetting/useUserData';
import NetworkError from '@components/@shared/NetworkError';
import { useProfileChange } from '@hooks/mysetting/useProfileChange';
import { useImageURL } from '@hooks/mysetting/useImageURL';
import Image from 'next/image';
import PasswordInput from './PasswordInput';

export default function InputTask() {
  const [ProfileImage, setProfileImage] = useState<string | JSX.Element>(
    <ProfileEditIcon />
  );

  const fileInput = useRef<HTMLInputElement | null>(null);

  const { data, isLoading, isError } = useUserData();
  const mutation = useProfileChange();

  const mutationImage = useImageURL();

  // 프로필 업데이트 하는 핸들러 (PETCH)
  const handelImageChange = (imageURL: string) => {
    if (imageURL) {
      mutation.mutate({ image: imageURL });
    }
  };

  // 이미지 파일을 업로드하고 URL을 받는 핸들러 (POST)
  const handelImageUpload = (file: File) => {
    const formData = new FormData();
    formData.append('image', file); // 이미지 파일 추가

    mutationImage.mutate(
      { image: file },
      {
        onSuccess: (response) => {
          if (response.url) {
            handelImageChange(response.url);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (data && data.image) {
      setProfileImage(
        <Image
          width={64}
          height={64}
          src={data.image}
          alt="프로필 이미지"
          className="h-16 w-16 rounded-full object-cover"
        />
      );
    } else {
      setProfileImage(<ProfileEditIcon />);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <NetworkError />;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 이미지 미리보기 설정
      setProfileImage(
        <Image
          src={URL.createObjectURL(file)} // 파일을 직접 미리보기
          alt="프로필이미지"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
      );

      // 파일을 서버로 전송
      handelImageUpload(file);
    } else {
      setProfileImage(<ProfileEditIcon />);
    }
  };

  return (
    <main className="mx-6 flex max-w-[792px] flex-col gap-6">
      <div>
        <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => {
            if (fileInput.current) {
              fileInput.current.click();
            }
          }}
          className="relative rounded-full"
        >
          {ProfileImage}
          <div className="absolute bottom-[-2px] right-[-2px] h-[25px] w-[25px]">
            <Image src="/icons/button_edit.svg" alt="수정 버튼 아이콘" fill />
          </div>
        </button>
      </div>
      <div className="flex w-full flex-col">
        <span className="mb-3 text-lg-medium text-text-primary">이름</span>
        <div
          className="h-[48px] w-full rounded-[12px] bg-background-secondary p-[15px] text-lg-regular text-text-primary outline outline-[1px]
            outline-[#343E4E] focus:outline-none"
        >
          {data?.nickname}
        </div>
      </div>
      <PasswordInput />
    </main>
  );
}
