import Dropdown, { Option } from '@components/@shared/Dropdown';
import UserIcon from 'public/icons/user.svg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserData } from '@hooks/mysetting/useUserData';
import NavBarTeam from './NavBar_Team';

export default function NavBar() {
  const router = useRouter();
  const [isLogoOnlyPage, setIsLogoOnlyPage] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { data } = useUserData();
  const handleLogout = () => {
    localStorage.removeItem('userStorage');
    router.push('/signin');
  };

  useEffect(() => {
    setIsClient(true);
    const logoOnlyPages = ['/signin', 'signup', 'addteam', '/'];
    // 팀참여하기 페이지, 비밀번호 재설정페이지 추가 필요
    setIsLogoOnlyPage(logoOnlyPages.includes(router.pathname));
  }, [router.pathname]);

  if (!isClient) {
    return null;
  }

  const basic: Option[] = [
    {
      label: '마이 히스토리',
      component: (
        <button
          type="button"
          onClick={() => router.push(`/myhistory/${data?.id}`)}
          className="w-full"
        >
          마이 히스토리
        </button>
      ),
    },
    {
      label: '계정 설정',
      component: (
        <button
          type="button"
          onClick={() => router.push(`/mysetting/${data?.id}`)}
          className="w-full"
        >
          계정 설정
        </button>
      ),
    },
    {
      label: '팀 참여',
      component: (
        <button
          type="button"
          onClick={() => router.push('/addteam/participate')}
          className="w-full"
        >
          팀 참여
        </button>
      ),
    },
    {
      label: '전체 팀 리스트',
      component: (
        <button
          type="button"
          onClick={() => router.push('/myteam')}
          className="w-full"
        >
          전체 팀 리스트
        </button>
      ),
    },
    {
      label: '로그아웃',
      component: (
        <button type="button" onClick={handleLogout} className="w-full">
          로그아웃
        </button>
      ),
    },
  ];

  if (!data) {
    // data가 없을 경우 컴포넌트 렌더링을 하지 않음
    return null;
  }

  return (
    <header className=" flex h-16 items-center justify-center border-b border-border-primary border-opacity-10 bg-background-secondary px-6">
      <nav className="flex h-8 w-[1200px]  items-center justify-between text-text-primary max-xl:w-full max-md:w-full ">
        <div className="flex items-center gap-10 max-md:gap-5">
          <NavBarTeam data={data} />
        </div>
        {!isLogoOnlyPage && (
          <div>
            <Dropdown
              options={basic}
              triggerIcon={
                <div className="flex items-center gap-2">
                  <UserIcon />
                  <span className="max-xl:hidden">
                    {data?.nickname || '이름'}
                  </span>
                </div>
              }
              optionsWrapClass="mt-2 right-0 rounded-[12px] border border-background-tertiary"
              optionClass="rounded-[12px] md:w-[150px] md:h-[47px] w-[120px] h-[40px] justify-center text-md-regular md:text-lg-regular text-center hover:bg-background-tertiary"
            />
          </div>
        )}
      </nav>
    </header>
  );
}
