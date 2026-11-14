// Generates services/mistakeBook/drills/supp/genPresentSimple.ts: a large, rule-checked bank of
// present-simple practice items (Do/Does questions, third-person -s, plural subjects, short answers,
// don't/doesn't). The output is a STATIC TypeScript file that is reviewed and committed; the app never
// composes sentences at run time. Every item has exactly one acceptable option by construction:
//   * every distractor is ungrammatical in the slot, or (short answers) answers a different question;
//   * subject/verb pairs come from small hand-curated pools so every sentence is natural.
// Usage: node scripts/mistakeBook/gen_present_simple_drills.cjs
// Re-running overwrites the output file with identical content (no randomness).

const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '..', '..', 'services', 'mistakeBook', 'drills', 'supp', 'genPresentSimple.ts');

// ---- subject pools. g = pronoun gender when it is unambiguous ('m' he, 'f' she, 'p' they). ----
const POOL = {
  P_SG: [
    { t: 'Mia', g: 'f', a: 'k' }, { t: 'Ben', g: 'm', a: 'k' }, { t: 'my uncle', g: 'm', a: 'a' }, { t: 'her cousin' }, { t: 'our teacher', a: 'a' },
    { t: "Lisa's father", g: 'm', a: 'a' }, { t: 'my grandma', g: 'f', a: 'a' }, { t: 'the girl', g: 'f', a: 'k' }, { t: "Tom's brother", g: 'm', a: 'k' }, { t: 'Paddy' },
  ],
  P_PL: [
    { t: 'my parents', g: 'p', a: 'a' }, { t: 'Frank and Sam', g: 'p' }, { t: 'the students', g: 'p', a: 'k' }, { t: 'the boys', g: 'p', a: 'k' },
    { t: 'your uncles', g: 'p', a: 'a' }, { t: 'her cousins', g: 'p' }, { t: 'my friends', g: 'p' }, { t: 'the teachers', g: 'p', a: 'a' },
    { t: 'we', g: 'p', we: true }, { t: 'they', g: 'p' }, { t: 'the children', g: 'p', a: 'k', irregular: true }, { t: 'the women', g: 'p', a: 'a', irregular: true },
    { t: 'the people', g: 'p', a: 'a', irregular: true }, { t: 'the men', g: 'p', a: 'a', irregular: true },
  ],
  DOG_SG: [{ t: 'my dog' }, { t: 'the puppy' }],
  DOG_PL: [{ t: 'the dogs' }, { t: 'the puppies' }],
  CAT_SG: [{ t: 'the cat' }, { t: 'my dog' }, { t: 'the puppy' }],
  CAT_PL: [{ t: 'the cats' }, { t: 'the dogs' }, { t: 'the puppies' }],
  BIRD_SG: [{ t: 'the bird' }],
  BIRD_PL: [{ t: 'the birds' }],
  S_SG: [{ t: 'the bakery' }, { t: 'the library' }, { t: 'the supermarket' }, { t: 'the school' }],
  S_PL: [{ t: 'the shops' }, { t: 'the banks' }, { t: 'the libraries' }],
};

// base, 3sg, -ing, pool key, tail, difficulty, how to explain the 3sg spelling
const VERBS = [
  ['cook', 'cooks', 'cooking', 'P', 'dinner every evening', 1],
  ['wash', 'washes', 'washing', 'P', 'the car every Sunday', 2, 'es'],
  ['play', 'plays', 'playing', 'P', 'basketball on Saturdays', 1],
  ['ride', 'rides', 'riding', 'P', 'a bike to school', 1],
  ['mop', 'mops', 'mopping', 'P', 'the floor every weekend', 1],
  ['water', 'waters', 'watering', 'P', 'the flowers every morning', 1],
  ['watch', 'watches', 'watching', 'P', 'cartoons after dinner', 2, 'es'],
  ['study', 'studies', 'studying', 'P', 'English at night', 2, 'ies'],
  ['carry', 'carries', 'carrying', 'P', 'a heavy bag to school', 2, 'ies'],
  ['teach', 'teaches', 'teaching', 'P', 'math on Wednesdays', 2, 'es'],
  ['fix', 'fixes', 'fixing', 'P', 'old bikes on Saturdays', 2, 'es'],
  ['visit', 'visits', 'visiting', 'P', 'the museum every year', 1],
  ['help', 'helps', 'helping', 'P', 'the neighbors every weekend', 1],
  ['do', 'does', 'doing', 'P', 'homework after dinner', 3, 'irr'],
  ['go', 'goes', 'going', 'P', 'to the park on Sundays', 3, 'es'],
  ['have', 'has', 'having', 'P', 'breakfast at seven o\'clock', 3, 'irr'],
  ['finish', 'finishes', 'finishing', 'P', 'homework before dinner', 2, 'es'],
  ['clean', 'cleans', 'cleaning', 'P', 'the classroom after school', 1],
  ['sing', 'sings', 'singing', 'P', 'songs at parties', 1],
  ['eat', 'eats', 'eating', 'CAT', 'dinner at six o\'clock', 1],
  ['sleep', 'sleeps', 'sleeping', 'CAT', 'on the sofa all day', 1],
  ['run', 'runs', 'running', 'CAT', 'in the garden every morning', 1],
  ['chase', 'chases', 'chasing', 'DOG', 'the ball in the yard', 2],
  ['bark', 'barks', 'barking', 'DOG', 'at strangers', 1],
  ['fly', 'flies', 'flying', 'BIRD', 'over the river every day', 2, 'ies'],
  ['sing', 'sings', 'singing', 'BIRD', 'in the tree every morning', 1],
].map(([base, s, ing, pool, tail, diff, sp]) => ({ base, s, ing, pool, tail, diff, sp }));

// audience rules so every sentence is natural: who 'k' = kids only (homework, school bike/bag), 'a' = adults only;
// plural subjects get a plural-friendly tail (no "the children ride a bike" sharing one bike).
const WHO = { do: 'k', finish: 'k', ride: 'k', carry: 'k', clean: 'k', teach: 'a' };
const TAIL_PL = { ride: 'bikes to school', carry: 'heavy bags to school' };
for (const v of VERBS) { if (v.pool === 'P') { if (WHO[v.base]) v.who = WHO[v.base]; if (TAIL_PL[v.base]) v.tailPl = TAIL_PL[v.base]; } }
const PLSET = new Set([...POOL.P_PL, ...POOL.DOG_PL, ...POOL.CAT_PL, ...POOL.BIRD_PL, ...POOL.S_PL]);
const T = (v, s) => (PLSET.has(s) && v.tailPl ? v.tailPl : v.tail);
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const subjects = (v, plural) => {
  const base = v.pool === 'P' ? POOL[plural ? 'P_PL' : 'P_SG'] : POOL[`${v.pool}_${plural ? 'PL' : 'SG'}`];
  return v.who ? base.filter((x) => x.a !== (v.who === 'k' ? 'a' : 'k')) : base;
};
const pron = (s) => (s.g === 'm' ? 'he' : s.g === 'f' ? 'she' : 'they');

const spellNote = (v) => {
  if (v.sp === 'es') return `${v.base} 結尾要加 es：${v.s}`;
  if (v.sp === 'ies') return `${v.base} 是子音＋y 結尾，y 改成 i 再加 es：${v.s}`;
  if (v.sp === 'irr') return `${v.base} 的第三人稱單數是不規則變化：${v.s}`;
  return `動詞要加 s：${v.s}`;
};

const items = { does: [], third: [], plural: [], short: [], neg: [] };
const counters = { does: 0, third: 0, plural: 0, short: 0, neg: 0 };
const seenStems = new Set();
const DISTINCT = (stem) => { if (seenStems.has(stem)) return false; seenStems.add(stem); return true; };
const push = (key, skill, o) => {
  if (!DISTINCT(o.stem)) return false;
  counters[key] += 1;
  items[key].push({ id: `gen.${skill}#v${counters[key]}`, skillIds: [skill, ...(o.extraSkills || [])], kind: 'mc', stem: o.stem, answer: o.answer, distractors: o.distractors, difficulty: o.difficulty, variation: o.variation, explanation: o.explanation });
  return true;
};

const D = (text, misconception) => (misconception ? { text, misconception } : { text });

// rotating cursors so combinations spread out evenly
let vi = 0;
const nextVerb = (pred) => { for (let k = 0; k < VERBS.length * 2; k++) { const v = VERBS[vi++ % VERBS.length]; if (!pred || pred(v)) return v; } return VERBS[0]; };
const cursors = {};
const nextSubject = (list, key) => { cursors[key] = (cursors[key] || 0); return list[(cursors[key]++ + Math.floor(vi / VERBS.length)) % list.length]; };

// ---------- G.PS.does_question_base ----------
{
  const skill = 'G.PS.does_question_base';
  const target = { doesV: 14, doV: 8, aux: 14 };
  let n = 0;
  for (let __g = 0; n < target.doesV; __g++) { if (__g > 3000) throw new Error("generator loop stuck (n="+n+")");
    const v = nextVerb(); const s = nextSubject(subjects(v, false), `dq-sg-${v.pool}`);
    if (push('does', skill, {
      stem: `Does ${s.t} ___ ${T(v, s)}?`, answer: v.base,
      distractors: [D(v.s, 'does_plus_s_verb'), D(v.ing), D(`to ${v.base}`, 'to_after_does')],
      difficulty: Math.min(v.diff, 2), variation: ['question'],
      explanation: `問句用了 Does，它已經負責第三人稱單數，後面的動詞回到原形 ${v.base}，不再加 s 或 es。`,
    })) n++;
  }
  n = 0;
  for (let __g = 0; n < target.doV; __g++) { if (__g > 3000) throw new Error("generator loop stuck (n="+n+")");
    const v = nextVerb(); const s = nextSubject(subjects(v, true).filter((x) => !x.we || true), `dq-pl-${v.pool}`);
    if (push('does', skill, {
      stem: `Do ${s.t} ___ ${T(v, s)}?`, answer: v.base,
      distractors: [D(v.s, '3sg_s_on_plural'), D(v.ing), D(`to ${v.base}`, 'to_after_does')],
      difficulty: s.irregular ? 3 : Math.min(v.diff, 2), variation: ['question', 'subject'],
      explanation: `${s.t} 是複數，問句用 Do；Do 後面的動詞用原形 ${v.base}，不加 s 或 es。`,
    })) n++;
  }
  n = 0;
  for (let __g = 0; n < target.aux; __g++) { if (__g > 3000) throw new Error("generator loop stuck (n="+n+")");
    const v = nextVerb(); const plural = n % 2 === 1; const s = nextSubject(subjects(v, plural), `aux-${plural}-${v.pool}`);
    const ans = plural ? 'Do' : 'Does';
    if (push('does', skill, {
      stem: `___ ${s.t} ${v.base} ${T(v, s)}?`, answer: ans,
      distractors: plural ? [D('Does', 'does_with_plural'), D('Are')] : [D('Do', 'do_with_3sg'), D('Is')],
      difficulty: s.irregular ? 3 : 1, variation: ['question', 'subject'],
      explanation: plural ? `${s.t} 是複數，一般問句開頭用 Do。` : `${s.t} 是第三人稱單數（he／she／it），一般問句開頭用 Does。`,
    })) n++;
  }
}

// ---------- G.SVA.third_person_s ----------
{
  const skill = 'G.SVA.third_person_s';
  let n = 0;
  for (let __g = 0; n < 30; __g++) { if (__g > 3000) throw new Error("generator loop stuck (n="+n+")");
    const v = nextVerb(); const s = nextSubject(subjects(v, false), `third-${v.pool}`);
    if (push('third', skill, {
      stem: `${cap(s.t)} ___ ${T(v, s)}.`, answer: v.s,
      distractors: [D(v.base, 'missing_3sg_s'), D(v.ing), D(`is ${v.base}`, 'be_plus_base_verb')],
      difficulty: v.diff, variation: ['subject', 'verb'],
      explanation: `${s.t} 是第三人稱單數（${pron(s) === 'they' ? 'he／she／it' : pron(s)}），${spellNote(v)}。`,
    })) n++;
  }
}

// ---------- G.SVA.plural_subject ----------
{
  const skill = 'G.SVA.plural_subject';
  let n = 0;
  for (let __g = 0; n < 30; __g++) { if (__g > 3000) throw new Error("generator loop stuck (n="+n+")");
    const v = nextVerb(); const s = nextSubject(subjects(v, true), `plural-${v.pool}`);
    if (push('plural', skill, {
      stem: `${cap(s.t)} ___ ${T(v, s)}.`, answer: v.base,
      distractors: [D(v.s, '3sg_s_on_plural'), D(v.ing), D(`is ${v.base}`, 'be_plus_base_verb')],
      difficulty: s.irregular ? 3 : Math.min(v.diff, 2), variation: ['subject'],
      explanation: s.irregular
        ? `${s.t} 沒有 s，但它是複數主詞，動詞用原形 ${v.base}，不加 s。`
        : `${s.t} 是複數，現在簡單式動詞用原形 ${v.base}，不加 s 或 es。`,
    })) n++;
  }
}

// ---------- G.PS.short_answer ----------
{
  const skill = 'G.PS.short_answer';
  let n = 0; let round = 0;
  while (n < 30 && round < 400) {
    round++;
    const v = nextVerb(); const mode = n % 3; // 0 yes-aux, 1 no-aux, 2 pronoun
    const plural = mode === 2 ? false : (n % 2) === 1;
    const list = subjects(v, plural).filter((x) => !(plural && x.we) && x.t !== 'they');
    const s = nextSubject(list, `short-${plural}-${v.pool}-${mode}`);
    const qText = `${plural ? 'Do' : 'Does'} ${s.t} ${v.base} ${T(v, s)}?`;
    if (mode === 2) {
      if (!s.g || s.g === 'p') continue; // pronoun items only for a clearly male/female singular subject
      const right = pron(s); const wrong = right === 'he' ? 'she' : 'he';
      if (push('short', skill, {
        stem: `${qText} No, ___ doesn't.`, answer: right,
        distractors: [D(wrong, 'wrong_pronoun'), D('they', 'wrong_pronoun')],
        difficulty: 1, variation: ['short_answer'],
        explanation: `${s.t} 指的是一個${right === 'he' ? '男生' : '女生'}，回答時用 ${right}。`,
      })) n++;
      continue;
    }
    const p = plural ? 'they' : pron(s);
    if (p === 'they' && !plural) continue; // ambiguous singular (no known gender): skip
    if (mode === 0) {
      const ans = plural ? 'do' : 'does';
      if (push('short', skill, {
        stem: `${qText} Yes, ${p} ___.`, answer: ans,
        distractors: plural ? [D('does', 'does_with_plural'), D('is')] : [D('do', 'do_with_3sg'), D('are')],
        difficulty: 1, variation: ['short_answer'],
        explanation: `問句用 ${plural ? 'Do' : 'Does'}，簡答也用 ${ans}：Yes, ${p} ${ans}.`,
      })) n++;
    } else {
      const ans = plural ? "don't" : "doesn't";
      if (push('short', skill, {
        stem: `${qText} No, ${p} ___.`, answer: ans,
        distractors: plural ? [D("doesn't", 'does_with_plural'), D("isn't"), D('not')] : [D("don't", 'do_with_3sg'), D("aren't"), D('not')],
        difficulty: 1, variation: ['short_answer', 'polarity'],
        explanation: `問句用 ${plural ? 'Do' : 'Does'}，回答 No 就用 ${ans}：No, ${p} ${ans}.`,
      })) n++;
    }
  }
}

// ---------- G.NEG.dont_doesnt ----------
{
  const skill = 'G.NEG.dont_doesnt';
  let n = 0;
  for (let __g = 0; n < 16; __g++) { if (__g > 3000) throw new Error("generator loop stuck (n="+n+")");
    const v = nextVerb(); const plural = n % 2 === 1;
    const s = nextSubject(subjects(v, plural), `neg-${plural}-${v.pool}-${n % 4 < 2}`);
    const aux = plural ? "don't" : "doesn't";
    if (n % 4 < 2) {
      if (push('neg', skill, {
        stem: `${cap(s.t)} ${aux} ___ ${T(v, s)}.`, answer: v.base,
        distractors: [D(v.s, 'neg_plus_s_verb'), D(v.ing), D(`to ${v.base}`, 'to_after_does')],
        difficulty: s.irregular ? 3 : Math.min(v.diff, 2), variation: ['polarity', 'verb'],
        explanation: `${aux} 已經帶了時態和人稱，後面的動詞用原形 ${v.base}，不加 s 或 es。`,
      })) n++;
    } else {
      if (push('neg', skill, {
        stem: `${cap(s.t)} ___ ${v.base} ${T(v, s)}.`, answer: aux,
        distractors: plural ? [D("doesn't", 'does_with_plural'), D("aren't")] : [D("don't", 'do_with_3sg'), D("isn't")],
        difficulty: s.irregular ? 3 : 1, variation: ['polarity', 'subject'],
        explanation: plural ? `${s.t} 是複數，否定句用 don't + 動詞原形。` : `${s.t} 是第三人稱單數，否定句用 doesn't + 動詞原形。`,
      })) n++;
    }
  }
}

const all = [...items.does, ...items.third, ...items.plural, ...items.short, ...items.neg];

const lines = [];
lines.push("import { DrillItem } from '../types';", '');
lines.push('// GENERATED by scripts/mistakeBook/gen_present_simple_drills.cjs — do not edit by hand; edit the generator and re-run.');
lines.push('// Present-simple bank built after the 2026-11-10 papers (grammar B: every Does question had the verb in -s form).');
lines.push('// Each item has exactly one acceptable option: distractors are ungrammatical in the slot (see the generator header).');
lines.push('// Ids look like `gen.<skillId>#vN` (no seed mistake; scheduling is by skill).', '');
lines.push('const items: DrillItem[] = [');
for (const it of all) {
  lines.push('  {');
  lines.push(`    id: ${JSON.stringify(it.id)}, skillIds: ${JSON.stringify(it.skillIds)}, kind: 'mc',`);
  lines.push(`    stem: ${JSON.stringify(it.stem)}, answer: ${JSON.stringify(it.answer)},`);
  lines.push(`    distractors: ${JSON.stringify(it.distractors)},`);
  lines.push(`    difficulty: ${it.difficulty}, variation: ${JSON.stringify(it.variation)},`);
  lines.push(`    explanation: ${JSON.stringify(it.explanation)},`);
  lines.push('  },');
}
lines.push('];', '', 'export default items;', '');
fs.writeFileSync(OUT, lines.join('\n'));
console.log(`wrote ${all.length} items:`, Object.fromEntries(Object.entries(items).map(([k, v]) => [k, v.length])));
