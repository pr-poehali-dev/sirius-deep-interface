import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const COLLAGE_IMG = 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/ed04bb5d-47ac-4de5-922f-bcb3cd8c9ff7.jpg';
const LAB_IMG = 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/80103fc6-48c8-45a9-97ae-bb1d37d88401.jpg';
const MICRO_IMG = 'https://cdn.poehali.dev/projects/97cbe7f0-dcca-434a-9a81-42b289806eb9/files/13b02ba3-0015-403a-9a5a-8e92c59ad796.jpg';

const residents = [
  {
    name: 'Тимофей',
    initial: 'Т',
    color: 'from-emerald-600 to-teal-800',
    text: '«Сириус для меня стал местом, где теория наконец-то встретилась с практикой. Прикладная микробиология оказалась намного сложнее и интереснее, чем в учебниках. Больше всего поразило то, как маленькая бактерия может влиять на глобальные процессы в мире. Это был настоящий вызов!»',
  },
  {
    name: 'Арина',
    initial: 'А',
    color: 'from-emerald-500 to-green-700',
    text: '«Самое ценное здесь — это атмосфера сотворчества. Мы не просто варили среды или делали посевы, мы учились мыслить как настоящие учёные. Теперь я смотрю на обычный йогурт или поверхность телефона как на целые вселенные, которые ещё предстоит изучить.»',
  },
  {
    name: 'Радмила',
    initial: 'Р',
    color: 'from-teal-600 to-emerald-800',
    text: '«Направление прикладной микробиологии научило меня терпению и точности. Когда ты работаешь с микромиром, каждая мелочь имеет значение. Эта неделя дала мне понять, что наука — это не только белые халаты, но и большой творческий драйв.»',
  },
  {
    name: 'Настя',
    initial: 'Н',
    color: 'from-green-600 to-teal-700',
    text: '«Я никогда не думала, что окрашивание по Граму может вызвать столько восторга! Увидеть результаты своего труда под микроскопом в пятницу — это лучшее завершение смены. Сириус 55 помог мне окончательно определиться с будущей профессией.»',
  },
  {
    name: 'Нурлан',
    initial: 'Н',
    color: 'from-emerald-700 to-green-600',
    text: '«Для меня Сириус — это в первую очередь команда. Мы вместе проходили через ошибки в лабе и вместе радовались первым колониям в чашках Петри. Прикладная микробиология — это фундамент будущего, и я рад, что мы заложили его именно здесь.»',
  },
];

const timeline = [
  { day: 'ПОНЕДЕЛЬНИК', title: 'ПОСЕВ', time: '09:00', insight: 'Первый контакт с живой культурой. Стерильность — это не привычка, это философия.', icon: '🧫' },
  { day: 'ВТОРНИК', title: 'ИНКУБАЦИЯ', time: '18:00', insight: 'Терпение — главный инструмент микробиолога. Мы ждём, наблюдаем, учимся.', icon: '🔬' },
  { day: 'СРЕДА', title: 'АНАЛИЗ', time: '10:00', insight: 'Первые колонии появились. Данные говорят больше, чем слова.', icon: '📊' },
  { day: 'ЧЕТВЕРГ', title: 'ОКРАШИВАНИЕ', time: '14:00', insight: 'Окраска по Граму — как открыть тайную книгу природы под объективом.', icon: '🎨' },
  { day: 'ПЯТНИЦА', title: 'РЕЗУЛЬТАТ', time: '16:00', insight: 'Мы это сделали. Наука стала ближе, чем казалось неделю назад.', icon: '🏆' },
];

function useIntersection(threshold = 0.15) {
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
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
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

  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging.current) handleMove(e.clientX); }, [handleMove]);
  const onTouchMove = useCallback((e: TouchEvent) => { if (dragging.current) handleMove(e.touches[0].clientX); }, [handleMove]);
  const stopDrag = useCallback(() => { dragging.current = false; }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [onMouseMove, onTouchMove, stopDrag]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden cursor-ew-resize select-none"
      style={{ border: '1px solid rgba(16,185,129,0.3)' }}
    >
      <div className="absolute inset-0">
        <img src={LAB_IMG} alt="Резиденты в лаборатории" className="w-full h-full object-cover" style={{ filter: 'contrast(1.1) saturate(0.7) hue-rotate(200deg)' }} />
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={MICRO_IMG} alt="Микробиология под микроскопом" className="w-full h-full object-cover" />
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 slider-handle"
        style={{ left: `${pos}%`, background: 'linear-gradient(to bottom, transparent, #34d399, transparent)', boxShadow: '0 0 15px #34d399' }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(7,26,46,0.9)', border: '2px solid #34d399', boxShadow: '0 0 20px rgba(52,211,153,0.5)' }}>
          <Icon name="ChevronsLeftRight" size={16} style={{ color: '#34d399' }} />
        </div>
      </div>
      <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-montserrat text-emerald-300 font-medium">Резиденты</div>
      <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-montserrat text-emerald-300 font-medium">Микромир</div>
    </div>
  );
}

export default function Index() {
  const [activeResident, setActiveResident] = useState<number | null>(null);
  const [particles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 4,
    }))
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #040d17 0%, #071a2e 50%, #052010 100%)' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg">
        {/* Radial glow spots */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '20%', left: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,32,16,0.5) 0%, transparent 70%)' }} />
        </div>

        {/* Floating particles */}
        {particles.map(p => (
          <div key={p.id} className="particle" style={{
            width: p.size, height: p.size,
            left: `${p.left}%`, top: `${p.top}%`,
            animation: `float-particle ${p.duration}s ${p.delay}s ease-in-out infinite`,
            opacity: 0.3,
          }} />
        ))}

        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <div className="animate-fade-up delay-100 mb-4">
            <span className="glass px-4 py-2 rounded-full text-xs font-montserrat font-medium tracking-widest uppercase"
              style={{ color: '#34d399', borderColor: 'rgba(16,185,129,0.3)' }}>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
              Сириус 55 · Прикладная микробиология
            </span>
          </div>

          <h1 className="font-cormorant animate-fade-up delay-200"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#f0fdf4', marginBottom: '1rem' }}>
            НЕДЕЛЯ<br />
            <span className="gradient-text" style={{ fontStyle: 'italic', fontWeight: 600 }}>В СИРИУСЕ</span>
            <span style={{ color: '#f0fdf4' }}> 55</span>
          </h1>

          <p className="animate-fade-up delay-300 font-montserrat max-w-lg text-center"
            style={{ color: 'rgba(209,250,229,0.7)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Семь дней погружения в мир живых культур, науки и открытий.<br />От чашки Петри — к пониманию жизни.
          </p>

          <div className="animate-fade-up delay-400 flex flex-wrap gap-4 justify-center mb-12">
            <button className="btn-primary px-8 py-3 rounded-full font-montserrat font-medium text-sm tracking-wide">
              Исследовать смену
            </button>
            <button className="btn-secondary px-8 py-3 rounded-full font-montserrat font-medium text-sm tracking-wide">
              Голоса резидентов
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-500 grid grid-cols-3 gap-4 max-w-xl w-full">
            {[
              { label: 'резидентов', value: 55, suffix: '+' },
              { label: 'дней науки', value: 7, suffix: '' },
              { label: 'экспериментов', value: 42, suffix: '+' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-4 text-center glow-emerald">
                <div className="font-cormorant gradient-text" style={{ fontSize: '2.2rem', fontWeight: 600, lineHeight: 1 }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="font-montserrat text-xs mt-1" style={{ color: 'rgba(167,243,208,0.7)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(52,211,153,0.5)' }}>
          <span className="font-montserrat text-xs tracking-widest uppercase">scroll</span>
          <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, #10b981, transparent)', animation: 'scroll-indicator 2.5s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── КОЛЛАЖ ── */}
      <section className="relative py-24 px-4 grid-bg overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Главный элемент</span>
            <h2 className="font-cormorant gradient-text mt-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 600 }}>
              Баннер смены
            </h2>
          </RevealSection>

          <RevealSection delay={200}>
            <div className="relative mx-auto" style={{ maxWidth: 820 }}>
              {/* Golden glass frame */}
              <div className="animate-breathe relative rounded-3xl overflow-hidden"
                style={{
                  padding: '3px',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.6), rgba(52,211,153,0.2), rgba(16,185,129,0.6))',
                  boxShadow: '0 0 60px rgba(16,185,129,0.2), 0 0 120px rgba(16,185,129,0.08), inset 0 0 40px rgba(16,185,129,0.05)',
                }}>
                <div className="rounded-3xl overflow-hidden" style={{ background: 'rgba(4,13,23,0.8)' }}>
                  <img
                    src={COLLAGE_IMG}
                    alt="Коллаж Сириус 55 — Прикладная микробиология"
                    className="w-full object-cover"
                    style={{ height: 'clamp(320px, 55vw, 560px)', mixBlendMode: 'screen' }}
                  />
                </div>
              </div>

              {/* Corner decorations */}
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-8 h-8`}
                  style={{ borderTop: i < 2 ? '2px solid rgba(52,211,153,0.6)' : 'none', borderBottom: i >= 2 ? '2px solid rgba(52,211,153,0.6)' : 'none', borderLeft: i % 2 === 0 ? '2px solid rgba(52,211,153,0.6)' : 'none', borderRight: i % 2 === 1 ? '2px solid rgba(52,211,153,0.6)' : 'none' }} />
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── О КОЛЛАЖЕ ── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Символика</span>
            <h2 className="font-cormorant mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500, color: '#f0fdf4' }}>
              Интерфейс открытий:<br />
              <span className="gradient-text" style={{ fontStyle: 'italic' }}>От ватмана к цифре</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <RevealSection delay={100}>
              <p className="font-montserrat" style={{ color: 'rgba(209,250,229,0.8)', fontSize: '1rem', lineHeight: 1.9 }}>
                Этот баннер — не просто изображение, а <span style={{ color: '#34d399' }}>карта нашего погружения</span> в микробиологию. Созданный изначально вручную как творческий порыв резидентов, в цифровой среде он превратился в живой организм.
              </p>
              <p className="font-montserrat mt-6" style={{ color: 'rgba(209,250,229,0.8)', fontSize: '1rem', lineHeight: 1.9 }}>
                Каждая сфера на экране — это <span style={{ color: '#34d399' }}>чашка Петри</span>, хранящая историю одного дня смены. Плавные анимации символизируют динамику роста бактериальных культур, а изумрудные акценты связывают строгую науку с энергией молодых исследователей Сириуса 55.
              </p>
            </RevealSection>

            <RevealSection delay={300}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🧬', label: 'Сферы = Чашки Петри', desc: 'Каждая — история одного дня' },
                  { icon: '✨', label: 'Анимации', desc: 'Динамика роста культур' },
                  { icon: '🌿', label: 'Изумрудные тона', desc: 'Наука + энергия молодых' },
                  { icon: '🎨', label: 'Ватман → Цифра', desc: 'Творческий путь команды' },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-xl p-4">
                    <div style={{ fontSize: '1.8rem' }}>{item.icon}</div>
                    <div className="font-montserrat font-medium text-sm mt-2" style={{ color: '#34d399' }}>{item.label}</div>
                    <div className="font-montserrat text-xs mt-1" style={{ color: 'rgba(167,243,208,0.6)' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── ГОЛОСА СМЕНЫ ── */}
      <section className="py-24 px-4 grid-bg relative overflow-hidden">
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealSection className="text-center mb-16">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Мнения</span>
            <h2 className="font-cormorant gradient-text mt-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 600 }}>
              Голоса смены
            </h2>
          </RevealSection>

          {/* Avatars row */}
          <RevealSection className="flex justify-center gap-6 mb-12 flex-wrap" delay={150}>
            {residents.map((r, i) => (
              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => setActiveResident(activeResident === i ? null : i)}>
                <div className="relative avatar-hover">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center font-cormorant text-2xl font-bold text-white`}
                    style={{ boxShadow: activeResident === i ? '0 0 25px rgba(16,185,129,0.5)' : 'none', border: activeResident === i ? '2px solid #34d399' : '2px solid rgba(16,185,129,0.2)', transition: 'all 0.3s ease' }}>
                    {r.initial}
                  </div>
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(16,185,129,0.4)', animation: `pulse-ring ${1.5 + i * 0.3}s ease-out infinite` }} />
                  {/* Badge */}
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2"
                    style={{ borderColor: '#040d17', animation: 'pulse 2s ease-in-out infinite' }} />
                </div>
                <span className="font-montserrat text-xs" style={{ color: 'rgba(167,243,208,0.7)' }}>{r.name}</span>
              </div>
            ))}
          </RevealSection>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {residents.map((r, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div
                  className="glass rounded-2xl p-6 cursor-pointer"
                  style={{
                    borderColor: activeResident === i ? 'rgba(52,211,153,0.5)' : 'rgba(16,185,129,0.15)',
                    boxShadow: activeResident === i ? '0 0 30px rgba(16,185,129,0.15)' : 'none',
                    transition: 'all 0.4s ease',
                    transform: activeResident === i ? 'translateY(-4px)' : 'none',
                  }}
                  onClick={() => setActiveResident(activeResident === i ? null : i)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${r.color} flex items-center justify-center font-cormorant text-lg font-bold text-white flex-shrink-0`} />
                    <div>
                      <div className="font-montserrat font-semibold text-sm" style={{ color: '#f0fdf4' }}>{r.name}</div>
                      <div className="font-montserrat text-xs" style={{ color: '#34d399' }}>Resident · Sirius 55</div>
                    </div>
                    <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="font-montserrat text-sm leading-relaxed" style={{ color: 'rgba(209,250,229,0.75)', fontStyle: 'italic' }}>
                    {r.text}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ТАЙМЛАЙН ── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-20">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Путь</span>
            <h2 className="font-cormorant gradient-text mt-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 600 }}>
              Хроника роста
            </h2>
            <p className="font-montserrat text-sm mt-3" style={{ color: 'rgba(167,243,208,0.6)' }}>Интерактивный таймлайн-микроскоп</p>
          </RevealSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 animate-line-glow"
              style={{ background: 'linear-gradient(to bottom, transparent, #10b981 10%, #10b981 90%, transparent)' }} />

            <div className="flex flex-col gap-16">
              {timeline.map((item, i) => (
                <RevealSection key={i} delay={i * 120}>
                  <div className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Text side */}
                    <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="font-montserrat text-xs tracking-widest uppercase" style={{ color: 'rgba(52,211,153,0.6)' }}>{item.time}</div>
                      <div className="font-cormorant gradient-text mt-1" style={{ fontSize: '2rem', fontWeight: 600 }}>{item.day}</div>
                      <div className="font-cormorant text-lg" style={{ color: '#f0fdf4', fontStyle: 'italic' }}>«{item.title}»</div>
                    </div>

                    {/* Center dot */}
                    <div className="relative flex-shrink-0 z-10">
                      <div className="timeline-dot w-12 h-12 rounded-full flex items-center justify-center text-2xl glass"
                        style={{ border: '2px solid rgba(16,185,129,0.4)' }}>
                        {item.icon}
                      </div>
                      <span className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(16,185,129,0.3)', animation: `pulse-ring 2.5s ${i * 0.3}s ease-out infinite` }} />
                    </div>

                    {/* Card side */}
                    <div className="flex-1">
                      <div className="glass rounded-2xl p-5" style={{ boxShadow: '0 0 20px rgba(16,185,129,0.08)' }}>
                        <div className="font-montserrat text-xs uppercase tracking-wider mb-2" style={{ color: '#34d399' }}>Инсайт дня</div>
                        <p className="font-montserrat text-sm leading-relaxed" style={{ color: 'rgba(209,250,229,0.8)', fontStyle: 'italic' }}>
                          «{item.insight}»
                        </p>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── СЛАЙДЕР ── */}
      <section className="py-24 px-4 grid-bg">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-12">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Лабораторный архив</span>
            <h2 className="font-cormorant gradient-text mt-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 600 }}>
              От идеи к культуре
            </h2>
            <p className="font-montserrat text-sm mt-3" style={{ color: 'rgba(167,243,208,0.6)' }}>Потяни ползунок, чтобы увидеть обе стороны науки</p>
          </RevealSection>

          <RevealSection delay={200}>
            <ImageSlider />
          </RevealSection>

          {/* Stats under slider */}
          <RevealSection delay={400} className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Время инкубации', value: 48, suffix: 'ч' },
              { label: 'Колоний выращено', value: 127, suffix: '+' },
              { label: 'Опытов проведено', value: 18, suffix: '' },
            ].map((s, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center">
                <div className="font-cormorant gradient-text" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="font-montserrat text-xs mt-1" style={{ color: 'rgba(167,243,208,0.6)' }}>{s.label}</div>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* ── О СИРИУСЕ ── */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at center, rgba(5,32,16,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealSection className="text-center mb-16">
            <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>О программе</span>
            <h2 className="font-cormorant mt-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 500, color: '#f0fdf4' }}>
              Прикладная<br />
              <span className="gradient-text" style={{ fontStyle: 'italic' }}>микробиология</span>
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: '🔬', title: 'Живая наука', desc: 'Работа с реальными бактериальными культурами в профессиональной лаборатории. Не теория — практика.' },
              { icon: '🧪', title: 'Методы', desc: 'Окраска по Граму, посев, инкубация, микроскопия — полный цикл микробиологического исследования.' },
              { icon: '🌍', title: 'Масштаб', desc: 'От микрометров до глобальных процессов. Бактерии управляют климатом, здоровьем и будущим.' },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="glass rounded-2xl p-6 h-full" style={{ borderColor: 'rgba(16,185,129,0.15)' }}>
                  <div style={{ fontSize: '2.5rem' }}>{item.icon}</div>
                  <h3 className="font-cormorant gradient-text mt-3" style={{ fontSize: '1.5rem', fontWeight: 600 }}>{item.title}</h3>
                  <p className="font-montserrat text-sm mt-3 leading-relaxed" style={{ color: 'rgba(209,250,229,0.7)' }}>{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection delay={200}>
            <div className="glass rounded-3xl p-8 md:p-12" style={{ background: 'linear-gradient(135deg, rgba(7,26,46,0.8), rgba(5,32,16,0.6))' }}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: '#34d399' }}>Образовательная организация</span>
                  <h3 className="font-cormorant mt-2" style={{ fontSize: '2.5rem', fontWeight: 600, color: '#f0fdf4' }}>Сириус</h3>
                  <p className="font-montserrat text-sm mt-4 leading-relaxed" style={{ color: 'rgba(209,250,229,0.75)' }}>
                    Образовательный центр «Сириус» — место, где встречаются самые талантливые школьники страны и лучшие наставники. Программа смены 55 посвящена прикладной микробиологии: науке, которая формирует наше понимание жизни на самом фундаментальном уровне.
                  </p>
                  <p className="font-montserrat text-sm mt-4 leading-relaxed" style={{ color: 'rgba(209,250,229,0.75)' }}>
                    Резиденты работают в реальных лабораторных условиях, осваивают профессиональные методики и открывают для себя карьерные перспективы в биотехнологиях, медицине и экологии.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 2014, s: 'год основания', suf: '' },
                    { n: 55, s: 'смена', suf: '' },
                    { n: 7, s: 'дней интенсива', suf: '' },
                    { n: 100, s: 'науки в деле', suf: '%' },
                  ].map((item, i) => (
                    <div key={i} className="glass rounded-xl p-4 text-center">
                      <div className="font-cormorant gradient-text" style={{ fontSize: '1.6rem', fontWeight: 700 }}>
                        <AnimatedCounter target={item.n} suffix={item.suf} />
                      </div>
                      <div className="font-montserrat text-xs mt-1" style={{ color: 'rgba(167,243,208,0.6)' }}>{item.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-4 text-center" style={{ borderTop: '1px solid rgba(16,185,129,0.1)' }}>
        <div className="font-cormorant gradient-text" style={{ fontSize: '1.8rem', fontWeight: 600 }}>СИРИУС 55</div>
        <p className="font-montserrat text-xs mt-2" style={{ color: 'rgba(167,243,208,0.4)', letterSpacing: '0.15em' }}>ПРИКЛАДНАЯ МИКРОБИОЛОГИЯ · 2025</p>
        <div className="flex justify-center gap-2 mt-4">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
      </footer>
    </div>
  );
}
