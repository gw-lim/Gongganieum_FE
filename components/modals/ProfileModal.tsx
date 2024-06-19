import { ChangeEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateRandomNickname } from 'utils/generateRandomNickname';
import Button from 'components/commons/Button';
import Input from 'components/commons/Input';
import { IconCirculation } from 'public/icons';

interface FormValues {
  nickname: string;
  companyName: string;
  brandName: string;
  productOrServiceName: string;
  interests: string;
  introduction: string;
}

const ProfileModal = () => {
  const { control, handleSubmit, register, setValue } = useForm<FormValues>({
    defaultValues: {
      nickname: '',
      companyName: '',
      brandName: '',
      productOrServiceName: '',
      interests: '',
      introduction: '',
    },
  });

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setValue('nickname', newNickname);
  };

  const handleRandomNickname = () => {
    const randomNickname = generateRandomNickname();
    setValue('nickname', randomNickname);
  };

  //TODO: 바꿀 로직
  const submitProfileSettings: SubmitHandler<FormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitProfileSettings)}
      className='flex h-full w-600 flex-col gap-8 rounded-24 border-2 border-solid p-24'
    >
      <div className='text-24 font-800'>기본 프로필 설정</div>
      <div className='mb-16 text-16 font-400 text-gray-400'>
        공간이음 서비스를 이용하기 전 기본 프로필을 설정해 주세요.
      </div>
      <div className='mb-24 flex flex-col gap-16'>
        <NicknameInput
          register={register}
          onChangeNickname={handleChangeNickname}
          onRandomNickname={handleRandomNickname}
        />
        <Input
          name='companyName'
          placeholder='회사명을 입력해 주세요.'
          control={control}
        >
          회사명
        </Input>
        <Input
          name='brandName'
          placeholder='브랜드명을 입력해 주세요.'
          control={control}
        >
          브랜드명
        </Input>
        <div className='relative'>
          <Input
            name='productOrServiceName'
            placeholder='주요 제품 및 서비스명을 입력해 주세요.'
            control={control}
          >
            주요 제품 및 서비스명
          </Input>
          <span className='absolute bottom-24 right-12 text-14 font-500 text-[#8A909F]'>
            20
          </span>
        </div>
        <Input
          name='interests'
          placeholder='관심분야를 입력해 주세요.'
          control={control}
        >
          관심 분야
        </Input>
        <div className='relative'>
          <Input
            name='introduction'
            placeholder='한 줄 소개를 입력해 주세요.'
            control={control}
          >
            한 줄 소개
          </Input>
          <span className='absolute bottom-24 right-12 text-14 font-500 text-[#8A909F]'>
            50
          </span>
        </div>
      </div>
      {/* TODO: onClick 로직 추가 */}
      <Button type='submit'>기본 프로필 설정</Button>
    </form>
  );
};

export default ProfileModal;

const NicknameInput = (props: {
  register: any;
  onChangeNickname: (e: ChangeEvent<HTMLInputElement>) => void;
  onRandomNickname: () => void;
}) => {
  const { register, onChangeNickname, onRandomNickname } = props;
  return (
    <div className='flex items-end gap-16'>
      <div className='relative w-full'>
        <label htmlFor='nickname' className='text-16 font-700'>
          닉네임
        </label>
        <input
          id='nickname'
          placeholder={'닉네임을 입력해 주세요.'}
          {...register('nickname', {
            onChange: onChangeNickname,
          })}
          className={`mt-8 w-full rounded-8 border-[1px] border-gray-200 bg-gray-100 p-12 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400`}
        />
      </div>
      <button
        type='button'
        onClick={onRandomNickname}
        className='flex h-48 w-fit items-center justify-center whitespace-nowrap rounded-8 bg-gray-100 px-12 py-20 text-16 font-500'
      >
        <div className='flex items-center gap-8'>
          <IconCirculation />
          <span>닉네임 랜덤 생성</span>
        </div>
      </button>
    </div>
  );
};
