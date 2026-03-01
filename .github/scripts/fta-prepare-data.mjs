import { readFileSync } from 'node:fs';

const EMOJI = {
  OK: '\u{2705}',
  'Could be better': '\u{26A0}\u{FE0F}',
  'Needs improvement': '\u{274C}',
};

function parseArgs() {
  const [ftaPath, changedCsv] = process.argv.slice(2);
  if (!ftaPath) {
    process.stderr.write('Usage: node .github/scripts/fta-prepare-data.mjs <fta-results.json> [changed-files-csv]\n');
    process.exit(1);
  }
  return { ftaPath, changedCsv };
}

function renderMarkdown(entries) {
  if (entries.length === 0) {
    return [
      '## \u{1F4CA} FTA Complexity Report',
      '',
      '> No changed TypeScript files were analyzed by FTA.',
      '>',
      '> This can happen when changed files are below the minimum line threshold or are excluded from analysis.',
    ].join('\n');
  }

  const rows = entries.map(e => {
    const emoji = EMOJI[e.assessment] || '\u{2753}';
    return `| ${emoji} | \`${e.file_name}\` | ${e.fta_score.toFixed(2)} | ${e.cyclo} | ${e.line_count} | ${e.assessment} |`;
  });

  return [
    '## \u{1F4CA} FTA Complexity Report',
    '',
    '| Status | File | FTA Score | Cyclo | Lines | Assessment |',
    '| --- | --- | ---: | ---: | ---: | --- |',
    ...rows,
    '',
    '<details>',
    '<summary>Legend & scoring guide</summary>',
    '',
    '| Indicator | Assessment | Guidance |',
    '| --- | --- | --- |',
    '| \u{2705} | OK | File complexity is within acceptable range |',
    '| \u{26A0}\u{FE0F} | Could be better | Consider refactoring to reduce complexity |',
    '| \u{274C} | Needs improvement | File should be refactored to reduce complexity |',
    '',
    '**FTA Score**: A composite metric (lower is better) combining cyclomatic complexity and Halstead metrics.',
    'Scores above ~60 typically indicate files that would benefit from refactoring.',
    '',
    '**Cyclomatic Complexity**: The number of independent paths through the code.',
    'Higher values mean more branches and harder-to-test logic.',
    '',
    '</details>',
  ].join('\n');
}

const { ftaPath, changedCsv } = parseArgs();
const results = JSON.parse(readFileSync(ftaPath, 'utf-8'));
const changed = changedCsv ? new Set(changedCsv.split(',').map(f => f.replace(/^src\//, ''))) : null;
const filtered = changed ? results.filter(e => changed.has(e.file_name)) : results;
const entries = filtered.sort((a, b) => b.fta_score - a.fta_score);

process.stdout.write(renderMarkdown(entries));
