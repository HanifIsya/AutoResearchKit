#!/usr/bin/env python3
"""Create honest Windows .url Internet Shortcuts from a curated CSV.
Does NOT browse, verify sources, or download copyrighted PDFs.
Usage: python scripts/build_shortcuts.py references/source_catalog.csv references/shortcuts
"""
from __future__ import annotations
import csv
from pathlib import Path
from urllib.parse import urlparse
import re
import sys


def slug(v: str) -> str:
    return re.sub(r'[^a-zA-Z0-9_-]+','_',v.lower()).strip('_')[:76] or 'source'


def main():
    base = Path(__file__).resolve().parent.parent
    inp = Path(sys.argv[1]) if len(sys.argv) > 1 else base/'references'/'source_catalog.csv'
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else base/'references'/'shortcuts'
    out.mkdir(parents=True, exist_ok=True)
    used=set(); index=['# Academic source shortcut index','',
      'These are web shortcuts, **not downloaded PDFs**. Metadata and source verification remain recorded in the CSV.','',
      '| ID | Source | Function | Access / check |','|---|---|---|---|']
    with inp.open(encoding='utf-8-sig',newline='') as f:
        for row in csv.DictReader(f):
            id=row['source_id'].strip(); url=row['official_url'].strip()
            parsed=urlparse(url)
            if not id or id in used or parsed.scheme not in ('http','https') or not parsed.netloc or '\n' in url:
                raise ValueError(f'Invalid source ID / URL: {id!r} {url!r}')
            used.add(id)
            typ=slug(row.get('folder') or row.get('kind') or 'other')
            folder=out/typ; folder.mkdir(parents=True,exist_ok=True)
            filename=f'{slug(id)}_{slug(row["title"])}.url'
            (folder/filename).write_text('[InternetShortcut]\nURL='+url+'\n',encoding='utf-8')
            title=row['title'].replace('|','-')
            index.append(f'| {id} | [{title}]({url}) | {row.get("purpose","-").replace("|",";")} | {row.get("access_status","-")} / {row.get("verification_status","-")} |')
    (out/'INDEX.md').write_text('\n'.join(index)+'\n',encoding='utf-8')
    print(f'Created {len(used)} shortcuts in {out}')

if __name__ == '__main__': main()
