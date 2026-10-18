import { useId, useRef, type CSSProperties } from 'react';

export function Star({ x = 0, y = 0, size = 12 }: { x?: number; y?: number; size?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${size / 12})`} d="M0-12 3-3 12 0 3 3 0 12-3 3-12 0-3-3Z" fill="currentColor" />;
}

export function Pip({ interactive = false, onReact, happy = false }: { interactive?: boolean; onReact?: () => void; happy?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, '');
  return <svg ref={ref} className={`pip ${happy ? 'pip-happy' : ''}`} viewBox="0 0 500 490" role="img" aria-label="Pip, a friendly skull baby in a starry nightcap and pink bow, holding a dream lantern"
    onPointerMove={interactive ? e => { if (e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); const x = Math.max(-6, Math.min(6, (e.clientX - r.left - r.width / 2) / 30)); const y = Math.max(-4, Math.min(4, (e.clientY - r.top - r.height / 2) / 35)); ref.current?.style.setProperty('--eye-x', `${x}px`); ref.current?.style.setProperty('--eye-y', `${y}px`); } : undefined}
    onPointerLeave={() => { ref.current?.style.setProperty('--eye-x', '0px'); ref.current?.style.setProperty('--eye-y', '0px'); }} onClick={onReact}>
    <defs><radialGradient id={`${id}-glow`}><stop stopColor="#ffe4a0" stopOpacity=".7"/><stop offset="1" stopColor="#ffe4a0" stopOpacity="0"/></radialGradient><linearGradient id={`${id}-cap`} x2="1" y2="1"><stop stopColor="#8a83b0"/><stop offset="1" stopColor="#514d7b"/></linearGradient></defs>
    <ellipse cx="253" cy="433" rx="173" ry="28" fill="#0d122b" opacity=".3"/>
    <g className="pip-body" stroke="#34334e" strokeWidth="3" strokeLinejoin="round">
      <path d="M72 383c-31-49 27-87 66-56 5-52 80-62 107-19 30-32 80-17 84 16 54-24 96 26 69 60 53 21 14 60-55 53H136c-89 10-111-37-64-54Z" fill="#c8c6df"/>
      <path d="M86 397c22 20 46 11 52 5m172 9c28 13 52 6 66-4" fill="none" stroke="#a3a2c7"/>
      <ellipse cx="184" cy="355" rx="43" ry="28" fill="#dbadbe" transform="rotate(-18 184 355)"/>
      <ellipse cx="303" cy="355" rx="43" ry="28" fill="#dbadbe" transform="rotate(18 303 355)"/>
      <path d="M184 250q-36 54 4 91 62 33 119-1 29-52-10-92Z" fill="#8682ac"/>
      <path d="M213 264q-21 47 2 69h62q22-30-1-69" fill="#bab5d4"/>
      <circle cx="246" cy="287" r="4" fill="#eee4c9"/><circle cx="246" cy="309" r="4" fill="#eee4c9"/>
      <path d="M183 267q-23-3-37-25-8-13-17-4-3 9 4 17-21-10-24 2 3 28 40 43 24 7 34-12" fill="#f5e9d1"/>
      <path d="M298 267q23-1 34 22l-16 20q-22-2-29-21" fill="#f5e9d1"/>
      <path d="M141 168c-5-58 44-95 102-95 67-1 118 38 113 99-2 31-15 49-42 62l-11 25q-57 26-113-1l-11-24c-27-12-36-34-38-66Z" fill="#f7edd8"/>
      <path d="M152 177q-4 30 25 47m153-45q-1 27-21 39" fill="none" stroke="#d8cbb4"/>
      <ellipse cx="203" cy="180" rx="31" ry="34" fill="#303049"/><ellipse cx="291" cy="180" rx="31" ry="34" fill="#303049"/>
      <g className="pupils" stroke="none"><circle cx="207" cy="181" r="9" fill="#e8ce8c"/><circle cx="287" cy="181" r="9" fill="#e8ce8c"/><circle cx="209" cy="178" r="3" fill="#fff9db"/><circle cx="289" cy="178" r="3" fill="#fff9db"/></g>
      <path d="m244 208-5 9h12Z" fill="#665b68" stroke="none"/>
      <path d="M224 239q23 12 44-3m-31 5v5m15-6v5" fill="none" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="169" cy="214" rx="12" ry="6" fill="#e9bac4" stroke="none"/><ellipse cx="324" cy="214" rx="12" ry="6" fill="#e9bac4" stroke="none"/>
      <path d="M140 135q30-113 127-98 66-7 110 60l-21 33q-22-47-55-47 20 25 31 52Z" fill={`url(#${id}-cap)`}/>
      <path d="M138 130q92-31 198 2l-3 23q-94-25-193-2Z" fill="#b4adcb"/>
      <g color="#ead8a5" stroke="none"><Star x={202} y={86} size={9}/><Star x={265} y={64} size={7}/><Star x={298} y={107} size={8}/><Star x={340} y={84} size={5}/></g>
      <circle cx="371" cy="123" r="16" fill="#ece1c5"/>
      <path d="M161 143q-32-25-36-3-5 25 30 17-1 31 20 19 13-12-7-29" fill="#d995ad"/><circle cx="160" cy="151" r="7" fill="#edb7c7"/>
      <g className="held-lantern"><circle cx="353" cy="316" r="78" fill={`url(#${id}-glow)`} stroke="none"/><path d="M332 299v-21q20-25 40 0v21" fill="none" stroke="#d2af68" strokeWidth="5"/><path d="m326 300 7-10h40l7 10-7 55h-40Z" fill="#eacb7c"/><path d="M337 302h31v41h-31Z" fill="#fff0b5"/><path d="M352 308q-15 15 1 29 11 0 14-8-16 5-15-21" fill="#d9ac5b" stroke="none"/><path d="M328 355h49m-49-55h49" stroke="#886b45"/></g>
    </g>
  </svg>;
}

export function Town({ compact = false }: { compact?: boolean }) {
  return <svg className={`town-art ${compact ? 'compact' : ''}`} viewBox="0 0 1200 230" aria-hidden="true">
    <path d="M0 170Q170 90 350 157T700 142T1200 145V230H0Z" fill="#292e4a"/>
    <path d="M0 207Q200 140 420 196T800 172T1200 190V230H0Z" fill="#353853"/>
    {[70,170,315,440,670,785,940,1080].map((x,i)=><g key={x} transform={`translate(${x} ${90+(i%3)*23})`} stroke="#aaa4b3" strokeWidth="1.4"><path d={`M0 100V35L${30+i%2*10} 0 65 35V100Z`} fill={i%2?'#52516a':'#45455f'}/><path d="M-7 37 31-3 73 37" fill="none"/><path d="M10 0v-15h10v24" fill="#48475f"/><path d="M27 100V72q7-12 14 0v28" fill="#272b43"/><path d="M12 43h12v19H12Zm32 0h12v19H44Z" fill="#e9ca87" stroke="#88765e"/><path d="M18 43v19m32-19v19"/></g>)}
    <path d="M0 225q170-40 320-4t300-1 320-7 260 5" fill="none" stroke="#92879c" strokeWidth="1"/>
  </svg>;
}

export function ObjectArt({ kind, className = '' }: { kind: 'box'|'lamp'|'cloud'|'window'|'star'|'toy'|'book'; className?: string }) {
  return <svg className={`object-art ${className}`} viewBox="0 0 200 160" aria-hidden="true" stroke="#4b435c" strokeWidth="2.5" strokeLinejoin="round">
    {kind==='box' && <><path d="m34 78 65-28 68 29-65 28Z" fill="#c3abc9"/><path d="M34 78v49l68 25v-45Zm68 29 65-28v49l-65 24" fill="#9684af"/><path d="m34 74 0-43 66-24 66 28v40l-65-25Z" fill="#d7c1d6"/><path d="m48 59 0-19 52-18 51 20v17l-51-21Z" fill="#69617f"/><path d="M99 89V50" stroke="#d5b574"/><g color="#eed29b" stroke="none"><Star x={100} y={61}/><Star x={76} y={77} size={7}/><Star x={124} y={78} size={7}/></g><path d="M163 101h16m0-8v16m0-8q18-19 18-4t-18 4" fill="none" stroke="#d7b572" strokeWidth="5"/></>}
    {kind==='lamp' && <><path d="M64 53V36a36 36 0 0 1 72 0v17" fill="none" stroke="#c4a974" strokeWidth="5"/><path d="m48 54 16-14h72l16 14-12 84H60Z" fill="#d5b87a"/><path d="M64 57h72l-7 66H71Z" fill="var(--lamp-color, #fae4a4)"/><path d="M101 67q-29 23-2 45 19 1 24-17-26 9-22-28" fill="#d1ac68" stroke="none"/><path d="M53 140h94M47 54h106" strokeWidth="7" stroke="#9c8259"/></>}
    {kind==='cloud' && <><path d="M34 88c-25-30 9-57 35-39 1-39 66-41 76-3 32-12 49 18 31 39 30 27-5 48-41 39H57c-42 7-54-23-23-36Z" fill="#d2ccdf"/><path d="M65 86q9 9 18 0m32 0q9 9 18 0m-39 17q7 5 14 0" fill="none" strokeLinecap="round"/><path d="m144 25 12-14h-13m24-7 12-13h-12" fill="none" stroke="#e3c98d"/></>}
    {kind==='window' && <><path d="M45 148V58a55 55 0 0 1 110 0v90Z" fill="#272d4e" stroke="#b3a0ba" strokeWidth="7"/><path d="M100 5v143M45 77h110" stroke="#b3a0ba" strokeWidth="5"/><path d="M124 26q-24 19-2 35 17 1 22-13-24 7-20-22" fill="#eed8a0" stroke="none"/><g color="#e7c98c" stroke="none"><Star x={73} y={43} size={5}/><Star x={126} y={102} size={4}/><Star x={75} y={126} size={6}/></g></>}
    {kind==='star' && <><path d="m37 118 26-66 48 39 42-62" fill="none" stroke="#cbb788" strokeDasharray="4 5"/><g color="#ecd298" stroke="none"><Star x={37} y={118}/><Star x={63} y={52}/><Star x={111} y={91}/><Star x={153} y={29}/></g></>}
    {kind==='toy' && <><path d="M57 75q-31-40-9-49 22-5 29 38m46 0q9-43 28-38 24 10-8 49" fill="#bca0b3"/><path d="M53 94q0-44 47-44t47 44v35q-47 23-94 0Z" fill="#bca0b3"/><circle cx="80" cy="91" r="4" fill="#393449"/><circle cx="120" cy="91" r="4" fill="#393449"/><path d="m95 103 5 5 5-5m-5 5v7" fill="none"/><path d="m77 132 23-12 23 12-23 12Z" fill="#e6d09c"/></>}
    {kind==='book' && <><path d="M21 37q40-17 79 6 39-23 79-6v100q-41-17-79 5-38-22-79-5Z" fill="#f1e3c6"/><path d="M100 43v99M34 58q26-7 50 5m-50 12q26-7 50 5m-50 12q26-7 50 5" fill="none" stroke="#b6a48c"/><g color="#c09a5c" stroke="none"><Star x={141} y={87} size={22}/></g></>}
  </svg>;
}

export function Sky({ className = '' }: { className?: string }) {
  return <div className={`sky ${className}`} aria-hidden="true">{Array.from({length:32},(_,i)=><span key={i} className={i%5===0?'sky-star big':'sky-star'} style={{left:`${(i*37+7)%100}%`,top:`${(i*23+3)%90}%`,'--delay':`${i%7}s`} as CSSProperties}>{i%5===0?'✦':'·'}</span>)}</div>;
}
