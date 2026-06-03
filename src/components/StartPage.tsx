type StartPageProps = {
  onStart: () => void;
};

export function StartPage({ onStart }: StartPageProps) {
  return (
    <main className="start-page" dir="rtl" lang="ar-EG" aria-label="شاشة بداية شجرة الخلاص">
      <section className="start-card">
        <p className="start-card__eyebrow">لعبة تعليمية</p>
        <h1>شجرة الخلاص</h1>
        <p className="start-card__text">رتب الصور في مكانها على الشجرة علشان نعرف قصة الخلاص من البداية لحد النهارده.</p>
        <button className="start-button" type="button" onClick={onStart} autoFocus>
          ابدأ
        </button>
      </section>
    </main>
  );
}
