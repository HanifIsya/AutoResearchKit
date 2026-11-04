#!/usr/bin/env python3
"""Static audit for portable skill package; not scientific claim verification."""
import csv, json, hashlib, re, sys, zipfile
from pathlib import Path
root=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).resolve().parent.parent
requirements=['SKILL.md','README.md','00_START/MASTER_PROMPT_SHORT.md','00_START/MASTER_PROMPT_FULL.md','playbooks/02_source_hunt_and_reference_zip.md','templates/new_chat_handoff.md','references/source_catalog.csv','handbook/ACADEMIC_WRITING_PLAYBOOK.docx']
missing=[p for p in requirements if not (root/p).exists()]
sources=list(csv.DictReader((root/'references/source_catalog.csv').open(encoding='utf-8')))
shortcuts=list((root/'references/shortcuts').rglob('*.url'))
for f in shortcuts:
    v=f.read_text(encoding='utf-8');assert v.startswith('[InternetShortcut]\nURL=https://') or v.startswith('[InternetShortcut]\nURL=http://'),f
assert len(shortcuts)==len(sources), (len(shortcuts),len(sources))
for x in sources:
    assert x.get('date_checked') and x.get('official_url') and x.get('verification_status')
manifest={p.relative_to(root).as_posix():{'size':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in root.rglob('*') if p.is_file() and p.name!='MANIFEST.json'}
(root/'MANIFEST.json').write_text(json.dumps({'package':'ACADEMIC_WRITING_SYSTEM_v3','files':manifest,'requirements_missing':missing,'source_rows':len(sources),'shortcuts':len(shortcuts)},indent=2,ensure_ascii=False),encoding='utf-8')
print(json.dumps({'missing':missing,'file_count':len(manifest),'sources':len(sources),'shortcuts':len(shortcuts)},ensure_ascii=False))
if missing: raise SystemExit(1)
