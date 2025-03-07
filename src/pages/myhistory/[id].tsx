import MyTask from '@components/myhistory/MyTask';

export default function Myhistory() {
  return (
    <main className="mx-auto mt-8 w-auto max-w-[1200px] text-text-primary">
      <h1 className="mb-[27px] ml-4 text-2lg-bold ">마이 히스토리</h1>
      <section className="mx-4 mb-10">
        <MyTask />
      </section>
    </main>
  );
}
