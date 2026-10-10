// Scores the corpus in spam-samples.ts with lib/spam-rules.ts. Run: npm run test:spam
import { DROP_SCORE, REVIEW_SCORE, scoreContent, totalScore } from '../lib/spam-rules.ts'
import { ham, spam } from './spam-samples.ts'

let failed = 0

function check(label, samples, passes) {
  for (const sample of samples) {
    const signals = scoreContent(sample)
    const score = totalScore(signals)
    const ok = passes(score)
    if (!ok) failed++
    const tier = score >= DROP_SCORE ? 'drop' : score >= REVIEW_SCORE ? 'review' : 'send'
    console.log(`${ok ? 'PASS' : 'FAIL'} ${label} score=${score} (${tier})  ${sample.name} <${sample.email}>`)
    for (const signal of signals) console.log(`       +${signal.weight} ${signal.reason}`)
  }
}

check('spam', spam, (score) => score >= DROP_SCORE)
check('ham ', ham, (score) => score < DROP_SCORE)

console.log(failed ? `\n${failed} sample(s) misclassified` : '\nall samples classified correctly')
process.exit(failed ? 1 : 0)
