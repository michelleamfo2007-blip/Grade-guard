import fs from 'fs';
import path from 'path';

const dirs = ['./src/components'];

const replacements = [
  { match: /bg-white/g, replace: 'bg-white dark:bg-slate-900' },
  { match: /text-slate-950/g, replace: 'text-slate-950 dark:text-white' },
  { match: /text-slate-900/g, replace: 'text-slate-900 dark:text-slate-100' },
  { match: /text-slate-800/g, replace: 'text-slate-800 dark:text-slate-200' },
  { match: /text-slate-700/g, replace: 'text-slate-700 dark:text-slate-300' },
  { match: /text-slate-600/g, replace: 'text-slate-600 dark:text-slate-300' },
  { match: /text-slate-500/g, replace: 'text-slate-500 dark:text-slate-400' },
  { match: /text-brand-blue-950/g, replace: 'text-brand-blue-950 dark:text-white' },
  { match: /text-brand-blue-900/g, replace: 'text-brand-blue-900 dark:text-slate-100' },
  { match: /text-brand-blue-800/g, replace: 'text-brand-blue-800 dark:text-slate-200' },
  { match: /text-brand-blue-700/g, replace: 'text-brand-blue-700 dark:text-slate-300' },
  { match: /bg-brand-blue-100/g, replace: 'bg-brand-blue-100 dark:bg-slate-800' },
  { match: /bg-safety-amber-light/g, replace: 'bg-safety-amber-light dark:bg-slate-800' },
  { match: /bg-gsa-green-light/g, replace: 'bg-gsa-green-light dark:bg-slate-800' },
  { match: /bg-gsa-red-light/g, replace: 'bg-gsa-red-light dark:bg-slate-800' },
  { match: /text-safety-amber-dark/g, replace: 'text-safety-amber-dark dark:text-safety-amber' },
  { match: /text-gsa-green-dark/g, replace: 'text-gsa-green-dark dark:text-gsa-green' },
  { match: /text-gsa-red-dark/g, replace: 'text-gsa-red-dark dark:text-gsa-red' },
  { match: /border-slate-200/g, replace: 'border-slate-200 dark:border-slate-800' },
  { match: /border-slate-100/g, replace: 'border-slate-100 dark:border-slate-800' },
  { match: /bg-slate-50/g, replace: 'bg-slate-50 dark:bg-slate-900\/50' },
  { match: /bg-slate-100/g, replace: 'bg-slate-100 dark:bg-slate-800' },
  { match: /bg-slate-200/g, replace: 'bg-slate-200 dark:bg-slate-800' },
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('Header.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      replacements.forEach(({match, replace}) => {
        const regexStr = match.source + "(?! dark:)";
        const regex = new RegExp(regexStr, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          changed = true;
        }
      });
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

dirs.forEach(processDir);
console.log('Done!');
