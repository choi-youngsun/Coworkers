import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dayjs } from 'dayjs';
import { useDate } from '@/src/contexts/DateContext';

import Button from '@components/@shared/Button';
import Dropdown, { Option } from '@components/@shared/Dropdown';
import { Input, ScrollTextArea } from '@components/@shared/Input';
import { REQUEST_INIT } from '@constants/initValues';
import ToggleIcon from '@icons/toggle.svg';
import type { TaskRequestDto } from '@/src/types/tasks/TaskListDto';

import WeeklySelector from './WeeklySelector';
import Calender from './Calender';

interface AddTaskFormProps {
  onClose: () => void;
}

const frequencyOptions: Option[] = [
  { label: 'ONCE', component: <div>반복 없음</div> },
  { label: 'DAILY', component: <div>매일</div> },
  { label: 'WEEKLY', component: <div>주 반복</div> }, // montyDay 필요, DateContext에서 추출 가능
  { label: 'MONTHLY', component: <div>월 반복</div> }, // weekDays 필요
];

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
  const { date: contextDate, getCurrentMonth } = useDate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<Option>(
    frequencyOptions[0]
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<TaskRequestDto>({
    mode: 'onChange',
    defaultValues: {
      ...REQUEST_INIT.TASK,
      startDate: contextDate.toISOString(),
    },
  });

  /* 폼 제출 처리 */
  const onSubmit = async (data: TaskRequestDto) => {
    console.log(data);

    // TODO: post apiCall 추가
    onClose();
  };

  /* 설정된 값 초기화 */
  const resetValues = (frequency: string | undefined) => {
    if (frequency !== 'WEEKLY') {
      setValue('weekDays', [0]);
    }
    if (frequency === 'MONTHLY') {
      setValue('monthDay', getCurrentMonth());
    } else {
      setValue('monthDay', 0);
    }
  };

  /* 이벤트 핸들러 */
  const handleFrequencySelect = (option: Option) => {
    setSelectedFrequency(option);
    setValue('frequency', option.label || '', { shouldValidate: true });

    resetValues(option.label);
  };

  const handleDateChange = (date: Dayjs) => {
    setValue('startDate', date.toISOString(), {
      shouldValidate: true,
    });
    setIsOpen(false);
  };

  const handleWeeklyDaysChange = (newSelectedWeeklyDays: number[]) => {
    setValue('weekDays', newSelectedWeeklyDays);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
      <Input
        label="할 일 제목"
        placeholder="할 일 제목을 입력해주세요."
        inputProps={{
          ...register('name', { required: '제목은 필수 입력 사항입니다.' }),
        }}
        isError={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <div className="flex w-full flex-col">
        <h2 className="mb-3 text-text-primary">시작 날짜 및 시간</h2>
        <Calender
          isInput
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onDateChange={handleDateChange}
        />
      </div>
      <div>
        <h2 className="mb-3 text-text-primary">반복 설정</h2>
        <Dropdown
          initialOption={selectedFrequency}
          options={frequencyOptions}
          onSelect={handleFrequencySelect}
          triggerIcon={<ToggleIcon />}
          triggerClass="bg-slate-900 text-md-medium text-text-default flex gap-2  py-2 px-[10px] rounded-xl items-center h-[44px]"
          optionsWrapClass="bg-background-secondary mt-2 rounded-xl border border-brand-primary shadow-[0_2px_10px_rgba(0,0,0,0.5)] overflow-hidden"
          optionClass="px-4 rounded-xl md:w-[135px] md:h-[47px] w-[120px] h-[40px] justify-center text-md-regular md:text-lg-regular text-start hover:bg-slate-900 hover:rounded-none hover:text-text-default"
        />
      </div>
      {selectedFrequency.label === 'WEEKLY' && (
        <WeeklySelector onChange={handleWeeklyDaysChange} />
      )}
      <ScrollTextArea
        label="할 일 메모"
        placeholder="메모를 입력해주세요."
        textareaProps={{
          ...register('description'),
        }}
      />
      <Button size="full" type="submit" disabled={!isValid}>
        만들기
      </Button>
    </form>
  );
}
