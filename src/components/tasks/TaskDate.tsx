import Pagination from './UI/Pagination';
import Calender from './UI/Calender';
import CreateTaskList from './UI/CreateTaskList';

export default function TaskDate() {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };

  const formattedDate = today.toLocaleDateString('ko-KR', options);

  return (
    <section className="flex flex-col gap-6 text-text-primary">
      <h1 className="text-xl-bold">할 일</h1>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <p className="text-lg-medium">{formattedDate}</p>
          <Pagination />
          <Calender />
        </div>
        <CreateTaskList />
      </div>
    </section>
  );
}
