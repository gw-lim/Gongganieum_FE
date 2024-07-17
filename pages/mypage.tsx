import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getBuildings, getLikeBuildingIds, getMyInfo } from 'apis/api';
import { BuildingType, UserDataType } from 'types/client.types';
import BuildingCard from 'components/commons/BuildingCard';
import PortalModal from 'components/commons/PortalModal';
import ProfileEditModal from 'components/modals/ProfileEditModal';
import MypageProfile from 'components/pages/mypage/MypageProfile';

const Mypage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userInfo }: { data?: UserDataType } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getMyInfo(),
  });

  const { data: likeBuildingIds }: { data?: number[] } = useQuery({
    queryKey: ['likeBuildingIds'],
    queryFn: () => getLikeBuildingIds(),
  });

  const { data: buildings }: { data?: BuildingType[] } = useQuery({
    queryKey: ['buildings'],
    queryFn: () => getBuildings(),
  });

  const likeBuildings = buildings?.filter((el) => {
    return likeBuildingIds?.includes(el._id);
  });

  const handleClick = () => setIsModalOpen(!isModalOpen);

  return (
    <div className='mx-auto my-76 flex max-w-1232 flex-col items-center md:my-56'>
      <MypageProfile
        profileImage={userInfo?.img}
        nickname={userInfo?.nickname}
        email={userInfo?.email}
        introduction={userInfo?.description}
        onClick={handleClick}
      />
      {/* 찜하기 카드 리스트 */}
      <div className='flex w-full flex-col gap-24 px-16 md:my-28'>
        <h1 className='mb-24 text-32 font-800'>내 찜 목록</h1>
        <div className='grid min-h-300 grid-cols-3 gap-x-24 gap-y-48 md:grid-cols-2 md:gap-x-8 md:gap-y-36'>
          {likeBuildings &&
            likeBuildings?.map((building: BuildingType) => (
              <BuildingCard
                mode='like'
                key={building._id}
                building={building}
                isLiked={likeBuildingIds?.includes(building._id)}
              />
            ))}
        </div>
      </div>
      <PortalModal openStatus={isModalOpen}>
        <ProfileEditModal setIsModalOpen={setIsModalOpen} userInfo={userInfo} />
      </PortalModal>
    </div>
  );
};

export default Mypage;