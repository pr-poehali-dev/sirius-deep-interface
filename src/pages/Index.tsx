import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const COLLAGE_IMG = 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/bucket/16d755c4-f607-407d-a5ec-d3faa4d1a21a.png';
const LAB_IMG = 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/80103fc6-48c8-45a9-97ae-bb1d37d88401.jpg';
const MICRO_IMG = 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/13b02ba3-0015-403a-9a5a-8e92c59ad796.jpg';

const residents = [
  {
    name: 'Тимофей',
    photo: 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/a9b7cf05-926b-4520-b889-2d1772853902.jpg',
    text: '«Сириус для меня стал местом, где теория наконец-то встретилась с практикой. Прикладная микробиология оказалась намного сложнее и интереснее, чем в учебниках. Больше всего поразило то, как маленькая бактерия может влиять на глобальные процессы в мире. Это был настоящий вызов!»',
  },
  {
    name: 'Арина',
    photo: 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/eee411cf-9851-4da5-a48b-a93636172e30.jpg',
    text: '«Самое ценное здесь — это атмосфера сотворчества. Мы не просто варили среды или делали посевы, мы учились мыслить как настоящие учёные. Теперь я смотрю на обычный йогурт или поверхность телефона как на целые вселенные, которые ещё предстоит изучить.»',
  },
  {
    name: 'Радмила',
    photo: 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/2d5840e7-5ce0-4373-89e8-3f0630a34d3b.jpg',
    text: '«Направление прикладной микробиологии научило меня терпению и точности. Когда ты работаешь с микромиром, каждая мелочь имеет значение. Эта неделя дала мне понять, что наука — это не только белые халаты, но и большой творческий драйв.»',
  },
  {
    name: 'Настя',
    photo: 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/58259a4e-4747-463e-a277-ba28eea163a4.jpg',
    text: '«Я никогда не думала, что окрашивание по Граму может вызвать столько восторга! Увидеть результаты своего труда под микроскопом в пятницу — это лучшее завершение смены. Сириус 55 помог мне окончательно определиться с будущей профессией.»',
  },
  {
    name: 'Нурлан',
    photo: 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/29f1ef55-78fe-413c-93cc-b4d8a0dd80ce.jpg',
    text: '«Для меня Сириус — это в первую очередь команда. Мы вместе проходили через ошибки в лабе и вместе радовались первым колониям в чашках Петри. Прикладная микробиология — это фундамент будущего, и я рад, что мы заложили его именно здесь.»',
  },
];

const timeline = [
  { day: 'ПОНЕДЕЛЬНИК', title: 'ПОСЕВ', time: '09:00', insight: 'В первый день мы плавили питательные среды для посева собственных микробов. Брали пробы с разных предметов — зубов, рук, телефона. За этот день мы научились сеять микробы.', icon: '🧫' },
  { day: 'ВТОРНИК', title: 'НАБЛЮДЕНИЕ', time: '10:00', insight: 'Во вторник мы посмотрели, как выросли наши микробы, и начали изготавливать питательные среды для эксперимента PEST. Приготовили дульцит, сахарозу и другие среды.', icon: '🔬' },
  { day: 'СРЕДА', title: 'ПЕРЕСЕВ', time: '11:00', insight: 'В этот день мы начали пересевать микробов в новые среды. Заселили микроорганизмы из одной среды в другую, чтобы наблюдать их рост в разных условиях.', icon: '🧪' },
  { day: 'ЧЕТВЕРГ', title: 'ЙОГУРТ', time: '14:00', insight: 'В четвёртый день мы варили йогурт из трёх баночек закваски и смотрели результаты нашего эксперимента. Обсуждали влияние условий на рост микробов.', icon: '🎨' },
  { day: 'ПЯТНИЦА', title: 'ОКРАШИВАНИЕ', time: '16:00', insight: 'В пятницу мы сделали мазки микробов и окрасили их по Граму. Изучали бактерии под микроскопом и делили их на грамположительные и грамотрицательные.', icon: '🏆' },
];

function useIntersection(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useIntersection();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (1800 / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count.toLocaleString('ru')}{suffix}</span>;
}

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useIntersection();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function ImageSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
    setPos(pct);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) handleMove(e.clientX); };
    const onTouch = (e: TouchEvent) => { if (dragging.current) handleMove(e.touches[0].clientX); };
    const stop = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchmove', onTouch);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', stop);
    };
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden select-none"
      style={{
        height: 'clamp(240px, 48vw, 520px)',
        border: '2px solid rgba(16,185,129,0.3)',
        boxShadow: '0 0 40px rgba(16,185,129,0.1), inset 0 0 60px rgba(0,0,0,0.3)',
        cursor: 'ew-resize',
      }}
    >
      {/* Microscope corner marks */}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((p2, i) => (
        <div key={i} className={`absolute ${p2} w-10 h-10 z-20 pointer-events-none`}
          style={{
            borderTop: i < 2 ? '3px solid rgba(52,211,153,0.65)' : 'none',
            borderBottom: i >= 2 ? '3px solid rgba(52,211,153,0.65)' : 'none',
            borderLeft: i % 2 === 0 ? '3px solid rgba(52,211,153,0.65)' : 'none',
            borderRight: i % 2 === 1 ? '3px solid rgba(52,211,153,0.65)' : 'none',
          }} />
      ))}

      <div className="absolute inset-0">
        <img src={LAB_IMG} alt="Резиденты" className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.15) saturate(0.55) hue-rotate(195deg)' }} />
      </div>

      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={MICRO_IMG} alt="Микромир" className="w-full h-full object-cover" />
      </div>

      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${pos}%`, width: 2, background: 'linear-gradient(to bottom, transparent, #34d399 10%, #34d399 90%, transparent)', boxShadow: '0 0 12px #34d399, 0 0 30px rgba(52,211,153,0.35)' }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(4,13,23,0.95)', border: '2px solid #34d399', boxShadow: '0 0 20px rgba(52,211,153,0.55)' }}>
          <Icon name="ChevronsLeftRight" size={14} style={{ color: '#34d399' }} />
        </div>
      </div>

      <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full text-xs font-montserrat font-medium"
        style={{ background: 'rgba(4,13,23,0.85)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
        Резиденты
      </div>
      <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-montserrat font-medium"
        style={{ background: 'rgba(4,13,23,0.85)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
        Микромир
      </div>
    </div>
  );
}

export default function Index() {
  const [activeResident, setActiveResident] = useState<number | null>(null);
  const [particles] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 5,
    }))
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #040d17 0%, #071a2e 55%, #052010 100%)' }}>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '15%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,32,16,0.5) 0%, transparent 70%)' }} />
        </div>

        {particles.map(p => (
          <div key={p.id} className="absolute rounded-full pointer-events-none" style={{
            width: p.size, height: p.size,
            left: `${p.left}%`, top: `${p.top}%`,
            background: '#10b981',
            animation: `float-particle ${p.duration}s ${p.delay}s ease-in-out infinite`,
            opacity: 0.22,
          }} />
        ))}

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">
          <div style={{ animation: 'fade-up 0.7s 0.1s ease-out both' }} className="mb-4">
            <span className="glass px-4 py-2 rounded-full text-xs font-montserrat font-medium tracking-widest uppercase inline-flex items-center gap-2"
              style={{ color: '#34d399' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Сириус 55 · Прикладная микробиология
            </span>
          </div>

          <h1 className="font-cormorant" style={{
            fontSize: 'clamp(2.8rem, 10vw, 8.5rem)', fontWeight: 300,
            lineHeight: 1.03, letterSpacing: '-0.02em', color: '#f0fdf4',
            marginBottom: '1rem', animation: 'fade-up 0.8s 0.2s ease-out both',
          }}>
            НЕДЕЛЯ<br />
            <span className="gradient-text" style={{ fontStyle: 'italic', fontWeight: 600 }}>В СИРИУСЕ</span>
            <span style={{ color: '#f0fdf4' }}> 55</span>
          </h1>

          <p className="font-montserrat max-w-md" style={{
            color: 'rgba(209,250,229,0.7)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            lineHeight: 1.75, marginBottom: '2.5rem',
            animation: 'fade-up 0.8s 0.35s ease-out both',
          }}>
            Пять дней погружения в мир живых культур, науки и открытий.<br className="hidden sm:block" />
            От чашки Петри — к пониманию жизни.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10" style={{ animation: 'fade-up 0.8s 0.45s ease-out both' }}>
            <button className="btn-primary px-6 sm:px-8 py-3 rounded-full font-montserrat font-medium text-sm tracking-wide">
              Исследовать смену
            </button>
            <button className="btn-secondary px-6 sm:px-8 py-3 rounded-full font-montserrat font-medium text-sm tracking-wide">
              Голоса резидентов
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-xl" style={{ animation: 'fade-up 0.8s 0.55s ease-out both' }}>
            {[
              { label: 'резидентов', value: 120, suffix: '+' },
              { label: 'дней науки', value: 5, suffix: '' },
              { label: 'экспериментов', value: 5, suffix: '+' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-3 sm:p-4 text-center glow-emerald">
                <div className="font-cormorant gradient-text" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', fontWeight: 600, lineHeight: 1 }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="font-montserrat mt-1" style={{ fontSize: 'clamp(0.58rem, 1.8vw, 0.72rem)', color: 'rgba(167,243,208,0.7)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(52,211,153,0.5)' }}>
          <span className="font-montserrat text-xs tracking-widest uppercase">scroll</span>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, #10b981, transparent)', animation: 'scroll-indicator 2.5s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══ КОЛЛАЖ ══ */}
      <section className="relative py-16 sm:py-24 px-4 grid-bg overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-10 sm:mb-14">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Главный элемент</span>
            <h2 className="font-cormorant gradient-text mt-2" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 600 }}>
              Коллаж смены
            </h2>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="relative mx-auto" style={{ maxWidth: 880 }}>
              <div className="animate-breathe relative rounded-2xl sm:rounded-3xl overflow-hidden"
                style={{
                  padding: '3px',
                  background: 'linear-gradient(135deg, rgba(52,211,153,0.7), rgba(16,185,129,0.2), rgba(52,211,153,0.7))',
                  boxShadow: '0 0 70px rgba(16,185,129,0.18), 0 0 130px rgba(16,185,129,0.07)',
                }}>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden" style={{ background: '#000' }}>
                  <img
                    src={COLLAGE_IMG}
                    alt="Коллаж Сириус 55 — Мир возможностей"
                    className="w-full object-contain"
                    style={{ maxHeight: 'clamp(250px, 62vw, 590px)' }}
                  />
                </div>
              </div>
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((p, i) => (
                <div key={i} className={`absolute ${p} w-8 h-8 pointer-events-none`}
                  style={{
                    borderTop: i < 2 ? '2px solid rgba(52,211,153,0.7)' : 'none',
                    borderBottom: i >= 2 ? '2px solid rgba(52,211,153,0.7)' : 'none',
                    borderLeft: i % 2 === 0 ? '2px solid rgba(52,211,153,0.7)' : 'none',
                    borderRight: i % 2 === 1 ? '2px solid rgba(52,211,153,0.7)' : 'none',
                  }} />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ О КОЛЛАЖЕ ══ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-12 sm:mb-16">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Символика</span>
            <h2 className="font-cormorant mt-2" style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontWeight: 500, color: '#f0fdf4' }}>
              Интерфейс открытий:<br />
              <span className="gradient-text" style={{ fontStyle: 'italic' }}>От ватмана к цифре</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <RevealSection delay={100}>
              <p className="font-montserrat" style={{ color: 'rgba(209,250,229,0.8)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', lineHeight: 1.9 }}>
                Этот коллаж — не просто изображение, а <span style={{ color: '#34d399' }}>карта нашего погружения</span> в микробиологию. Созданный изначально вручную как творческий порыв резидентов, в цифровой среде он превратился в живой организм.
              </p>
              <p className="font-montserrat mt-5" style={{ color: 'rgba(209,250,229,0.8)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', lineHeight: 1.9 }}>
                Каждая сфера на экране — это <span style={{ color: '#34d399' }}>чашка Петри</span>, хранящая историю одного дня смены. Изумрудные акценты связывают строгую науку с энергией молодых исследователей Сириуса 55.
              </p>
            </RevealSection>

            <RevealSection delay={300}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: '🧬', label: 'Сферы = Чашки Петри', desc: 'Каждая — история одного дня' },
                  { icon: '✨', label: 'Анимации', desc: 'Динамика роста культур' },
                  { icon: '🌿', label: 'Изумрудные тона', desc: 'Наука + энергия молодых' },
                  { icon: '🎨', label: 'Ватман → Цифра', desc: 'Творческий путь команды' },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl p-3 sm:p-4">
                    <div style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)' }}>{item.icon}</div>
                    <div className="font-montserrat font-medium mt-2" style={{ fontSize: 'clamp(0.68rem, 1.8vw, 0.82rem)', color: '#34d399' }}>{item.label}</div>
                    <div className="font-montserrat mt-1" style={{ fontSize: 'clamp(0.63rem, 1.4vw, 0.72rem)', color: 'rgba(167,243,208,0.6)' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ══ ГОЛОСА СМЕНЫ ══ */}
      <section className="py-16 sm:py-24 px-4 grid-bg relative overflow-hidden">
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealSection className="text-center mb-12 sm:mb-16">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Мнения</span>
            <h2 className="font-cormorant gradient-text mt-2" style={{ fontSize: 'clamp(2rem, 7vw, 5rem)', fontWeight: 600 }}>
              Голоса смены
            </h2>
          </RevealSection>

          {/* Avatar row */}
          <RevealSection className="flex justify-center gap-3 sm:gap-6 mb-10 sm:mb-12 flex-wrap" delay={150}>
            {residents.map((r, i) => (
              <button key={i} className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0"
                onClick={() => setActiveResident(activeResident === i ? null : i)}>
                <div className="relative avatar-hover">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden"
                    style={{
                      border: activeResident === i ? '2px solid #34d399' : '2px solid rgba(16,185,129,0.25)',
                      boxShadow: activeResident === i ? '0 0 25px rgba(16,185,129,0.5)' : 'none',
                      transition: 'all 0.3s ease',
                    }}>
                    <img src={r.photo} alt={r.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(16,185,129,0.3)', animation: `pulse-ring ${1.6 + i * 0.25}s ease-out infinite` }} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2"
                    style={{ borderColor: '#040d17', animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <span className="font-montserrat" style={{ fontSize: '0.7rem', color: 'rgba(167,243,208,0.75)' }}>{r.name}</span>
              </button>
            ))}
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {residents.map((r, i) => (
              <RevealSection key={i} delay={i * 90}>
                <div className="glass rounded-2xl p-5 cursor-pointer h-full flex flex-col"
                  style={{
                    borderColor: activeResident === i ? 'rgba(52,211,153,0.55)' : 'rgba(16,185,129,0.15)',
                    boxShadow: activeResident === i ? '0 0 35px rgba(16,185,129,0.15)' : 'none',
                    transform: activeResident === i ? 'translateY(-5px)' : 'none',
                    transition: 'all 0.4s ease',
                  }}
                  onClick={() => setActiveResident(activeResident === i ? null : i)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-emerald-900">
                      <img src={r.photo} alt={r.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-montserrat font-semibold" style={{ fontSize: '0.9rem', color: '#f0fdf4' }}>{r.name}</div>
                      <div className="font-montserrat" style={{ fontSize: '0.7rem', color: '#34d399' }}>Резидент · Сириус 55</div>
                    </div>
                    <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                  </div>
                  <p className="font-montserrat flex-1" style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.85rem)', color: 'rgba(209,250,229,0.75)', fontStyle: 'italic', lineHeight: 1.7 }}>
                    {r.text}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ХРОНИКА РОСТА — ТАЙМЛАЙН ══ */}
      <section className="py-16 sm:py-24 px-4 grid-bg relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-14 sm:mb-20">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Раздел №1</span>
            <h2 className="font-cormorant gradient-text mt-2" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 600 }}>
              Хроника роста
            </h2>
            <p className="font-montserrat text-sm mt-2" style={{ color: 'rgba(167,243,208,0.55)' }}>Интерактивный таймлайн-микроскоп</p>
          </RevealSection>

          <div className="relative">
            {/* Pulsing vertical line — hidden on mobile, shown from sm */}
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none"
              style={{ width: 2, background: 'linear-gradient(to bottom, transparent 0%, #10b981 8%, #10b981 92%, transparent 100%)', animation: 'line-glow 3s ease-in-out infinite' }} />

            <div className="flex flex-col gap-10 sm:gap-16">
              {timeline.map((item, i) => (
                <RevealSection key={i} delay={i * 120}>
                  {/* Desktop: alternating left/right */}
                  <div className={`hidden sm:flex relative items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right pr-3' : 'text-left pl-3'}`}>
                      <div className="font-montserrat tracking-widest uppercase" style={{ fontSize: '0.65rem', color: 'rgba(52,211,153,0.65)' }}>{item.time}</div>
                      <div className="font-cormorant gradient-text mt-0.5" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 600 }}>{item.day}</div>
                      <div className="font-cormorant" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)', color: '#f0fdf4', fontStyle: 'italic' }}>«{item.title}»</div>
                    </div>
                    <div className="relative flex-shrink-0 z-10">
                      <div className="timeline-dot w-12 h-12 rounded-full flex items-center justify-center text-2xl glass"
                        style={{ border: '2px solid rgba(16,185,129,0.4)' }}>
                        {item.icon}
                      </div>
                      <span className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(16,185,129,0.35)', animation: `pulse-ring 2.5s ${i * 0.4}s ease-out infinite` }} />
                    </div>
                    <div className="flex-1">
                      <div className="glass rounded-2xl p-4 sm:p-5" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
                        <div className="font-montserrat uppercase tracking-wider mb-2" style={{ fontSize: '0.62rem', color: '#34d399' }}>Инсайт дня</div>
                        <p className="font-montserrat leading-relaxed" style={{ fontSize: 'clamp(0.75rem, 1.7vw, 0.85rem)', color: 'rgba(209,250,229,0.8)' }}>{item.insight}</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: vertical stack with left line */}
                  <div className="sm:hidden flex gap-4">
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg glass"
                        style={{ border: '2px solid rgba(16,185,129,0.4)' }}>
                        {item.icon}
                      </div>
                      {i < timeline.length - 1 && (
                        <div style={{ width: 2, flex: 1, minHeight: 24, background: 'linear-gradient(to bottom, #10b981, rgba(16,185,129,0.2))', marginTop: 4 }} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="font-montserrat tracking-widest uppercase mb-0.5" style={{ fontSize: '0.6rem', color: 'rgba(52,211,153,0.65)' }}>{item.time}</div>
                      <div className="font-cormorant gradient-text" style={{ fontSize: '1.4rem', fontWeight: 600 }}>{item.day}</div>
                      <div className="font-cormorant mb-3" style={{ fontSize: '1rem', color: '#f0fdf4', fontStyle: 'italic' }}>«{item.title}»</div>
                      <div className="glass rounded-xl p-4" style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
                        <div className="font-montserrat uppercase tracking-wider mb-1.5" style={{ fontSize: '0.6rem', color: '#34d399' }}>Инсайт дня</div>
                        <p className="font-montserrat text-sm leading-relaxed" style={{ color: 'rgba(209,250,229,0.8)' }}>{item.insight}</p>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ СЛАЙДЕР МИКРОМИРА ══ */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-10 sm:mb-14">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Раздел №2</span>
            <h2 className="font-cormorant gradient-text mt-2" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 600 }}>
              От идеи к культуре
            </h2>
            <p className="font-montserrat text-sm mt-2" style={{ color: 'rgba(167,243,208,0.55)' }}>Лабораторный архив: слайдер микромира</p>
            <p className="font-montserrat text-xs mt-1.5" style={{ color: 'rgba(167,243,208,0.38)' }}>Потяни ползунок — увидишь обе стороны науки</p>
          </RevealSection>

          <RevealSection delay={150}>
            <ImageSlider />
          </RevealSection>

          <RevealSection delay={350} className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
            {[
              { label: 'Время инкубации', value: 48, suffix: 'ч' },
              { label: 'Колоний выращено', value: 127, suffix: '+' },
              { label: 'Опытов проведено', value: 18, suffix: '' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-xl p-3 sm:p-4 text-center">
                <div className="font-cormorant gradient-text" style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 600 }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="font-montserrat mt-1" style={{ fontSize: 'clamp(0.58rem, 1.6vw, 0.7rem)', color: 'rgba(167,243,208,0.6)' }}>{s.label}</div>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* ══ О СИРИУСЕ ══ */}
      <section className="py-16 sm:py-24 px-4 grid-bg relative overflow-hidden">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(5,32,16,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealSection className="text-center mb-12 sm:mb-16">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>О программе</span>
            <h2 className="font-cormorant mt-2" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 500, color: '#f0fdf4' }}>
              Прикладная<br />
              <span className="gradient-text" style={{ fontStyle: 'italic' }}>микробиология</span>
            </h2>
          </RevealSection>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
            {[
              { icon: '🔬', title: 'Живая наука', desc: 'Работа с реальными бактериальными культурами в профессиональной лаборатории. Не теория — практика.' },
              { icon: '🧪', title: 'Методы', desc: 'Окраска по Граму, посев, инкубация, микроскопия — полный цикл микробиологического исследования.' },
              { icon: '🌍', title: 'Масштаб', desc: 'От микрометров до глобальных процессов. Бактерии управляют климатом, здоровьем и будущим.' },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 130}>
                <div className="glass rounded-2xl p-5 sm:p-6 h-full">
                  <div style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)' }}>{item.icon}</div>
                  <h3 className="font-cormorant gradient-text mt-3" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 600 }}>{item.title}</h3>
                  <p className="font-montserrat mt-3 leading-relaxed" style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)', color: 'rgba(209,250,229,0.7)' }}>{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={200}>
            <div className="glass rounded-3xl p-6 sm:p-10" style={{ background: 'linear-gradient(135deg, rgba(7,26,46,0.8), rgba(5,32,16,0.6))' }}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Образовательная организация</span>
                  <h3 className="font-cormorant mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 600, color: '#f0fdf4' }}>Сириус</h3>
                  <p className="font-montserrat mt-4 leading-relaxed" style={{ fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: 'rgba(209,250,229,0.75)' }}>
                    Образовательный центр «Сириус» — место, где встречаются самые талантливые школьники страны и лучшие наставники. Программа смены 55 посвящена прикладной микробиологии: науке, которая формирует наше понимание жизни на самом фундаментальном уровне.
                  </p>
                  <p className="font-montserrat mt-4 leading-relaxed" style={{ fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: 'rgba(209,250,229,0.75)' }}>
                    Резиденты работают в реальных лабораторных условиях, осваивают профессиональные методики и открывают для себя карьерные перспективы в биотехнологиях, медицине и экологии.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { n: 2014, s: 'год основания', suf: '' },
                    { n: 55, s: 'номер смены', suf: '' },
                    { n: 5, s: 'дней интенсива', suf: '' },
                    { n: 100, s: 'науки в деле', suf: '%' },
                  ].map((item, i) => (
                    <div key={i} className="glass rounded-xl p-3 sm:p-4 text-center">
                      <div className="font-cormorant gradient-text" style={{ fontSize: 'clamp(1.4rem, 4vw, 1.7rem)', fontWeight: 700 }}>
                        <AnimatedCounter target={item.n} suffix={item.suf} />
                      </div>
                      <div className="font-montserrat mt-1" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)', color: 'rgba(167,243,208,0.6)' }}>{item.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="py-10 sm:py-12 px-4 text-center" style={{ borderTop: '1px solid rgba(16,185,129,0.1)' }}>
        <div className="font-cormorant gradient-text" style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: 600 }}>СИРИУС 55</div>
        <p className="font-montserrat text-xs mt-2" style={{ color: 'rgba(167,243,208,0.4)', letterSpacing: '0.12em' }}>ПРИКЛАДНАЯ МИКРОБИОЛОГИЯ · МИР ВОЗМОЖНОСТЕЙ</p>
        <div className="flex justify-center gap-2 mt-4">
          {[0, 0.3, 0.6].map((d, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
      </footer>
    </div>
  );
}
