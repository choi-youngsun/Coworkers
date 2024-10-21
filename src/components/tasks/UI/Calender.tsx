import { useState } from 'react';
import DatePicker from 'react-datepicker';
import dayjs, { Dayjs } from 'dayjs';

import { Modal } from '@components/@shared/Modal';
import Button from '@components/@shared/Button';
import { useDate } from '@/src/contexts/DateContext';
import useViewportSize from '@hooks/useViewportSize';
import CalenderIcon from '@icons/calendar.svg';
import CalenderArrowLeft from '@icons/calender_arrow_left.svg';
import CalenderArrowRight from '@icons/calender_arrow_right.svg';

import 'react-datepicker/dist/react-datepicker.css';
import styles from '@styles/calendar.module.css';

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

export default function Calender() {
  const { date: contextDate, setDate, today } = useDate();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs(contextDate));
  const [displayedMonth, setDisplayedMonth] = useState(dayjs(contextDate));
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useViewportSize();

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      const dayjsDate = dayjs(newDate); // Date를 Dayjs로 변환
      setSelectedDate(dayjsDate); // 선택된 날짜 업데이트
      setDate(dayjsDate); // 선택된 날짜 Context에 업데이트
      setIsOpen(false);
    }
  };

  // 커스텀 헤더 렌더링
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: CustomHeaderProps) => {
    return (
      <div className={styles.customHeader}>
        <button
          aria-label="지난 달 달력"
          type="button"
          onClick={() => {
            decreaseMonth();
            setDisplayedMonth(dayjs(date).subtract(1, 'month'));
          }}
        >
          <CalenderArrowLeft />
        </button>
        <span>{dayjs(date).locale('en').format('MMMM YYYY')}</span>
        <button
          aria-label="다음 달 달력"
          type="button"
          onClick={() => {
            increaseMonth();
            setDisplayedMonth(dayjs(date).add(1, 'month'));
          }}
        >
          <CalenderArrowRight />
        </button>
      </div>
    );
  };

  // 공통 DatePicker 컴포넌트
  const renderDatePicker = () => (
    <DatePicker
      inline
      dateFormat="yyyy년 MM월 dd일"
      selected={selectedDate.toDate()}
      renderCustomHeader={renderCustomHeader}
      calendarClassName={styles.calenderWrapper}
      dayClassName={(date) => {
        // 날짜 확인
        const day = dayjs(date);
        const isDisplayedMonth = day.isSame(displayedMonth, 'month');
        const isToday = day.isSame(today, 'day');
        const isSelected =
          day.isSame(selectedDate, 'month') &&
          day.date() === selectedDate.date();

        if (!isDisplayedMonth) {
          return styles.disabledDay;
        }
        if (isToday) {
          return styles.today;
        }
        if (isSelected) {
          return styles.selectedDay;
        }
        return styles.day;
      }}
      filterDate={(date) => dayjs(date).isSame(displayedMonth, 'month')}
      onChange={handleDateChange}
    />
  );

  return (
    <>
      <button
        type="button"
        className="relative h-6 rounded-full bg-background-secondary p-[6px]"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <CalenderIcon />
      </button>

      {/* 모바일 모달 */}
      {isMobile ? (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative flex flex-1 justify-center"
        >
          <Modal.Wrapper className="flex flex-col">
            <Modal.Content> {renderDatePicker()} </Modal.Content>
            <Modal.Footer className="mr-1 flex justify-end">
              <Button
                className="bg-slate-400 "
                shape="square"
                fontColor="white"
                fontSize="14"
                width={60}
                height={30}
                border="gray"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </Button>
            </Modal.Footer>
          </Modal.Wrapper>
        </Modal>
      ) : (
        isOpen && renderDatePicker()
      )}
    </>
  );
}